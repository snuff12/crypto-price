import styled from "styled-components";

const Loading = () => {
  return <LoadingBg>로딩중</LoadingBg>;
};

const LoadingBg = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(4px);
`;

export default Loading;
