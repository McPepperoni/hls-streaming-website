package utils

import (
	constants "file-processing/src/constants"
	"strings"
)

func HasValidExt(file string) (string, string) {
	file_split := strings.Split(file, ".")
	file_ext := file_split[len(file_split)-1]

	for _, ext := range constants.Extensions {
		if file_ext == ext {
			return ext, strings.Join(file_split[:len(file_split)-1], "")
		}
	}

	return "", file
}

func RemoveItem(slice []string, s int) []string {
	return append(slice[:s], slice[s+1:]...)
}
