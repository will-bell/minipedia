const { parsePageHtml } = require("../routes/src/getPageJson");
const { parseContents } = require("../routes/src/parseContents");
const fs = require("fs");
const { parse } = require("node-html-parser");

let htmlData = fs.readFileSync("./scripts/just_the_table.html", "utf-8");
parseContents(parse(htmlData).childNodes);
