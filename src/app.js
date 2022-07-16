
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

// Route to Homepage
// app.get('/', (req, res) => {

//   res.sendfile("views/home.html");
// });

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/share', (req, res) => {
  res.render('share');
});

// Routing
app.use("/auth", authRouter);
app.use("/share", shareRouter);

// start server use promise
const PORT = process.env.PORT || 8080;
await util.promisify(app.listen).bind(app)(PORT)
console.log(`Listening on port ${PORT}`)