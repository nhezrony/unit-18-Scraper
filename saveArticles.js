const {
    scrape
} = require('./scraper')

const db = require('./model')

const saveArticles = async () => {
    const articles = await scrape()
    // db.create({})
    db.deleteMany({}, err => console.log('collection removed'));
    articles.map(article => db.create(article))
}
saveArticles()
module.exports = saveArticles;