import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const GNB = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isBookmark = location.pathname.split("/")[2] === "bookmark";

  const handleClickGNBBtn = (type: "all" | "bookmark") => {
    if (
      (isBookmark && type === "bookmark") ||
      (!isBookmark && type === "all")
    ) {
      return;
    }
    if (type === "bookmark") {
      navigate("/coinlist/bookmark");
    }
    if (type === "all") {
      navigate("/coinlist");
    }
  };
  return (
    <GNBContainer>
      <GNBBtn selected={!isBookmark} onClick={() => handleClickGNBBtn("all")}>
        가상자산 시세 목록
      </GNBBtn>
      <GNBBtn
        selected={isBookmark}
        onClick={() => handleClickGNBBtn("bookmark")}
      >
        북마크 목록
      </GNBBtn>
    </GNBContainer>
  );
};

export default GNB;

const GNBContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  padding: 5px;
  background-color: lightgray;
  border-radius: 10px;
`;

const GNBBtn = styled.div<{ selected?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.selected ? "white" : "")};
  color: ${(props) => (props.selected ? "black" : "darkgray")};
  font-size: x-large;
  font-weight: bold;
  width: 50%;
  height: 100%;
  border-radius: 5px;
  cursor: pointer;
`;
