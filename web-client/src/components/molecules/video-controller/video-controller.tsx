import styled from "styled-components/macro";
import { useEffect, useContext, useRef, useState } from "react";
import * as md from "react-icons/md";
import * as tfi from "react-icons/tfi";
import { secondToString } from "../../../utils";
import { videoContext } from "../../../contexts";
import {
  TIconButton,
  TMediaSelection,
  TSeasonSelection,
} from "../../../types/type";
import IconButton from "../../atoms/icon-button/icon-button";
import VideoSpeedController from "../video-speed-controller/video-speed-controller";
import VideoMediaController from "../video-media-controller/video-media-controller";
import VideoEpisodeController from "../video-episode-controller/video-episode-controller";
import Slider from "../../atoms/slider/slider";
import { COLORS } from "../../../constanst";

type Props = {
  fastForward: number;
  rewind: number;

  handleFastForward: (value: number) => void;
  handleRewind: (value: number) => void;
  handlePlayButton: () => void;
  handlePauseButton: () => void;
  handleFullScreen: () => void;
};

const VideoController = (props: Props) => {
  const {
    video,
    isPlaying,
    videoLength,
    currentTime,
    setCurrentTime,
    title,
    isMouseMoving,
    volume,
    setVolume,
  } = useContext(videoContext);

  const timelineRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);

  const [mousePosX, setMousePosX] = useState(0);
  const [mousePosY, setMousePosY] = useState(0);
  // const [offsetTopVolume, setOffsetTopVolume] = useState(0);
  const [isPreviewVolume, setIsPreviewVolume] = useState(false);

  const [offsetLeftTimeline, setOffsetLeftTimeline] = useState(0);
  const [isPreviewTimeline, setIsPreviewTimeline] = useState(false);
  const [isScrubbingTimeline, setIsScrubbingTimeline] = useState(false);
  const [isOnController, setIsOnController] = useState(false);

  const handleSpacerClick = () => {
    isPlaying ? props.handlePauseButton() : props.handlePlayButton();
  };

  const handlePreviewOn = () => {
    setIsPreviewTimeline(true);
  };

  const handlePreviewOff = () => {
    setIsPreviewTimeline(false);
  };

  const handlePreviewPos = () => {
    return mousePosX - offsetLeftTimeline < 100 ? 50 : mousePosX;
  };

  const handleMouseOverController = () => {
    setIsOnController(true);
  };

  const handleMouseOffController = () => {
    setIsOnController(false);
  };

  const handleOnMouseDownTimeline = () => {
    if (timelineRef && timelineRef.current && video && video.current) {
      const width = timelineRef.current.getBoundingClientRect().width;
      const time = Math.max(
        Math.min((mousePosX / width) * videoLength, videoLength),
        0
      );

      video.current.currentTime = time;

      setCurrentTime(time);
    }
    setIsScrubbingTimeline(true);
  };

  const handleOnMouseUp = () => {
    setIsScrubbingTimeline(false);
    setIsPreviewVolume(false);
  };

  const handleOnMouseDownVolume = () => {
    // console.log(mousePosY);
    setIsPreviewVolume(true);

    if (video && video.current) {
      video.current.volume = mousePosY;
      // console.log(mousePosY);
      setVolume(mousePosY);
    }
  };

  const VolumeSlider = () => (
    <StyledVolumeContainer>
      <StyledVolumeSlider ref={volumeRef} onMouseDown={handleOnMouseDownVolume}>
        <Slider vertical value={volume * 100} isPreview={isPreviewVolume} />
      </StyledVolumeSlider>
    </StyledVolumeContainer>
  );

  const audioSelections: TMediaSelection[] = [
    {
      label: "Test",
    },
  ];

  const subtitleSelections: TMediaSelection[] = [
    {
      label: "Test",
    },
    {
      label: "Test",
    },
    {
      label: "Test",
    },
  ];

  const topLeftControlButton: TIconButton[] = [
    {
      icon: <md.MdArrowBackIosNew />,
      onClick: () => {},
    },
  ];

  const topRightControlButton: TIconButton[] = [
    {
      icon: <md.MdOutlinedFlag />,
      onClick: () => {},
    },
    {
      icon: <md.MdInfoOutline />,
      onClick: () => {},
    },
  ];

  const bottomLeftControlButton: TIconButton[] = [
    {
      icon: isPlaying ? <md.MdPause /> : <md.MdPlayArrow />,
      margin: 10,
      onClick: isPlaying ? props.handlePauseButton : props.handlePlayButton,
    },
    {
      icon: <md.MdReplay10 />,
      onClick: () => props.handleRewind(props.rewind),
    },
    {
      icon: <md.MdForward10 />,
      onClick: () => props.handleFastForward(props.fastForward),
      margin: 10,
    },
    {
      icon: <md.MdVolumeUp />,
      onClick: () => {},
      margin: 10,
      hover: <VolumeSlider />,
      followButton: true,
    },
  ];

  const seasonSelections: TSeasonSelection[] = [
    {
      label: "Season 1",
      episodes: [
        {
          imgSrc: "",
          title: "unknow",
          desc: "Lorem ipsum asidoasiouguoi sadjsd sdsdsd ssad",
          vidSrc: "",
          time: 50,
        },
        {
          imgSrc: "",
          title: "unknow",
          desc: "Lorem ipsum asidoasiouguoi sadjsd sdsdsd ssad",
          vidSrc: "",
          time: 50,
        },
      ],
    },
    {
      label: "Season 2",
      episodes: [
        {
          imgSrc: "",
          title: "unknow",
          desc: "Lorem iasuhdish asidoasiouguoi sadjsd sdsdsd ssad",
          vidSrc: "",
          time: 50,
        },
      ],
    },
    {
      label: "Season 3",
      episodes: [
        {
          imgSrc: "",
          title: "unknow",
          desc: "Lorem iasuhdish asidoasiouguoi sadjsd sdsdsd ssad",
          vidSrc: "",
          time: 50,
        },
      ],
    },
  ];

  const bottomRightControlButton: TIconButton[] = [
    {
      icon: <md.MdOutlineSubtitles />,
      onClick: () => {},
      hover: (
        <VideoMediaController
          AudioTitle="Audio"
          SubtitleTitle="Subtitle"
          AudioSelections={audioSelections}
          SubtitleSelections={subtitleSelections}
        />
      ),
    },
    {
      icon: <tfi.TfiLayers />,
      onClick: () => {},
      hover: (
        <VideoEpisodeController title="Testing" seasons={seasonSelections} />
      ),
    },
    {
      icon: <md.MdOutlineSpeed />,
      onClick: () => {},
      hover: <VideoSpeedController title="Select Playback Speed" />,
    },
    {
      icon: <md.MdFullscreen />,
      onClick: () => props.handleFullScreen(),
      margin: 10,
    },
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // console.log("value", isPreviewVolume);
      if (volumeRef && volumeRef.current && video && video.current) {
        const value = Math.max(
          Math.min(
            ((volumeRef.current.getBoundingClientRect().height -
              (e.clientY - volumeRef.current.getBoundingClientRect().top)) /
              volumeRef.current.getBoundingClientRect().height) *
              100,
            100
          ),
          0
        );

        // console.log(value);

        setMousePosY(Math.round(value) / 100);

        if (isPreviewVolume) {
          setVolume(Math.round(value) / 100);
          video.current.volume = Math.round(value) / 100;
        }
      }

      if (timelineRef && timelineRef.current) {
        setOffsetLeftTimeline(timelineRef.current.offsetLeft);
        setMousePosX(e.clientX - timelineRef.current.offsetLeft);

        if (video && video.current && isScrubbingTimeline) {
          const width = timelineRef.current.getBoundingClientRect().width;
          const time = Math.max(
            Math.min((mousePosX / width) * videoLength, videoLength),
            0
          );

          setCurrentTime(time);
          video.current.currentTime = time;
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [
    isScrubbingTimeline,
    mousePosX,
    video,
    videoLength,
    setCurrentTime,
    isPreviewVolume,
    setVolume,
  ]);

  useEffect(() => {
    if (video && video.current) {
      isPlaying ? video.current.play() : video.current.pause();
    }
  }, [isPlaying, video]);

  return (
    <StyledContainer onMouseUp={handleOnMouseUp}>
      {(isMouseMoving || !isPlaying || isOnController) && (
        <StyledHeader>
          <StyledButtonGroup>
            {topLeftControlButton.map((b) => (
              <IconButton button={b} />
            ))}
          </StyledButtonGroup>
          <StyledSpacer onClick={handleSpacerClick} />
          <StyledButtonGroup>
            {topRightControlButton.map((b) => (
              <IconButton button={b} />
            ))}
          </StyledButtonGroup>
        </StyledHeader>
      )}
      <StyledSpacer onClick={handleSpacerClick} />
      {(isMouseMoving || !isPlaying || isOnController) && (
        <StyledFooter
          onMouseOver={handleMouseOverController}
          onMouseLeave={handleMouseOffController}
        >
          <StyledFooterGroup>
            <StyledTimelineContainer
              onMouseOver={handlePreviewOn}
              onMouseLeave={handlePreviewOff}
              onMouseDown={handleOnMouseDownTimeline}
              ref={timelineRef}
            >
              <Slider
                isPreview={isPreviewTimeline}
                previewPos={handlePreviewPos()}
                preview={<StyledPreview />}
                value={(currentTime / videoLength) * 100}
              />
            </StyledTimelineContainer>
            <StyledTimer>
              {secondToString(videoLength - currentTime)}
            </StyledTimer>
          </StyledFooterGroup>
          <StyledFooterGroup>
            <StyledButtonGroup>
              {bottomLeftControlButton.map((b) => (
                <IconButton button={b} />
              ))}
            </StyledButtonGroup>
            <StyledTitle>{title}</StyledTitle>
            <StyledButtonGroup>
              {bottomRightControlButton.map((b) => (
                <IconButton button={b} />
              ))}
            </StyledButtonGroup>
          </StyledFooterGroup>
        </StyledFooter>
      )}
    </StyledContainer>
  );
};

export default VideoController;

const StyledContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: linear-gradient(180deg, #000000 0%, #ffffff00 100%);
`;

const StyledButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledSpacer = styled.div`
  width: 100%;
  height: 100%;
  flex-grow: 1;
`;

const StyledFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;

  background: linear-gradient(0deg, #000000 0%, #ffffff00 100%);
`;

const StyledTimelineContainer = styled.div`
  width: 100%;
  height: 5px;
  margin: 20px;
  margin-bottom: 0;
  position: relative;
`;

const StyledTimer = styled.span`
  margin: 20px;
  margin-left: 0;
  margin-bottom: 0;
`;

const StyledFooterGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  :hover {
    ${StyledTimelineContainer} {
      height: 10px;
    }
  }
`;

const StyledTitle = styled.span`
  position: absolute;
  font-size: 32px;
  font-weight: bold;
  left: 50%;
  transform: translate(-50%, 0);
`;

const StyledPreview = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  border: 2px solid ${COLORS.DEFAULT.PRIMARY_TEXT};

  -webkit-box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.5);
`;

const StyledVolumeSlider = styled.div`
  width: 10px;
  height: 300px;
  position: relative;
`;

const StyledVolumeContainer = styled.div`
  width: 80px;
  height: fit-content;
  padding: 20px 0;
  display: flex;
  justify-content: center;
`;
