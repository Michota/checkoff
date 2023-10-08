import React from "react";
import Tippy from "@tippyjs/react";
import "../styles/Tippy.css"; // optional

export function Tooltip({ children, content }) {
  return (
    <Tippy content={<span>{content}</span>}>{<span>{children}</span>}</Tippy>
  );
}
