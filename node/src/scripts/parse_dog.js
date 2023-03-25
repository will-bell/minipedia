const getPageJson = require("../wikipedia/getPageHtml");
const getWikiTitles = require("../wikipedia/getWikiTitles");
const fs = require("fs");

getPageJson("Ada_Lovelace").then((html) => fs.writeFileSync("./result.html", html));
getWikiTitles("Ada");
