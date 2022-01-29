import { h, VNode } from "preact";
import { useLayoutEffect, useRef } from "preact/hooks";
import { css } from "@linaria/core";

interface Props {
  src: any;
}

const style = css`
  user-select: none;
  width: 1em;
  height: 1em;
  display: inline-block;
  fill: currentColor;
  flex-shrink: 0;
  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;

  & > svg {
    font-size: 20;
  }
`;

export function SvgIcon({ src }: Props): VNode {
  const ref = useRef<HTMLSpanElement>(null);
  useLayoutEffect(() => {
    if (!ref.current) return;
    ref.current.appendChild(src);
  });
  return <span ref={ref} class={style} />;
}
