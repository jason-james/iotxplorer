import { Helmet } from "react-helmet";

import { assetURL } from "../../../lib/asset-url";

export function rootHtml({
  styletron,
  jsonGlobals,
  reactMarkup,
  clientScript,
  nonce
}) {
  // const styleBody = styletron.injectDeclaration({ prop: "margin", val: 0 });
  const stylesheets = styletron.getStylesheetsHtml("styletron-global");
  const head = Helmet.rewind();

  return `<!DOCType html>
<html ${head.htmlAttributes.toString()} className="has-navbar-fixed-top">
  <head>
    ${head.title.toString()}
    ${head.meta.toString()}
    ${head.link.toString()}
    ${head.style.toString()}


    <link rel="apple-touch-icon" sizes="180x180" href="${assetURL(
      "/apple-touch-icon.png"
    )}"> 
<link rel="icon" type="image/png" sizes="32x32" href="${assetURL(
    "/favicon-32x32.png"
  )}">
<link rel="icon" type="image/png" sizes="16x16" href="${assetURL(
    "/favicon-16x16.png"
  )}">
<link rel="manifest" href="${assetURL("/site.webmanifest")}">
<link rel="mask-icon" href="${assetURL(
    "/safari-pinned-tab.svg"
  )}" color="#5bbad5">
<meta name="msapplication-TileColor" content="#da532c">
<meta name="theme-color" content="#ffffff">

    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, minimal-ui">
    ${stylesheets}
    ${jsonGlobals}
    ${head.script.toString()}
    ${loadDeferredStyles(
      `
      <link rel="stylesheet" type="text/css" href="${assetURL(
        "/stylesheets/main.css"
      )}">
     `,
      nonce
    )}
  </head>
  <body>
    <div id='root'>${reactMarkup}</div>
    ${
      clientScript
        ? `<script type="text/javascript" crossorigin="" src="${assetURL(
            clientScript
          )}"></script>`
        : ""
    }
  </body>
</html>
`;
}

function loadDeferredStyles(stylesElements, nonce) {
  return `
    <noscript id="deferred-styles">
    ${stylesElements}
    </noscript>
    <script nonce="${nonce}">
      var loadDeferredStyles = function() {
        var addStylesNode = document.getElementById("deferred-styles");
        var replacement = document.createElement("div");
        replacement.innerHTML = addStylesNode.textContent;
        document.body.appendChild(replacement)
        addStylesNode.parentElement.removeChild(addStylesNode);
      };
      var raf = requestAnimationFrame || mozRequestAnimationFrame ||
          webkitRequestAnimationFrame || msRequestAnimationFrame;
      if (raf) raf(function() { window.setTimeout(loadDeferredStyles, 0); });
      else window.addEventListener('load', loadDeferredStyles);
    </script>
  `;
}
