var Xray = require("x-ray");
const cheerio = require("cheerio");
var x = Xray();

const scrapeLinks = async () => {
  return new Promise((resolve, reject) => {
    let links = [];
    x("http://www.sciencemag.org/news", "body@html")((err, res) => {
      const $ = cheerio.load(res);
      $(".item-list")
        .find("h2", ".media__headline")
        .each(function(i, li) {
          let resp = $(li).html();
          i < 15 ? links.push(`${/href="(.*)">/gm.exec(resp)[1]}`) : i;
        });
      resolve(links);
    });
  });
};

const scrapeArticle = async link => {
  return new Promise((resolve, reject) => {
    x(link, "body@html")((err, res) => {
      const $ = cheerio.load(res);
      let title = $(".article__body")
        .find("h1", ".article__headline")
        .text();
      let author = $(".article__body")
        .find("p", ".byline byline--article")
        .find("a")
        .html();
      let date = $(".article__body")
        .find("p", ".byline byline--article")
        .find("time")
        .html();
      let articleHTML = $(".article__body").html();
      articleHTML = articleHTML.replace(
        /<div class="entity([^]+)<\/div>/gm,
        ""
      );
      articleHTML = articleHTML.replace(/<header([^]+)<\/header>/gm, "");
      articleHTML = articleHTML.replace(/<span property[^]+<\/span>/gm, "");
      articleHTML = articleHTML.trim();
      let article = {
        title,
        author,
        date,
        articleHTML
      };
      resolve(article);
    });
  });
};

const scrapeArticles = async links => {
  let articles = links.map(async link => await scrapeArticle(link));
  return await Promise.all(articles);
};

const scrape = async () => {
  const links = await scrapeLinks();
  const articles = await scrapeArticles(links);
  return articles;
};

module.exports = {
  scrape
};
