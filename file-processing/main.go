package main

import (
	loadDir "file-processing/src/loadDir"
	"fmt"
	"log"
	"os"
	"os/exec"
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
	// path := "../../../Movie/Hereditary.2018.1080p.BluRay.H264.AAC-RARBG/"
	// output := path + "output\\"

	// processVideo(path, "Hereditary.2018.1080p.BluRay.H264.AAC-RARBG.mp4", "1280x720", output)
	videos := loadDir.GetDir()

	resolutions := []string{
		"1920x1080",
		"1280x720",
		"720x480",
		"640x360",
	}

	fmt.Println(len(videos))

	for _, v := range videos {
		for _, resolution := range resolutions {
			processVideo(v.Path, v.Name, resolution, v.Path+"output/")
		}
	}
}
