import express from "express";
import { engine } from "express-handlebars";
import morgan from "morgan";
import path from "path";
import router from "./routes";

const app = express();

app.use(express.static("static"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.locals.APP_NAME = process.env.APP_NAME;
app.locals.APP_URL = process.env.APP_URL;

app.engine(
  "hbs",
  engine({
    defaultLayout: "main",
    extname: ".hbs",
    layoutsDir: path.join(__dirname, "./views/layouts"),
    partialsDir: path.join(__dirname, "./views/partials"),
  })
);

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("home");
});

app.use(router);

app.use((req, res, next) => {
  res.status(404).render("404");
});

app.listen(process.env.APP_PORT, () =>
  console.log(`server started at http://localhost:${process.env.APP_PORT}`)
);
