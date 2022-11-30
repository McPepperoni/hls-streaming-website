package loadDir

import (
	types "file-processing/src/types"
	utils "file-processing/src/utils"
	"fmt"
	"io/fs"
	"os"
)

func openFolder(path string) ([]fs.DirEntry, error) {
	f, err := os.Open(path)
	if err != nil {
		fmt.Println(err)
		return make([]fs.DirEntry, 0), err
	}

	files, err := f.ReadDir(0)
	if err != nil {
		fmt.Println(err)
		return make([]fs.DirEntry, 0), err
	}

	return files, err
}

// func hasFolder(files []fs.DirEntry) bool {
// 	for _, f := range files {
// 		if f.IsDir() {
// 			return true
// 		}
// 	}

// 	return false
// }

func GetDir() []types.File {
	path := "../../../Movie"

	parents, err := openFolder(path)

	var videos []types.File

	if err == nil {
		for _, p := range parents {
			if p.IsDir() {
				subPath := path + "/" + p.Name()
				sub, err := openFolder(subPath)

				if err == nil {

					for _, s := range sub {
						ext := utils.HasValidExt(s.Name())
						if ext != "" {
							video := types.File{Path: subPath + "/", Name: s.Name(), Ext: ext}

							videos = append(videos, video)
						}
					}
				}
			}
		}

	}

	return videos
}
