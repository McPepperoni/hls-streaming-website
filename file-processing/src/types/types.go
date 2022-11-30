package types

// import "fmt"

type File struct {
	Path string
	Name string
	Ext  string
}

func NewFile(path string, name string, ext string) *File {
	return &File{path, name, ext}
}
