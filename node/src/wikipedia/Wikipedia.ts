import { load } from "cheerio";
import { simplifyWikiHtml } from "./simplifyWikiHtml";

export default class Wikipedia {
  static baseurl = "https://en.wikipedia.org/w/api.php?";

  async getPageHtml(title: string): Promise<string | null> {
    const url =
      Wikipedia.baseurl +
      new URLSearchParams({
        origin: "*",
        action: "parse",
        page: title,
        format: "json",
      });

    return fetch(url)
      .then((response) => response.json())
      .then((jsonData) => {
        const wikiHtml = jsonData.parse.text["*"];
        const $ = load(wikiHtml);
        return simplifyWikiHtml($).html();
      });
  }

  async getTitles(searchString: string): Promise<[string]> {
    const url =
      Wikipedia.baseurl +
      new URLSearchParams({
        action: "opensearch",
        search: searchString,
        limit: "10",
        namespace: "0",
        format: "json",
      });

    return fetch(url)
      .then((response) => response.json())
      .then((jsonData) => jsonData[1]);
  }
}
