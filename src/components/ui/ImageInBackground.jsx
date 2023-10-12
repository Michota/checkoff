import { css, styled } from "styled-components";

const StyledImageInBackground = styled.div`
  user-select: none;
  width: 100%;
  height: 100%;
  &::before {
    width: 100%;
    height: 100%;
    content: "";
    display: block;
    ${(props) => {
      return css`
        background-image: url(${props.$imgURL});
      `;
    }}
    background-repeat: no-repeat;
    background-position: center;
    opacity: 0.1;
    filter: drop-shadow(0.5rem 0.5rem 1rem var(--shadow-color));
  }
`;

const TextOnBg = styled.div`
  user-select: none;
  pointer-events: none;
  font-size: 1.8rem;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0.2;
  text-shadow: 2px 2px 2px black;
`;

export function ImageInBackground({ children, imgURL, text }) {
  return (
    <StyledImageInBackground $imgURL={imgURL}>
      {children}
      <TextOnBg>{text}</TextOnBg>
    </StyledImageInBackground>
  );
}

export default ImageInBackground;
