import styled from "styled-components";
import Box from "../ui/Box";
import { createContext } from "react";
import Button from "../ui/Button";
import { MdClose } from "react-icons/md";

const StyledDialog = styled(Box)`
  position: fixed;
  left: 50;
  top: 50;
  padding: 0rem;
  overflow: auto;
  display: flex;
  background-color: var(--theme-black-200);
  opacity: 95%;
  z-index: 777;
`;

const StyledHeader = styled.header`
  position: absolute;
  top: 0;
  width: 100%;
  background-color: var(--theme-black-100);
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  border-radius: var(--deafult-radius);
`;

const DialogContext = createContext();

function Dialog({ children, header }) {
  return (
    <DialogContext.Provider>
      <StyledDialog>{header && <Header>{header}</Header>}</StyledDialog>
    </DialogContext.Provider>
  );
}

export default Dialog;

function Header({ children }) {
  return (
    <StyledHeader>
      <span>{/* Empty on purpose */}</span>
      <p>Title</p>
      <Button backgroundColor="transparent">
        <MdClose size="2em" />
      </Button>
    </StyledHeader>
  );
}
