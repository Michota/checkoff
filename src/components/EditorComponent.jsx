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
`;

function EditorComponent() {
  const { descjson, updateState, renderType } = useTaskContext();
  return (
    <StyledEditorDiv
      extensions={[]}
      disableLocalStorage={true}
      defaultValue={JSON.parse(descjson)}
      className="novelEditor"
      onUpdate={(e) => {
        // Save content
        updateState("descjson", JSON.stringify(e.getJSON().content));
      }}
    >
      s
    </StyledEditorDiv>
  );
}

export default EditorComponent;
