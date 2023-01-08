import styled from "styled-components";
import { COLORS } from "../../../constanst";
import { TIconButton } from "../../../types/type";

type Props = {
  button: TIconButton;
};

const IconButton = (props: Props) => {
  return (
    <StyledButton {...props.button}>
      {props.button.icon}
      {props.button.hover ? (
        <StyledHover followButton={props.button.followButton}>
          {props.button.hover}
        </StyledHover>
      ) : null}
    </StyledButton>
  );
};

export default IconButton;

const StyledHover = styled.div<{ followButton?: boolean }>`
  position: absolute;
  width: fit-content;
  height: fit-content;
  display: none;
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.DEFAULT.SECONDARY_ELEMENT};
  border-radius: 10px;
  ${(props) =>
    props.followButton
      ? `
        right: 50%;
        transform: translate(50%, 0);
      `
      : `
      right: 0;
      `}
  bottom: 100%;
  cursor: default;

  box-shadow: 10px 10px 30px 0px rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: 10px 10px 30px 0px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 10px 10px 30px 0px rgba(0, 0, 0, 0.5);
`;

const StyledButton = styled.button<{
  margin?: number;
  position?: string;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  color?: string;
  backgroundColor?: string;
  followButton?: boolean;
  transform?: string;
  height?: string;
  width?: string;
}>`
  position: ${(props) => props.followButton && "relative"};
  position: ${(props) => props.position};
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  transform: ${(props) => props.transform};
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  padding: ${(props) => props.margin ?? 20}px;

  svg {
    color: ${(props) => props.color ?? COLORS.DEFAULT.PRIMARY_TEXT};
    font-size: 50px;
  }

  :not(:hover) {
    opacity: 0.5;
  }

  :hover {
    ${StyledHover} {
      display: flex;
    }
  }
`;
