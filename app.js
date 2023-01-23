import express from "express";
import nunjucks from "nunjucks";
import axios from "axios";

const app = express();

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.set('view engine', 'html');

app.use(express.static("./public"));

app.get("/", async (req,res)=> {
    let movies;
    try {
        movies = await axios.get("https://plankton-app-xhkom.ondigitalocean.app/api/movies");
        res.render("index.html",{"movies":movies.data.data});
    } catch(error) {
        res.render("index.html",{"error":error});
    }
});

app.get("/:id", async (req,res)=> {
    let movie;
    const id = req.params.id;
    try {
        movie = await axios.get(`https://plankton-app-xhkom.ondigitalocean.app/api/movies/${id}`);
        res.render("movie.html", {"movie": movie.data.data});
    } catch(error) {
        res.render("movie.html", {"error": error})
    }
});

app.listen(5080, ()=> {
    console.log("Listening on port 5080......");
});
