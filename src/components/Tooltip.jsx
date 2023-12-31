import React from "react";
import Tippy from "@tippyjs/react";
import styled, { css } from "styled-components";

const StyledTippy = styled(Tippy)`
  & {
    /* Arrow */
    .tippy-arrow {
      width: 16px;
      height: 16px;
      color: ${(props) =>
        props.$backgroundColor
          ? props.$backgroundColor
          : css`var(--theme-black-300)`};
      .light-theme & {
        color: var(--theme-black-000);
      }
    }
    .tippy-arrow:before {
      content: "";
      position: absolute;
      border-color: transparent;
      border-style: solid;
    }
    .tippy-content {
      position: relative;
      padding: 5px 9px;
      z-index: 1;
    }
  }

  /* Box */

  &[data-animation="fade"][data-state="hidden"] {
    opacity: 0;
  }
  [data-tippy-root] {
    max-width: calc(100vw - 10px);
  }
  & {
    position: relative;
    color: var(--theme-white-200);
    background-color: ${(props) =>
      props.$backgroundColor
        ? props.$backgroundColor
        : css`var(--theme-black-300)`};
    box-shadow: var(--drop-shadow);
    border-radius: 4px;
    font-size: 14px;
    line-height: 1.4;
    white-space: normal;
    outline: 0;
    transition-property: transform, visibility, opacity;

    .light-theme & {
      background-color: ${(props) =>
        props.$backgroundColor
          ? props.$backgroundColor
          : css`var(--theme-black-200)`};
      color: var(--theme-white-000);
    }
  }

  &[data-placement^="top"] > .tippy-arrow {
    bottom: 0;
  }
  &[data-placement^="top"] > .tippy-arrow:before {
    bottom: -7px;
    left: 0;
    border-width: 8px 8px 0;
    border-top-color: initial;
    transform-origin: center top;
  }
  &[data-placement^="bottom"] > .tippy-arrow {
    top: 0;
  }
  &[data-placement^="bottom"] > .tippy-arrow:before {
    top: -7px;
    left: 0;
    border-width: 0 8px 8px;
    border-bottom-color: initial;
    transform-origin: center bottom;
  }
  &[data-placement^="left"] > .tippy-arrow {
    right: 0;
  }
  &[data-placement^="left"] > .tippy-arrow:before {
    border-width: 8px 0 8px 8px;
    border-left-color: initial;
    right: -7px;
    transform-origin: center left;
  }
  &[data-placement^="right"] > .tippy-arrow {
    left: 0;
  }
  &[data-placement^="right"] > .tippy-arrow:before {
    left: -7px;
    border-width: 8px 8px 8px 0;
    border-right-color: initial;
    transform-origin: center right;
  }
  &[data-inertia][data-state="visible"] {
    transition-timing-function: cubic-bezier(0.54, 1.5, 0.38, 1.11);
  }
`;

export function Tooltip({
  arrow = false,
  className,
  children,
  content,
  noSpan = false,
  duration = [200, 500],
  backgroundColor,
  textColor,
}) {
  return (
    <StyledTippy
      ref={children}
      arrow={arrow}
      duration={duration}
      className={className}
      $backgroundColor={backgroundColor}
      content={<span style={{ color: textColor }}>{content}</span>}
    >
      {noSpan ? children : <span>{children}</span>}
    </StyledTippy>
  );
}
