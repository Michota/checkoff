import styled from "styled-components";

import "../styles/editor.css";
import { Editor } from "novel";
import { useState } from "react";

const StyledEditorDiv = styled.div`
  /* color: initial; */
  width: 100%;
  min-width: 50rem;
  height: 100%;

  /* background-color: darkgreen; */
`;

function EditorComponent() {
  return (
    <Editor disableStorage={true} defaultValue={"xD!"} onUpdate={}>
      s
    </Editor>
  );
}

export default EditorComponent;
