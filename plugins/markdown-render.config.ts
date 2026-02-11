import { Mode } from "vite-plugin-markdown";

export const MarkdownRenderConfig = {
  mode: [Mode.HTML, Mode.TOC, Mode.VUE],
  markdownIt: {
    typographer: true,
    linkify: true,
    html: true,
    xhtmlOut: true,
  },
}