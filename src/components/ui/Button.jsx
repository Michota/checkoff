import styled, { css } from "styled-components";
import { Tooltip } from "../Tooltip";

const StyledButton = styled.button`
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: var(--default-radius);
  opacity: 0.8;
  color: ${(props) => props.$textColor || "var(--theme-white-200)"};
  background-color: ${(props) => props.$backgroundColor || "transparent"};
  width: ${(props) => props.$size || "initial"};
  height: ${(props) => props.$size || "initial"};
  font-size: 1em;

  transition-property: transform, opacity;
  transition-duration: 200ms;

  &:hover {
    transform: scale(102%);
    opacity: 1;
  }

  &:active {
    transform: scale(99%);
  }
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

const PrimaryButton = styled(StyledButton)`
  background-color: var(--theme-primary);
  color: var(--theme-black-200);
  padding: 1rem 2rem;
  width: 100%;

  .light-theme & {
    background-color: var(--theme-primary);
    color: var(--theme-white-200);
  }
`;

const SecondaryButton = styled(PrimaryButton)`
  background-color: transparent;
  color: var(--theme-primary);
  outline: 0.2rem solid var(--theme-primary);

  .light-theme & {
    color: var(--theme-white-000);
    background-color: transparent;
    outline: 0.1rem solid var(--theme-white-400);
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
  size, // Dont use it to often.
  tip,
}) {
  function createButton() {
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
      case "primary":
        return (
          <PrimaryButton
            className={className}
            onClick={onClick}
            $size={size}
            $textColor={color}
            $backgroundColor={backgroundColor}
          >
            {children}
          </PrimaryButton>
        );
      case "secondary":
        return (
          <SecondaryButton
            className={className}
            onClick={onClick}
            $size={size}
            $textColor={color}
            $backgroundColor={backgroundColor}
          >
            {children}
          </SecondaryButton>
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
  if (tip) {
    return <Tooltip content={tip}>{createButton()}</Tooltip>;
  } else {
    return createButton();
  }
}

export default Button;
