const getPageJson = require("../routes/src/wikipedia/getPageHtml");
const getWikiTitles = require("../routes/src/wikipedia/getWikiTitles");
const fs = require("fs");

getPageJson("Ada_Lovelace").then((html) => fs.writeFileSync("./result.html", html));
getWikiTitles("Ada");
