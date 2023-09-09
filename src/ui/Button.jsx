import styled from "styled-components";

const StyledButton = styled.button`
  width: 2.4rem;
  height: 2.4rem;
  border: none;
  background-color: var(--theme-primary);
  border-radius: var(--deafult-radius);
  font-weight: bold;
  color: white;
  cursor: pointer;

  &:hover {
    transform: scale(105%);
  }
  transition: transform 100ms;
`;

const ButtonClose = styled(StyledButton)`
  border: none;
  background-color: var(--theme-red);
`;

function Button({ children, onClick, type = "default" }) {
  switch (type) {
    case "default":
      return <StyledButton onClick={onClick}>{children}</StyledButton>;
    case "close":
      return <ButtonClose onClick={onClick}>{children}</ButtonClose>;
  }
}

export default Button;
