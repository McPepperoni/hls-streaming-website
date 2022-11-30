import styled from "styled-components";
import { useState, useContext } from "react";
import { COLORS } from "../../../constanst";
import { TSpeedAnchor } from "../../../types/type";
import { videoContext } from "../../../contexts";

type Props = {
  title: string;
};

const VideoSpeedController = (props: Props) => {
  const [selected, setSelected] = useState(1);
  const { video } = useContext(videoContext);

  const handleSelectAnchor = (index: number, value: number) => {
    setSelected(index);

    if (video && video.current) {
      video.current.playbackRate = value;
    }
  };

  const speedAnchor: TSpeedAnchor[] = [
    {
      value: 0.5,
    },
    {
      value: 1,
    },
    {
      value: 1.5,
    },
    {
      value: 1.75,
    },
    {
      value: 2,
    },
  ];

  return (
    <StyledContainer>
      <StyledTitle>{props.title}</StyledTitle>
      <StyledSpeedAnchorContainer>
        {speedAnchor.map((a, i) => (
          <StyledSpeedAnchor
            selected={i === selected}
            onClick={() => handleSelectAnchor(i, a.value)}
          >
            <StyledSpeedAnchorValue
              selected={i === selected}
            >{`${a.value}x`}</StyledSpeedAnchorValue>
          </StyledSpeedAnchor>
        ))}
      </StyledSpeedAnchorContainer>
    </StyledContainer>
  );
};

export default VideoSpeedController;

const StyledContainer = styled.div`
  width: 600px;
  height: 200px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledTitle = styled.span`
  font-weight: 900;
  font-size: 30px;
  margin-bottom: 20px;
  text-align: start;
`;

const StyledSpeedAnchorContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;

  ::before {
    content: "";
    position: absolute;
    height: 5px;
    width: 100%;
    top: 50%;
    transform: translate(0, -50%);
    background-color: ${COLORS.DEFAULT.PRIMARY_TEXT};
  }
`;

const StyledSpeedAnchor = styled.button<{ selected: boolean }>`
  height: 20px;
  background-color: ${COLORS.DEFAULT.PRIMARY_TEXT};
  aspect-ratio: 1;
  border-radius: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 0px solid ${COLORS.DEFAULT.PRIMARY_TEXT}; */

  ::before {
    content: "";
    position: absolute;
    width: ${(props) => (props.selected ? "30px" : "0")};
    aspect-ratio: 1;
    border: 5px solid ${COLORS.DEFAULT.PRIMARY_TEXT};
    background-color: transparent;
    border-radius: 100%;
  }

  :hover {
    background-color: ${COLORS.DEFAULT.PRIMARY_ELEMENT};
    /* border-width: 4px; */
  }
`;

const StyledSpeedAnchorValue = styled.span<{ selected: boolean }>`
  position: absolute;
  font-size: 20px;
  top: -35px;
  font-weight: ${(props) => props.selected && "900"};
`;
