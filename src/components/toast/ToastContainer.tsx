import styled from "styled-components";

interface IProps {
  toastList: string[];
}

const ToastContainer = ({ toastList }: IProps) => {
  return (
    <Container>
      {toastList.map((toast) => {
        return <Toast>{toast}</Toast>;
      })}
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 100px;
`;

const Toast = styled.div`
  width: 80px;
  height: 30px;
  margin: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: lightgray;
`;

export default ToastContainer;
