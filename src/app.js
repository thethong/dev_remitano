
import express from "express";
import bodyParser from "body-parser";
import * as util from "util";

// router import
import authRouter from "./routes/auth.route.js";
import shareRouter from "./routes/share.route.js";

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'))
app.use(express.static('views'))

app.set("view engine", "pug");
app.set('views','./views');

// Route to Home page
app.get('/', (req, res) => {
  res.render('home');
});

// Route to Share page
app.get('/share', (req, res) => {
  res.render('share');
});

// Routing API
app.use("/v1/auth", authRouter);
app.use("/v1/share", shareRouter);

// start server use promise
const PORT = process.env.PORT || 8080;
await util.promisify(app.listen).bind(app)(PORT)
console.log(`Listening on port ${PORT}`)