import { Editor } from "novel";
import styled from "styled-components";
import { useTaskContext } from "./Task";
import "../styles/noveltippy.css";

const StyledEditorDiv = styled(Editor)`
  width: 100%;
  min-width: 50rem;
  height: 100%;
  position: relative;
  border: none;

  .novel-prose-lg {
    font-size: 1.6rem;
  }
  .drag-handle {
    background-color: var(--theme-black-400);
  }

  ul[data-type="taskList"] li > label input[type="checkbox"] {
    border: 2px solid var(--theme-white-200);
  }
`;

function EditorComponent() {
  const { descjson, updateState, renderType, id } = useTaskContext();
  return (
    <StyledEditorDiv
      extensions={[]}
      disableLocalStorage={true}
      // If its a new task, then prevent error by passing an empty object to parse function.
      defaultValue={JSON.parse(id <= 0 ? JSON.stringify({}) : descjson)}
      className="novelEditor"
      onUpdate={(e) => {
        // Save content
        updateState("descjson", JSON.stringify(e.getJSON().content));
      }}
    ></StyledEditorDiv>
  );
}

export default EditorComponent;
