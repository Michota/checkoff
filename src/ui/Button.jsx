import styled, { css } from "styled-components";

const StyledButton = styled.button`
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

  &:hover {
    transform: scale(105%);
  }
  transition: transform 100ms;
`;

const ButtonDelete = styled(StyledButton)`
  background-color: transparent;
  transition: color 200ms;
  &:hover {
    color: var(--theme-red);
  }
`;

function Button({
  children,
  className,
  onClick,
  type = "default",
  floating = false,
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
  }
}

export default Button;
