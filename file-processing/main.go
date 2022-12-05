package main

import (
	"context"
	firebaseInit "file-processing/src/firebaseInit"
	loadDir "file-processing/src/loadDir"

	// types "file-processing/src/types"
	"fmt"
	"log"
	"os"
	"os/exec"

	"github.com/barasher/go-exiftool"
	// "github.com/mitchellh/mapstructure"
)

func processVideo(path string, file string, resolution string, output string) {
	currentPath, _ := os.Getwd()
	os.Chdir(currentPath)
	fmt.Println(currentPath)
	os.Mkdir(output, 0755)
	path = path + file

	arg := []string{
		"-nologo",
		"ffmpeg",
		"-hide_banner",
		"-y",
		"-hwaccel",
		"cuda",
		"-hwaccel_output_format",
		"cuda",
		"-i",
		"\"" + path + "\"",
		"-c:v",
		"copy",
		"-preset",
		"veryfast",
		"-start_number",
		"0",
		"-hls_time",
		"10",
		"-hls_list_size",
		"0",
		"-f",
		"hls",
		"\"" + output + "/output" + resolution + "_.m3u8" + "\"",
	}
	if resolution != "" {
		arg = []string{
			"-nologo",
			"ffmpeg",
			"-hide_banner",
			"-y",
			"-hwaccel",

			"cuda",
			"-hwaccel_output_format",
			"cuda",
			"-i",
			"\"" + path + "\"",
			"-c:v",
			"copy",
			"-s",
			resolution,
			"-preset",
			"veryfast",
			"-start_number",
			"0",
			"-hls_time",
			"10",
			"-hls_list_size",
			"0",
			"-f",
			"hls",
			"\"" + output + "/output" + resolution + "_.m3u8" + "\"",
		}
	}

	cmd := exec.Command("powershell", arg...)
	out, err := cmd.CombinedOutput()
	fmt.Println("processing: ", file)
	fmt.Println("path: ", path)

	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(string(out))
}

func main() {
	homePath := "../../../Movie/"
	// output := path + "output\\"

	// processVideo(path, "Hereditary.2018.1080p.BluRay.H264.AAC-RARBG.mp4", "1280x720", output)
	videos := loadDir.GetDir(homePath)
	client := firebaseInit.Init()
	et, err := exiftool.NewExiftool()
	if err != nil {
		fmt.Printf("Error when intializing: %v\n", err)
		return
	}
	defer et.Close()

	// resolutions := []string{
	// 	"",
	// 	"1280x720",
	// 	"720x480",
	// 	"640x360",
	// }

	// fmt.Println(len(videos))

	for _, v := range videos {
		// for _, resolution := range resolutions {
		// 	processVideo(v.Path, v.Name + "." + v.Ext, resolution, v.Path + "output/")
		// }
		// fmt.Println(v.Path)

		fmt.Println(v.Path)
		fmt.Println(v.Name)

		_, err := client.Collection("Media").Doc(v.Name).Set(context.Background(), &v)
		if err != nil {
			log.Fatalln(err)
		}

		// fileInfos := et.ExtractMetadata(homePath + v.Path + v.Name + "." + v.Ext)
		// fmt.Printf("%v\n", fileInfos)

		// for _, fileInfo := range fileInfos {
		// 	if fileInfo.Err != nil {
		// 		fmt.Printf("Error concerning %v: %v\n", fileInfo.File, fileInfo.Err)
		// 		continue
		// 	}

		// 	metadata := types.Metadata{}
		// 	err := mapstructure.Decode(fileInfo.Fields, &metadata)
		// 	if err != nil {
		// 		log.Fatalln(err)
		// 	}

		// }
	}

	defer client.Close()
}
