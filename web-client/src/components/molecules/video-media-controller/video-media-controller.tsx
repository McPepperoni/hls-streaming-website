import styled from "styled-components";
import React, { useState } from "react";
import { COLORS } from "../../../constanst";
import { TMediaSelection } from "../../../types/type";

type Props = {
  AudioTitle: string;
  SubtitleTitle: string;

  AudioSelections: TMediaSelection[];
  SubtitleSelections: TMediaSelection[];
};

const VideoMediaController = (props: Props) => {
  const [audioSelected, setAudioSelected] = useState(0);
  const [subtitleSelected, setSubtitleSelected] = useState(0);

  const handleOnClick = (
    value: number,
    set: React.Dispatch<React.SetStateAction<number>>
  ) => {
    set(value);
  };

  return (
    <StyledContainer>
      <StyledColumn>
        <StyledTitle>{props.AudioTitle}</StyledTitle>
        <StyledSelectionContainer>
          {props.AudioSelections.map((s, i) => (
            <StyledSelection
              selected={i === audioSelected}
              onClick={() => handleOnClick(i, setAudioSelected)}
            >
              {s.label}
            </StyledSelection>
          ))}
        </StyledSelectionContainer>
      </StyledColumn>
      <StyledColumn>
        <StyledTitle>{props.SubtitleTitle}</StyledTitle>
        <StyledSelectionContainer>
          {props.SubtitleSelections.map((s, i) => (
            <StyledSelection
              selected={i === subtitleSelected}
              onClick={() => handleOnClick(i, setSubtitleSelected)}
            >
              {s.label}
            </StyledSelection>
          ))}
        </StyledSelectionContainer>
      </StyledColumn>
    </StyledContainer>
  );
};

export default VideoMediaController;

const StyledContainer = styled.div`
  width: 500px;
  height: 500px;
  padding: 40px 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;

  ::before {
    content: "";
    position: absolute;
    width: 1px;
    height: 90%;
    background-color: ${COLORS.DEFAULT.PRIMARY_TEXT};
    opacity: 0.25;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

const StyledColumn = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledTitle = styled.span`
  font-weight: 900;
  font-size: 24px;
  display: flex;
  padding-left: 40px;
  justify-content: flex-start;
  margin-bottom: 20px;
`;

const StyledSelection = styled.div<{ selected: boolean }>`
  width: 100%;
  text-align: start;
  font-size: 20px;
  padding: 8px 40px;
  cursor: pointer;

  font-weight: ${(props) => props.selected && "bold"};
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
