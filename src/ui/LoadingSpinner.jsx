import styled, { css } from "styled-components";
import "../styles/LoadingSpinner.css";

const FullScreenSpinner = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(15px);
  z-index: 1000;
`;

function DefaultSpinner() {
  return (
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

function LoadingSpinner({ type = "default" }) {
  if (type === "full")
    return (
      <>
        <FullScreenSpinner>
          <DefaultSpinner />
        </FullScreenSpinner>
      </>
    );
  if (type === "default") return <DefaultSpinner />;
}

export default LoadingSpinner;
