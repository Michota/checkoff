import styled, { css } from "styled-components";
import DeleteButton from "../components/TaskChilds/DeleteButton";

const StyledButton = styled.button`
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.$size || "2.4rem"};
  height: ${(props) => props.$size || "2.4rem"};
  border: none;
  background-color: ${(props) =>
    props.$backgroundColor || css`var(--theme-primary)`};
  border-radius: var(--deafult-radius);
  font-weight: bold;
  color: ${(props) => props.$textColor || "white"};
  aspect-ratio: 1 / 1;
  opacity: 0.6;

  &:hover {
    transform: scale(105%);
    opacity: 1;
  }
  transition: opacity transform 100ms;
`;

const ButtonDelete = styled(StyledButton)`
  font-size: 2rem;
  background-color: transparent;
  transition: color 200ms;
  opacity: 0.6;

  &:hover {
    color: var(--theme-red);
    opacity: 1;
  }
`;

const ButtonRestore = styled(StyledButton)`
  font-size: 2rem;
  background-color: transparent;
  transition: color 200ms;
  opacity: 0.6;
  &:hover {
    color: var(--theme-green);
    opacity: 1;
  }
`;

function Button({
  children,
  className,
  onClick,
  type = "default",
  color,
  size,
  backgroundColor,
}) {
  switch (type) {
    case "default":
      return (
        <StyledButton
          className={className}
          onClick={onClick}
          $size={size}
          $textColor={color}
          $backgroundColor={backgroundColor}
        >
          {children}
        </StyledButton>
      );
    case "delete":
      return (
        <ButtonDelete
          className={className}
          onClick={onClick}
          $size={size}
          $textColor={color}
          $backgroundColor={backgroundColor}
        >
          {children}
        </ButtonDelete>
      );
    case "restore":
      return (
        <ButtonRestore
          className={className}
          onClick={onClick}
          $size={size}
          $textColor={color}
          $backgroundColor={backgroundColor}
        >
          {children}
        </ButtonRestore>
      );
  }
}

export default Button;
