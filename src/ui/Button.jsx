import styled, { css } from "styled-components";

const StyledButton = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.4rem;
  height: 2.4rem;
  border: none;
  background-color: var(--theme-primary);
  border-radius: var(--deafult-radius);
  font-weight: bold;
  color: white;

  &:hover {
    transform: scale(105%);
  }
  transition: transform 100ms;

  ${(props) =>
    props.$floating === true &&
    css`
      position: absolute;
      bottom: 0;
      right: 0;
    `};
`;

const ButtonClose = styled(StyledButton)`
  border: none;
  background-color: var(--theme-red);
`;

const ButtonAdd = styled(StyledButton)`
  border: none;
  background-color: var(--theme-green);
  color: var(--theme-black-200);
  font-size: 2rem;
  width: 4rem;
  height: 4rem;
`;

function Button({ children, onClick, type = "default", $floating = false }) {
  switch (type) {
    case "default":
      return (
        <StyledButton $floating={$floating} onClick={onClick}>
          {children}
        </StyledButton>
      );
    case "close":
      return (
        <ButtonClose $floating={$floating} onClick={onClick}>
          {children}
        </ButtonClose>
      );
    case "add":
      return (
        <ButtonAdd $floating={$floating} onClick={onClick}>
          {children}
        </ButtonAdd>
      );
  }
}

export default Button;
