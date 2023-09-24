import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import SimpleImage from "@editorjs/simple-image";
import Alert from "editorjs-alert";
import { useTaskContext } from "./Task";

// ? table css
// import "../styles/tceditor.css";
import "../styles/editor.css";
import "../styles/myEditor.css";

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
        quote: Quote,
        image: SimpleImage,
        alert: Alert,
        // ! tables disabled becasue of bugged CSS
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
