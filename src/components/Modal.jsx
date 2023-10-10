import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { useClickOutside } from "../hooks/useClickOutside";
import Box from "../ui/Box";
import Button from "../ui/Button";
import { MdClose } from "react-icons/md";

const StyledModal = styled(Box)`
  position: fixed;
  aspect-ratio: 1/1;
  min-height: 20vw;
  width: max-content;
  height: max-content;
  z-index: 999;
  background-color: var(--theme-black-200);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BackgroundBlur = styled.div`
  backdrop-filter: blur(10px);
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  z-index: 888;
`;

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ open, close, openName }}>
      {children}
    </ModalContext.Provider>
  );
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useClickOutside(close);

  if (name !== openName) return null;

  return createPortal(
    <BackgroundBlur>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <MdClose />
        </Button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </BackgroundBlur>,
    document.body
  );
}

function Open({ children, windowName }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(windowName) });
}

Modal.Window = Window;
Modal.Open = Open;

export default Modal;
