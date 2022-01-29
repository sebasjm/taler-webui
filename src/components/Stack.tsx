import { h, VNode, ComponentChildren } from "preact";
import { css } from "@linaria/core";

interface Props {
  children: ComponentChildren;
}

const style = css`
  display: flex;
  flex-direction: column;
`;

export function Stack({ children }: Props): VNode {
  return <div class={style}>{children}</div>;
}
