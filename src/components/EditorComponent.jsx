import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import SimpleImage from "@editorjs/simple-image";
import Alert from "editorjs-alert";
import Underline from "@editorjs/underline";
import Undo from "editorjs-undo";
import Warning from "@editorjs/warning";

import { useTaskContext } from "./Task";
import styled from "styled-components";
import React, { useEffect, useRef, useState } from "react";

import "../styles/editor.css";

const StyledEditorDiv = styled.div`
  /* color: initial; */
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

const handleReady = (editor) => {
  new Undo({ editor });
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
        handleReady();
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
        underline: Underline,
        warning: Warning,

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
