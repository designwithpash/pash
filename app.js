import express from "express";
import bodyParser from "body-parser";
import livereload from "livereload";
import connectLiveReload from "connect-livereload";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import SwipeListener from 'swipe-listener';
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

// Setup LiveReload
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(join(__dirname, "public"));

// Inject LiveReload middleware
app.use(connectLiveReload());

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true })); // If handling form submissions


app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
    res.render("index",{
        call:"https://calendly.com/designwithpash/30min?month=2025-03"
    }); 
});

// Start server
app.listen(3000, () => {
    console.log("Listening on http://localhost:3000");
});

