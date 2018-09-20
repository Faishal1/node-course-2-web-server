const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.use(express.static(__dirname + "/public"));
app.set("view engine", "hbs");
hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt", text => {
  return text.toUpperCase();
});

app.use((req, res, next) => {
  var now = new Date().toString();

  var log = `${now} ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile("server.log", log + "\n", err => {
    if (err) {
      console.log("Unable to append ");
    }
  });
  next();
});

app.get("/", (req, res) => {
  // res.send("<h1>Hello Express!</h1>");
  // res.send({
  //     name: "andrew",
  //     likes: [
  //         'biking',
  //         'cities'
  //     ]
  // })
  res.render("home.hbs", {
    pageTitle: "HOMEPAGE HAI YEH SMAJHA KYA",
    message: "Welcome to the HOMEPAGE"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    pageTitle: "About Page re baba"
  });
});

app.listen(port, () => {
  console.log(`App is listening to port ${port}`);
});
