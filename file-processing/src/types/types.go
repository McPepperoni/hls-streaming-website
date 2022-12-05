package types

// import "fmt"
type Series struct {
	Parent string
	Season string
}

type Metadata struct {
	AudioChannels float64
	Duration      string
	ImageWidth    float64
	ImageHeight   float64
}
type File struct {
	Path     string
	Name     string
	Ext      string
	IsSeries bool
	Series   Series
	Metadata Metadata
}

func NewFile(path string, name string, ext string, parent string, IsSeries bool, Series Series, Metadata Metadata) *File {
	return &File{path, name, ext, IsSeries, Series, Metadata}
}
