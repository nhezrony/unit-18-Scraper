const path = require("path");
const public = path.join(__dirname, "../public")

module.exports = function (app) {
    // app.get("/survey", (req, res) => res.sendFile(`${public}/survey.html`));
    app.get("*", (req, res) => res.sendFile(`${public}/home.html`));
}