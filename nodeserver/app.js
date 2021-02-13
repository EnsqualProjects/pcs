const express = require("express");
const bodyParser = require("body-parser");

var app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/", (req, res, next) => {
//     res.json(["Tony", "Lisa", "Michael", "Ginger", "Food"]);
// });

// app.post("/email", (req, res, next) => {

//     res.json(["Tony", "Lisa", "Michael", "Ginger", "Food"]);
// });

require("./routes/register.routes.js")(app);

app.listen(process.env.port, () => {
    console.log("Server running on port 3000");
});




