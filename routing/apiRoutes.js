const db = require("../model");
module.exports = (app) => {
    app.post('/api/scrape', async (req, res) => res.send(await db.find()))
    // app.get('/api/scrape', async (req, res) => res.send(await db.find()))
}