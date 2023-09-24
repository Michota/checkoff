import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
// !
import styled from "styled-components";
import { useTaskContext } from "./Task";

const StyledEditorDiv = styled.div`
  width: 100%;
  min-width: 50rem;
  height: 100%;

  /* background-color: darkgreen; */
`;

const config = {
  shortcuts: {
    undo: "CMD+Z",
    redo: "CMD+SHIFT+Z",
  },
};

const EditorComponent = ({ data: providedData }) => {
  // const [data, setData] = useState(providedData);
  const { descjson, updateState, renderType } = useTaskContext();

  const ejInstance = useRef();

  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      onReady: () => {
        ejInstance.current = editor;
      },
      autofocus: true,
      // read JSON
      data: JSON.parse(descjson),
      onChange: async (e) => {
        let content = await editor.saver.save();
        // save data as JSON
        updateState("descjson", JSON.stringify(content));
      },
      tools: {
        header: Header,
      },
    });
  };

  // This will run only once
  useEffect(() => {
    if (ejInstance.current === null) {
      initEditor();
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  return (
    <>
      <StyledEditorDiv id="editorjs"></StyledEditorDiv>
    </>
  );
};

export default EditorComponent;
