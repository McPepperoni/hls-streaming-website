import VideoPlayer from "../components/templates/video-player";

const Watch = () => {
  return (
    <VideoPlayer
      src="http://localhost:8080/output/output1920x1080_.m3u8"
      title="Testing"
    />
  );
};

export default Watch;
