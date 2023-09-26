import styled from "styled-components";

import "../styles/editor.css";
import { Editor } from "novel";
import { useState } from "react";
import { useTaskContext } from "./Task";

const StyledEditorDiv = styled.div`
  /* color: initial; */
  width: 100%;
  min-width: 50rem;
  height: 100%;

  /* background-color: darkgreen; */
`;

function EditorComponent() {
  const { descjson, updateState, renderType } = useTaskContext();
  return (
    <Editor
      disableStorage={true}
      defaultValue={JSON.parse(descjson)}
      onUpdate={(e) =>
        updateState("descjson", JSON.stringify(e.getJSON().content))
      }
    >
      s
    </Editor>
  );
}

export default EditorComponent;
