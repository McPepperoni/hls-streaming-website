import "./App.css";
import VideoPlayer from "./components/templates/video-player/video-player";

function App() {
  return (
    <VideoPlayer
      src="http://localhost:8080/output/output1920x1080_.m3u8"
      title="Testing"
    />
  );
}

export default App;
