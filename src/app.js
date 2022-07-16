
import express from "express";
import bodyParser from "body-parser";
import * as util from "util";

// router import
import authRouter from "./routes/auth.route.js";

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('views'))

// Route to Homepage
app.get('/', (req, res) => {

  res.sendfile("views/home.html");
});

// Routing
app.use("/auth", authRouter);

// start server use promise
const PORT = process.env.PORT || 8080;
await util.promisify(app.listen).bind(app)(PORT)
console.log(`Listening on port ${PORT}`)