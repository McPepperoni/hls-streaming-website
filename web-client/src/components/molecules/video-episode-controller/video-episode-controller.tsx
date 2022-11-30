import styled from "styled-components";
import { useState } from "react";
import { TSeasonSelection } from "../../../types/type";
import { COLORS } from "../../../constanst";
import * as fi from "react-icons/fi";
import * as md from "react-icons/md";

type Props = {
  title: string;
  seasons: TSeasonSelection[];
};

const VideoEpisodeController = (props: Props) => {
  const [season, setSeason] = useState(0);
  const [episodeSelect, setEpisodeSelect] = useState(true);
  const [seasonSelected, setSeasonSelected] = useState(
    props.seasons[season].label
  );
  const [episode, setEpisode] = useState(0);

  //Change selection window
  const handleSeasonSelect = () => {
    setEpisodeSelect(false);
  };

  //Change episode
  const handleSelectEpisode = (value: number) => {
    setEpisode(value);
  };

  const handleSelectSeason = (i: number) => {
    setSeason(i);
    setEpisodeSelect(true);
    setSeasonSelected(props.seasons[i].label);
  };

  return (
    <StyledContainer>
      <StyledWindowContainer episodeSelect={episodeSelect}>
        <StyledWindow>
          <StyledTitle>{props.title}</StyledTitle>
          <StyledSelectionContainer>
            {props.seasons.map((s, i) => (
              <>
                <StyledSeasonSelection
                  selected={i === season}
                  onClick={() => handleSelectSeason(i)}
                >
                  {i === season && (
                    <StyledCheckMark>
                      <fi.FiCheck />
                    </StyledCheckMark>
                  )}
                  {s.label}
                </StyledSeasonSelection>
              </>
            ))}
          </StyledSelectionContainer>
        </StyledWindow>
        <StyledWindow>
          <StyledSubtitle onClick={handleSeasonSelect}>
            <StyledCheckMark>
              <md.MdArrowBackIosNew />
            </StyledCheckMark>
            {seasonSelected}
          </StyledSubtitle>
          {props.seasons[season].episodes.map((e, i) => (
            <StyledEpisodeSelection
              selected={i === episode}
              onClick={() => handleSelectEpisode(i)}
            >
              <StyledEpisodeTitle>
                {`${i + 1} ${e.title}`}
                <StyledEpisodeProgress progress={e.time} />
              </StyledEpisodeTitle>
              {episode === i && (
                <StyledInfo>
                  <StyledImgSrc
                    src={
                      e.imgSrc === ""
                        ? "https://www.fillmurray.com/640/360"
                        : e.imgSrc
                    }
                  >
                    <StyledPlayButton>
                      <md.MdOutlinePlayCircleOutline />
                    </StyledPlayButton>
                  </StyledImgSrc>
                  <StyledDescription>{e.desc}</StyledDescription>
                </StyledInfo>
              )}
            </StyledEpisodeSelection>
          ))}
        </StyledWindow>
      </StyledWindowContainer>
    </StyledContainer>
  );
};

export default VideoEpisodeController;

const StyledContainer = styled.div`
  width: 500px;
  height: 500px;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  cursor: default;
`;

const StyledWindowContainer = styled.div<{ episodeSelect: boolean }>`
  position: absolute;
  width: 200%;
  height: 100%;
  top: 0;
  left: ${(props) => (props.episodeSelect ? "-100%" : "0")};
  display: flex;
`;

const StyledWindow = styled.div`
  width: 50%;
  height: 100%;
`;

const StyledTitle = styled.span`
  font-weight: 900;
  font-size: 24px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 0 10px 40px;
`;

const StyledSubtitle = styled(StyledTitle)`
  position: relative;
  border: 3px solid ${COLORS.DEFAULT.PRIMARY_TEXT};
  border-radius: 10px 10px 0 0;
  cursor: pointer;
  :hover {
    background-color: rgb(255, 255, 255, 0.25);
  }
`;

const StyledEpisodeSelection = styled.div<{ selected: boolean }>`
  width: 100%;
  text-align: start;
  font-size: 20px;
  padding: 8px 40px;

  font-weight: ${(props) => props.selected && "bold"};
  background-color: ${(props) => props.selected && "rgb(0, 0, 0, 0.25)"};

  :hover {
    background-color: rgb(255, 255, 255, 0.25);
  }
`;

const StyledSeasonSelection = styled.div<{ selected: boolean }>`
  width: 100%;
  text-align: start;
  font-size: 20px;
  padding: 8px 40px;
  cursor: pointer;
  position: relative;

  border: 2px solid transparent;
  border-color: ${(props) => props.selected && COLORS.DEFAULT.PRIMARY_TEXT};
  background-color: ${(props) => props.selected && "rgb(0, 0, 0, 0.25)"};

  :hover {
    background-color: rgb(255, 255, 255, 0.25);
  }
`;

const StyledSelectionContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
`;

const StyledCheckMark = styled.div`
  position: absolute;
  height: 100%;
  aspect-ratio: 1;
  left: 0;
  top: 0;
  padding: 10px;

  svg {
    object-fit: fill;
    height: 100%;
    width: 100%;
  }
`;

const StyledEpisodeTitle = styled.span`
  width: 100%;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledEpisodeProgress = styled.div<{ progress: number }>`
  position: relative;
  width: 25%;
  height: 3px;
  background-color: ${COLORS.DEFAULT.PRIMARY_TEXT};

  ::before {
    content: "";
    height: 100%;
    position: absolute;
    width: ${(props) => `${props.progress}%`};
    top: 0;
    left: 0;
    background-color: ${COLORS.DEFAULT.SECONDARY_SUB_ELEMENT};
  }
`;

const StyledInfo = styled.div`
  width: 100%;
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const StyledImgSrc = styled.div<{ src: string }>`
  height: 100px;
  aspect-ratio: 16 / 9;
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  background-image: url(${(props) => props.src});
  background-size: cover;
  background-position: center;
`;

const StyledDescription = styled.span`
  line-break: auto;
  font-size: 16px;
  font-weight: normal;
`;

const StyledPlayButton = styled.button`
  height: 100%;
  svg {
    font-size: 80px;
    opacity: 0.75;
  }
`;
