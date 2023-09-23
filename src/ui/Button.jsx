import styled, { css } from "styled-components";

const StyledButton = styled.button`
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: var(--deafult-radius);
  opacity: 0.8;
  color: ${(props) => props.$textColor || "var(--theme-white-200)"};
  background-color: ${(props) => props.$backgroundColor || "transparent"};
  width: ${(props) => props.$size || "initial"};
  height: ${(props) => props.$size || "initial"};

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
  btnType = "default",
  className,
  onClick,
  color,
  backgroundColor,
  // Dont use it to often.
  size,
}) {
  switch (btnType) {
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
