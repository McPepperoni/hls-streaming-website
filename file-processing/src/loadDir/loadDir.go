package loadDir

import (
	types "file-processing/src/types"
	utils "file-processing/src/utils"
	"fmt"
	"io/fs"
	"log"
	"os"
	"strings"

	"github.com/barasher/go-exiftool"
	"github.com/mitchellh/mapstructure"
)

func pathFromFiles(path string, files []fs.DirEntry) []string {
	var paths []string
	for _, f := range files {
		paths = append(paths, path+f.Name()+"/")

	}

	return paths
}

func openFolder(homePath string, path string) ([]fs.DirEntry, []string, error) {
	f, err := os.Open(homePath + path)
	if err != nil {
		fmt.Println(err)
		return []fs.DirEntry{}, []string{}, err
	}

	files, err := f.ReadDir(0)
	if err != nil {
		fmt.Println(err)
		return []fs.DirEntry{}, []string{}, err
	}

	result := []fs.DirEntry{}

	for _, f := range files {
		if _, err := os.Stat(homePath + path + "/" + f.Name()); err == nil {
			result = append(result, f)
		}
	}

	defer f.Close()

	return result, pathFromFiles(path, result), err
}

func GetDir(homePath string) []types.File {

	paths := []string{""}

	videos := []types.File{}
	et, err := exiftool.NewExiftool()
	if err != nil {
		fmt.Printf("Error when intializing: %v\n", err)
		return videos
	}
	defer et.Close()

	parents, paths, err := openFolder(homePath, paths[0])

	if err == nil {
		for len(paths) != 0 {
			tempPaths := []string{}
			tempFiles := []fs.DirEntry{}

			for i, f := range parents {
				if f.IsDir() {
					files, subPaths, err := openFolder(homePath, paths[i])

					if err == nil {
						tempFiles = append(tempFiles, files...)
						tempPaths = append(tempPaths, subPaths...)
					}
				} else {
					ext, name := utils.HasValidExt(f.Name())
					if ext != "" {
						path_split := strings.Split(paths[i], "/")
						path := strings.Join(path_split[:len(path_split)-2], "/") + "/"

						fileInfos := et.ExtractMetadata(homePath + path + name + "." + ext)
						if fileInfos[0].Err != nil {
							log.Println(fileInfos[0].Err)
						}

						metadata := types.Metadata{}
						err := mapstructure.Decode(fileInfos[0].Fields, &metadata)
						if err != nil {
							log.Println(err)
						}

						if len(path_split) > 3 {
							videos = append(videos, types.File{Path: path, Name: name, Ext: ext, IsSeries: true, Series: types.Series{Parent: path_split[0], Season: path_split[1]}, Metadata: metadata})
						} else {
							videos = append(videos, types.File{Path: path, Name: name, Ext: ext, IsSeries: false, Series: types.Series{Parent: path_split[0], Season: ""}, Metadata: metadata})
						}
					}
				}
			}

			parents = tempFiles
			paths = tempPaths
		}
	}

	return videos
}
