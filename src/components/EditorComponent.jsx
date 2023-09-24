import React, { useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
// !
import styled from "styled-components";
import { useTaskContext } from "./Task";

const StyledEditorDiv = styled.div`
  width: 100%;
  min-width: 50rem;

  background-color: darkgreen;
`;

const DEFAULT_INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      type: "paragraph",
      data: {
        text: "",
        level: 1,
      },
    },
  ],
};

const EditorComponent = ({ data: providedData }) => {
  // const [data, setData] = useState(providedData);
  const { descjson, updateState, renderType } = useTaskContext();
  console.log(descjson);

  const ejInstance = useRef();

  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      onReady: () => {
        ejInstance.current = editor;
      },
      autofocus: true,
      data: descjson,
      onChange: async (e) => {
        let content = await editor.saver.save();

        console.log(JSON.stringify(content));
        updateState("descjson", content);
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
