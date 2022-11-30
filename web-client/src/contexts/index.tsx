import { createContext } from "react";
import { TVideoContext } from "../types/type";

const videoInitValue: TVideoContext = {
  src: "",
  video: null,
  isPlaying: false,
  currentTime: 0,
  videoLength: 0,
  isFullscreen: false,
  title: "",
  isMouseMoving: true,
  volume: 0,

  setCurrentTime: () => {},
  setVideoLength: () => {},
  setIsPlaying: () => {},
  setIsFullscreen: () => {},
  setVolume: () => {},
};

export const videoContext = createContext<TVideoContext>(videoInitValue);
