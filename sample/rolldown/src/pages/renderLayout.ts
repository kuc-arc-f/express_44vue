
let PATH__FAVICON = "/favicon.ico";
let PATH__JS = "/static/main.js";
let PATH__CSS = "/static/main.css";

export default function Compo(props: any) {
  if (process.env.NODE_ENV === "production"){
    PATH__JS = "/public/static/main.js"
    PATH__CSS = "/public/static/main.css";
  }
  const html = `<!DOCTYPE html><html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${props.title}</title>
    <link href="${PATH__CSS}" rel="stylesheet"/>
  </head>
  <body>
    ${props.children}
    <script type="module" src="${PATH__JS}" ></script>
  </body></html>
  `
  return html;
}
