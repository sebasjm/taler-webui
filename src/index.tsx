import { h, render } from "preact";
import { App } from "./App";

export default function main(element: Element): void {
  render(<App />, element);
}
