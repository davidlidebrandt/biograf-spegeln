import express from "express";
import nunjucks from "nunjucks";
import mdFilter from "nunjucks-markdown-filter";
import axios from "axios";

const app = express();

const env = nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.set('view engine', 'html');

app.use(express.static("./public"));

env.addFilter("md", mdFilter)

app.get("/", async (req,res)=> {
    let movies;
    try {
        movies = await axios.get("https://plankton-app-xhkom.ondigitalocean.app/api/movies");
        res.render("index.html",{"movies":movies.data.data});
    } catch(error) {
        res.status(error.response.status).render("index.html",{"error":error});
    }
});

app.get("/movies/:id", async (req,res)=> {
    let movie;
    const id = req.params.id;
    try {
        movie = await axios.get(`https://plankton-app-xhkom.ondigitalocean.app/api/movies/${id}`);
        res.render("movie.html", {"movie": movie.data.data});
    } catch(error) {
        res.status(error.response.status).render("movie.html", {"error": error});
    }
});

export default app;
