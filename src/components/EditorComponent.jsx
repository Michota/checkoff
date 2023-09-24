import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import SimpleImage from "@editorjs/simple-image";
import Alert from "editorjs-alert";
import Underline from "@editorjs/underline";
import Undo from "editorjs-undo";
import Warning from "@editorjs/warning";
import NestedList from "@editorjs/nested-list";
import ColorPlugin from "editorjs-text-color-plugin";
import Strikethrough from "@sotaproject/strikethrough";
import DragDrop from "editorjs-drag-drop";

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

// const inlineToolbar = [
//   "bold",
//   "italic",
//   "underline",
//   "strikethrough",
//   "color",
//   "marker",
//   "list",
//   "alert",
//   "warning",
// ];

// Tools (plugins) for editor
const tools = {
  header: {
    class: Header,
    inlineToolbar: true,
  },
  underline: Underline,
  strikethrough: Strikethrough,
  quote: {
    class: Quote,
    inlineToolbar: true,
  },
  image: SimpleImage,
  alert: {
    class: Alert,
    inlineToolbar: true,
  },
  warning: {
    class: Warning,
    inlineToolbar: true,
  },
  list: {
    class: NestedList,
    inlineToolbar: true,
    config: {
      defaultStyle: "unordered",
    },
  },
  color: {
    class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
    config: {
      colorCollections: [
        "#EC7878",
        "#9C27B0",
        "#673AB7",
        "#3F51B5",
        "#0070FF",
        "#03A9F4",
        "#00BCD4",
        "#4CAF50",
        "#8BC34A",
        "#CDDC39",
        "#FFF",
      ],
      defaultColor: "#fff",
      type: "text",
      customPicker: true, // add a button to allow selecting any colour
    },
  },
  marker: {
    class: ColorPlugin,
    config: {
      defaultColor: "#FFBF00",
      type: "marker",
      icon: `<svg fill="#000000" height="200px" width="200px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M17.6,6L6.9,16.7c-0.2,0.2-0.3,0.4-0.3,0.6L6,23.9c0,0.3,0.1,0.6,0.3,0.8C6.5,24.9,6.7,25,7,25c0,0,0.1,0,0.1,0l6.6-0.6 c0.2,0,0.5-0.1,0.6-0.3L25,13.4L17.6,6z"></path> <path d="M26.4,12l1.4-1.4c1.2-1.2,1.1-3.1-0.1-4.3l-3-3c-0.6-0.6-1.3-0.9-2.2-0.9c-0.8,0-1.6,0.3-2.2,0.9L19,4.6L26.4,12z"></path> </g> <g> <path d="M28,29H4c-0.6,0-1-0.4-1-1s0.4-1,1-1h24c0.6,0,1,0.4,1,1S28.6,29,28,29z"></path> </g> </g></svg>`,
    },
  },

  // ! tables disabled becasue of bugged CSS
};

// allow Undo & Redo shortcuts to work
const handleReady = (editor, initialData) => {
  const undo = new Undo({ editor });
  undo.initialize(initialData);

  new DragDrop(editor);
};

const EditorComponent = () => {
  const { descjson, updateState, renderType } = useTaskContext();

  const ejInstance = useRef();

  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      onReady: () => {
        ejInstance.current = editor;
        handleReady(editor, JSON.parse(descjson));
      },
      autofocus: true,
      // read JSON
      data: JSON.parse(descjson),
      onChange: async (e) => {
        let content = await editor.saver.save();
        // save data as JSON
        updateState("descjson", JSON.stringify(content));
      },
      tools,
      placeholder: "A place for a description!",
      logLevel: "ERROR",
    });
  };

  // Initialize editor.
  useEffect(
    () => {
      if (ejInstance.current === null) {
        initEditor();
      }

      return () => {
        ejInstance?.current?.destroy();
        ejInstance.current = null;
      };
    },
    // DONT ADD ANY DEPENDENCIES!
    []
  );

  return (
    <>
      <StyledEditorDiv id="editorjs"></StyledEditorDiv>
    </>
  );
};

export default EditorComponent;