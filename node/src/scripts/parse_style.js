const { parse } = require("node-html-parser");
const html =
  '<div id="end-border" style=" position: absolute; height: 100%; background-color: #666; width: 1px; left: 219px;"></div>';
const json = parse(html);
const div = json.childNodes[0];
console.log("Parsed json");
