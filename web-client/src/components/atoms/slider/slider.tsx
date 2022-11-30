import styled from "styled-components";
import { COLORS } from "../../../constanst";

type Props = {
  previewPos?: number;
  isPreview?: boolean;
  preview?: React.ReactNode;
  vertical?: boolean;
  value: number;
};

const Slider = (props: Props) => {
  return (
    <>
      <StyledContainer>
        {props.isPreview && (
          <StyledPreviewContainer pos={props.previewPos}>
            {props.preview}
          </StyledPreviewContainer>
        )}
        <StyledProgress value={props.value} vertical={props.vertical}>
          <StyledThumb vertical={props.vertical} />
        </StyledProgress>
      </StyledContainer>
    </>
  );
};

export default Slider;

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${COLORS.DEFAULT.PRIMARY_TEXT};
  display: flex;
  align-items: flex-end;
`;

const StyledProgress = styled.div<{ value: number; vertical?: boolean }>`
  position: absolute;

  ${(props) =>
    props.vertical
      ? `
    width: 100%;
    height: ${props.value}%;
  `
      : `
    height: 100%;
    width: ${props.value}%;
  `}

  background-color: ${COLORS.DEFAULT.PRIMARY_SUB_ELEMENT};
  transition: 0ms;
`;

const StyledThumb = styled.div<{ vertical?: boolean }>`
  position: absolute;
  ${(props) => (props.vertical ? "width: 200%; " : "height: 200%;")}
  aspect-ratio: 1;
  border-radius: 100%;
  border: 2px solid ${COLORS.DEFAULT.PRIMARY_TEXT};
  ${(props) =>
    props.vertical
      ? `
    right: 50%;
    top: 0;
    transform: translate(50%, -50%);
  `
      : `
    right: 0;
    top: 50%;
    transform: translate(50%, -50%);
  `}

  cursor: pointer;
  background-color: ${COLORS.DEFAULT.SECONDARY_ELEMENT};
  -webkit-box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.5);

  :hover {
    border-width: 6px;
  }
`;

const StyledPreviewContainer = styled.div<{ pos?: number }>`
  position: absolute;
  width: 100px;
  bottom: 400%;
  left: ${(props) => props.pos}px;
  transform: translate(-50%, 0);
  transition: 0ms;
`;
