import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import Draggable from "react-draggable";
import styled from "styled-components";
import { MdDragHandle } from "react-icons/md";
import Box from "../ui/Box";

// Container for Draggable
const StyledDraggableContainer = styled(Box)`
  position: fixed;
  width: 80rem;
  height: 60rem;
  background-color: var(--theme-black-100);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 0;
  top: 50%;
  left: 50%;
  ${(props) =>
    `
      margin-left: ${props.$boxSize.w}px;
      margin-top: ${props.$boxSize.h}px;
    `}
`;

// The Handle to move the window around the screen
const StyledGrabHandle = styled.div`
  position: relative;
  width: 100%;
  height: 3rem;
  cursor: grab;
  background-color: rgba(255, 255, 255, 0.05);
  opacity: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: white;
    opacity: 0.2;
    color: black;
  }

  &:active,
  &:focus {
    opacity: 0.3;
    color: black;
    background-color: white;
  }
`;

// Content inside the window
const DraggableContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

function DraggableWindow({ children }) {
  // Calc center of window to position draggable at the center of window.
  const [boxSize, setBoxSize] = useState({ w: 0, h: 0 });
  useEffect(function () {
    setBoxSize({
      w: document.querySelector(".draggable").clientWidth / -2,
      h: document.querySelector(".draggable").clientHeight / -2,
    });
  }, []);

  // ! AVOID WARNING findDOMNode
  const nodeRef = useRef(null);

  return (
    <Draggable
      nodeRef={nodeRef}
      defaultClassName="draggable"
      handle=".dragHandle"
    >
      <StyledDraggableContainer $boxSize={boxSize ?? { w: 0, h: 0 }}>
        <StyledGrabHandle ref={nodeRef} className="dragHandle">
          <MdDragHandle ref={nodeRef} />
        </StyledGrabHandle>
        <DraggableContent ref={nodeRef}>{children}</DraggableContent>
      </StyledDraggableContainer>
    </Draggable>
  );
}

export default DraggableWindow;
