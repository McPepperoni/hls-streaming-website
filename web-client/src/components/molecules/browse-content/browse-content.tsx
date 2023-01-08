import { useState } from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import styled from "styled-components";
import { COLORS } from "../../../constanst";
import { TContentItem, TIconButton } from "../../../types/type";
import IconButton from "../../atoms/icon-button/icon-button";

type Props = {
  content: TContentItem[];
};

const BrowseContent = (props: Props) => {
  const [page, setPage] = useState(0);
  const [previewItem, setPreviewItem] = useState<TContentItem>(
    props.content[0]
  );
  const [isPreview, setIsPreview] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);

  const maxPage = Math.ceil(props.content.length / 4);

  const handleLeftButton = () => {
    setPage(page - 1 < 0 ? maxPage - 1 : page - 1);
  };
  const handleRightButton = () => {
    setPage(page + 1 >= maxPage ? 0 : page + 1);
  };

  const onMouseOverItem = (i: TContentItem, index: number) => {
    setPreviewItem(i);
    setIsPreview(true);
    setPreviewIndex(index % 4);
  };

  const onMouseLeaveItem = () => {
    setIsPreview(false);
  };

  const handleDisplayPosition = (trans: number) => {
    switch (previewIndex) {
      case 0:
        return { trans: trans, pos: previewIndex * 25 };
      case 3:
        return { trans: -trans, pos: previewIndex * 25 };
      default:
        return { trans: 0, pos: previewIndex * 25 };
    }
  };

  const leftButtonStyles: React.CSSProperties = {
    background: "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
  };

  const rightButtonStyles: React.CSSProperties = {
    background: "linear-gradient(-90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
  };

  const rightButton: TIconButton = {
    icon: <MdArrowForwardIos />,
    onClick: handleRightButton,
    position: "absolute",
    right: "0",
    top: "0",
    height: "100%",
    color: COLORS.DEFAULT.PRIMARY_ELEMENT,
    style: rightButtonStyles,
  };

  const leftButton: TIconButton = {
    icon: <MdArrowBackIosNew />,
    onClick: handleLeftButton,
    position: "absolute",
    left: "0",
    top: "0",
    height: "100%",
    color: COLORS.DEFAULT.PRIMARY_ELEMENT,
    style: leftButtonStyles,
  };

  console.log(props.content);

  return (
    <>
      <StyledCategory>
        <StyledCategoryText>Popular</StyledCategoryText>
      </StyledCategory>
      <StyledContainer onMouseLeave={onMouseLeaveItem}>
        <IconButton button={leftButton} />
        <StyledItemContainer page={page}>
          {props.content.map((item, i) => (
            <StyledItem
              onMouseOver={() => onMouseOverItem(item, i)}
              // onMouseLeave={onMouseLeaveItem}
            >
              <StyledGroup>
                <StyledPosterContainer>
                  <StyledPoster
                    src={
                      item.imgSrc === ""
                        ? "https://dummyimage.com/1920x1080"
                        : item.imgSrc
                    }
                    alt="poster"
                  />
                </StyledPosterContainer>
                <StyledTitle>{item.name}</StyledTitle>
              </StyledGroup>
            </StyledItem>
          ))}
        </StyledItemContainer>
        <StyledPreview
          display={isPreview}
          trans={handleDisplayPosition(10).trans}
          position={handleDisplayPosition(10).pos}
          onMouseLeave={onMouseLeaveItem}
        >
          <StyledGroup>
            <StyledPosterContainer>
              <StyledPoster
                src={
                  previewItem.imgSrc === ""
                    ? "https://dummyimage.com/1920x1080"
                    : previewItem.imgSrc
                }
                alt="poster"
              />
            </StyledPosterContainer>
            <StyledTitle>{previewItem.name}</StyledTitle>
          </StyledGroup>
        </StyledPreview>
        <IconButton button={rightButton} />
      </StyledContainer>
    </>
  );
};

export default BrowseContent;

const StyledContainer = styled.div`
  width: 100%;
  display: flex;

  position: relative;
  padding: 40px 20px;
  color: ${COLORS.DEFAULT.PRIMARY_TEXT};
`;

const StyledItemContainer = styled.div<{ page: number }>`
  display: flex;
  width: 100%;

  margin-left: calc(${(props) => props.page} * -100%);
`;

const StyledItem = styled.div`
  display: flex;
  flex-direction: column;
  /* flex: 25% 1 0; */
  width: 25%;
  flex-shrink: 0;
  padding-inline: 5px;
`;

const StyledGroup = styled.div`
  width: 100%;
`;

const StyledPoster = styled.img`
  object-fit: cover;
  width: 100%;
`;

const StyledPosterContainer = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;
`;

const StyledTitle = styled.p`
  font-size: 16px;
`;

const StyledCategory = styled.div`
  width: 100%;
  display: flex;
  margin-top: 60px;
  padding-left: 20px;
`;

const StyledCategoryText = styled.p`
  font-size: 30px;
  color: ${COLORS.DEFAULT.PRIMARY_TEXT};
  font-weight: 900;
`;

const StyledPreview = styled.div<{
  trans: number;
  display: boolean;
  position: number;
}>`
  position: absolute;
  transform: ${(props) =>
    props.display ? `scale(120%) translate(${props.trans}%, 0)` : "scale(0)"};
  flex-direction: column;
  left: ${(props) => `${props.position}%`};
  /* flex: 25% 1 0; */
  width: 25%;
  flex-shrink: 0;
`;

// const StyledPageBar = styled.div``;
