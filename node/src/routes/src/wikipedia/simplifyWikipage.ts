import { Cheerio, CheerioAPI, Element } from "cheerio";

const removeUnusedElements = ($: CheerioAPI) => {
  $("meta").remove();
  $("link").remove();
  $("style").remove();
  $(".nomobile").remove();
  $(".noviewer").remove();
  $(".reference").remove();
  $(".mw-empty-elt").remove();
  $(".box-More_citations_needed").remove();
  $(".mw-editsection").remove();
  $(".mwe-math-mathml-inline").remove();
  $(".mwe-math-mathml-a11y").remove();
  $("[class^=toclimit-]").remove();
};

const removeWikimediaAttrs = ($: CheerioAPI) => {
  $("*").removeAttr(
    "id about data-mw-section-id rel data-file-width \
    data-file-height data-file-type resource typeof"
  );
};

const removeWikimediaClasses = ($: CheerioAPI) => {
  $("*").removeClass("mw-redirect navigation-not-searchable adr noprint metadata");
};

function cleanSections($: CheerioAPI) {
  function operation(headers: Cheerio<Element>) {
    headers.each((i, elem) => {
      const header = $(elem);

      // Make the id for the header the title of the section
      header.attr({ id: header.text().replace(/ /g, "_") });

      // Get the header text out of the unneeded
      const headerSpan = header.children(".mw-headline");
      headerSpan.replaceWith(headerSpan.text());
    });
  }

  operation($("h2"));
  operation($("h3"));
  operation($("h4"));
}

const cleanLinks = ($: CheerioAPI) => {
  const extLinks = $(".external");
  extLinks.each((i, elem) => {
    const extLink = $(elem);
    extLink.replaceWith(extLink.contents());
  });

  const refLinks = $(".mw-cite-backlink a");
  refLinks.each((i, elem) => {
    const extLinks = $(elem);
    extLinks.replaceWith(extLinks.contents());
  });

  const wikilinks = $("a");
  wikilinks.addClass("wikilink");
};

function removeNeedlessSpans($: CheerioAPI) {
  $(".mwe-math-element").children().unwrap();
}

const strainDivSoup = ($: CheerioAPI) => {
  const removeAttrlessDivs = (i: number, elem: Element) => {
    // Remove any div/spans without any attributes
    if (!Object.keys(elem.attribs).length) {
      $(elem.childNodes).unwrap();
    }
  };

  // Clean up any divs and spans without any attributes (div soup)
  $("div").each(removeAttrlessDivs);
  $("span").each(removeAttrlessDivs);
};

const audioNotYetSupported = ($: CheerioAPI) => {
  $("audio").replaceWith('<span style="color:red">audio tags not supported yet</span>');
};

export const simplifyWikipage = ($: CheerioAPI) => {
  removeUnusedElements($);
  removeWikimediaAttrs($);
  removeWikimediaClasses($);

  cleanSections($);
  cleanLinks($);

  removeNeedlessSpans($);

  strainDivSoup($);

  audioNotYetSupported($);

  return $("body");
};
