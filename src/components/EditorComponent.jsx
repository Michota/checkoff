import { Editor } from "novel";
import styled from "styled-components";
import { useTaskContext } from "./Task";

import "../styles/noveltippy.css";

const StyledEditorDiv = styled(Editor)`
  width: 100%;
  min-width: 50rem;
  height: 100%;
  position: relative;
  background-color: var(--theme-black-200);
  border: none;

  .prose-lg {
    font-size: 2rem;
  }
  .drag-handle {
    background-color: var(--theme-black-400);
  }

  data-tippy-root {
    background-color: red !important;
  }
`;

function EditorComponent() {
  const { descjson, updateState, renderType } = useTaskContext();
  return (
    <StyledEditorDiv
      disableStorage={true}
      defaultValue={JSON.parse(descjson)}
      onUpdate={(e) => {
        // Save content
        console.log(e);
        updateState("descjson", JSON.stringify(e.getJSON().content));
      }}
    >
      s
    </StyledEditorDiv>
  );
}

export default EditorComponent;
