import styled from "styled-components";
import { useRef, useEffect, useState, SyntheticEvent } from "react";
import Hls from "hls.js";
import VideoController from "../molecules/video-controller/video-controller";
import { videoContext } from "../../contexts";
import { TVideoContext } from "../../types/type";
import { COLORS } from "../../constanst";

type Props = {
  src: string;
  title: string;
};

const VideoPlayer = (props: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0);
  const [videoLength, setVideoLength] = useState(0);
  const [isMouseMoving, setIsMouseMoving] = useState(true);

  const handlePlayButton = () => {
    setIsPlaying(true);
  };

  const handlePauseButton = () => {
    setIsPlaying(false);
  };

  const handleFastForward = (value: number) => {
    if (videoRef && videoRef.current) {
      videoRef.current.currentTime += value;
    }
  };

  const handleRewind = (value: number) => {
    if (videoRef && videoRef.current) {
      videoRef.current.currentTime -= value;
    }
  };

  const handleFullScreen = () => {
    if (containerRef && containerRef.current) {
      isFullscreen
        ? document.exitFullscreen()
        : containerRef.current.requestFullscreen();
      setIsFullscreen(!isFullscreen);
    }
  };

  const handleOnTimeUpdate = (e: SyntheticEvent<HTMLVideoElement>) => {
    setCurrentTime((e.target as HTMLVideoElement).currentTime);
    setVideoLength((e.target as HTMLVideoElement).duration);
    setVolume((e.target as HTMLVideoElement).volume);
  };

  useEffect(() => {
    if (videoRef.current && Hls.isSupported()) {
      var hls = new Hls();

      hls.loadSource(props.src);
      hls.attachMedia(videoRef.current);
    }
  }, [videoRef, props.src]);

  useEffect(() => {
    var timer: any;

    const handleMouseStop = () => {
      setIsMouseMoving(false);
    };

    const handleMouseMove = () => {
      setIsMouseMoving(true);
      clearTimeout(timer);
      timer = setTimeout(handleMouseStop, 1000);
    };

    window.addEventListener("mousemove", handleMouseMove);
  }, []);

  const videoInitValue: TVideoContext = {
    src: props.src,
    title: props.title,
    video: videoRef,
    isPlaying,
    currentTime,
    videoLength,
    isFullscreen,
    isMouseMoving,
    volume,

    setCurrentTime,
    setIsPlaying,
    setVideoLength,
    setIsFullscreen,
    setVolume,
  };

  return (
    <videoContext.Provider value={videoInitValue}>
      <StyledContainer ref={containerRef}>
        <StyledVideo
          ref={videoRef}
          preload="metadata"
          onTimeUpdate={handleOnTimeUpdate}
          autoPlay={isPlaying}
        />
        <VideoController
          fastForward={10}
          rewind={10}
          handleFastForward={handleFastForward}
          handlePauseButton={handlePauseButton}
          handlePlayButton={handlePlayButton}
          handleRewind={handleRewind}
          handleFullScreen={handleFullScreen}
        />
      </StyledContainer>
    </videoContext.Provider>
  );
};

export default VideoPlayer;

const StyledContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: ${COLORS.DEFAULT.PRIMARY_BG};
`;

const StyledVideo = styled.video`
  object-fit: contain;
  flex-grow: 1;
`;
