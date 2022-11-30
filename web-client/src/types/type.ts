export type TVideoContext = {
  src: string;
  title: string;
  video: React.RefObject<HTMLVideoElement> | null;

  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;

  currentTime: number;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;

  videoLength: number;
  setVideoLength: React.Dispatch<React.SetStateAction<number>>;

  isFullscreen: boolean;
  setIsFullscreen: React.Dispatch<React.SetStateAction<boolean>>;

  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;

  isMouseMoving: boolean;
};

export type TIconButton = {
  icon: React.ReactNode;
  margin?: number;
  hover?: React.ReactNode;
  followButton?: boolean;

  color?: string;
  backgroundColor?: string;
  onClick?: (e?: React.MouseEvent) => void;
};

export type TSpeedAnchor = {
  value: number;
};

export type TMediaSelection = {
  label: string;
};

export type TSeasonSelection = {
  label: string;
  episodes: TEpisodeSelection[];
};

export type TEpisodeSelection = {
  imgSrc: string;
  title: string;
  desc: string;
  vidSrc: string;
  time: number;
};
