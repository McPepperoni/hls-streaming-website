import { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS } from "../../constanst";
import { getCollection } from "../../firebase/firebase";
import { TContentItem } from "../../types/type";
import BrowseContent from "../molecules/browse-content/browse-content";
// import { getCollection } from "../../firebase/firebase";

const BrowseTemplate = () => {
  const [data, setData] = useState<TContentItem[]>([]);

  useEffect(() => {
    getCollection().then((data) => {
      var result: TContentItem[] = [];
      // setData(data.docs);
      data.docs.forEach((d) => {
        const resData = d.data();
        var temp: TContentItem = {
          name: resData.Name,
          imgSrc: "",
          path: resData.Path,
          ext: resData.Ext,
          metadata: resData.Metadata,
          isSeries: resData.IsSeries,
          series: resData.Series,
        };
        result.push(temp);
        // console.log(d.data());
      });
      // console.log(data.docs);
      setData(result);
    });
  }, []);

  // const items: TContentItem[] = [
  //   {
  //     name: "test",
  //     imgSrc: "",
  //     path: "",
  //   },
  //   {
  //     name: "test",
  //     imgSrc: "http://localhost:8080/Heriditary/poster.jpg",
  //     path: "",
  //   },
  //   {
  //     name: "test",
  //     imgSrc: "",
  //     path: "",
  //   },
  //   {
  //     name: "test",
  //     imgSrc: "",
  //     path: "",
  //   },
  //   {
  //     name: "test",
  //     imgSrc: "",
  //     path: "",
  //   },
  // ];

  return (
    <StyledContainer>
      <BrowseContent content={data}></BrowseContent>
    </StyledContainer>
  );
};

export default BrowseTemplate;

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${COLORS.DEFAULT.PRIMARY_BG};
`;
