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
  position?: string;
  hover?: React.ReactNode;
  followButton?: boolean;

  left?: string;
  right?: string;
  bottom?: string;
  top?: string;
  transform?: string;

  height?: string;
  width?: string;

  color?: string;
  backgroundColor?: string;
  onClick?: (e?: React.MouseEvent) => void;
  disabled?: boolean;

  style?: React.CSSProperties;
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

type TMetadata = {
  AudioChannels: number;
  Duration: string;
  ImageHeight: number;
  ImageWidth: number;
};

type TSeries = {
  Parent: string;
  Season: string;
};

export type TContentItem = {
  imgSrc: string;
  path?: string;
  name: string;
  ext: string;
  isSeries: string;
  metadata: TMetadata;
  series: TSeries;
};
