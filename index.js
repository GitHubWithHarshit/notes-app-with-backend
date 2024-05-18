const path = require('node:path');
const express = require('express');
const app = express();
const fs = require('node:fs');
const PORT = 3000;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname , 'public')));



// Home route
app.get("/", (req, res)=>{
    fs.readdir(`./file`, (err, file)=>{
        res.render("main", {file:file});
    })
    
});



// see details route
app.get("/file/:filename", (req, res)=>{
    fs.readFile(`./file/${req.params.filename}`, 'utf-8', (err, filedata)=>{
        res.render("show", {filename: req.params.filename, filedata:filedata});
    });
});



// get edit route
app.get("/edit/:filename", (req, res)=>{
    res.render("edit", {filename:req.params.filename});
});


// post edit route
app.post("/edit", function(req, res){
    fs.rename(`./file/${req.body.previous}` , `./file/${req.body.new}`, function(err){
        res.redirect("/")
    });
})


// notes create route
app.post("/create", (req, res)=>{
    fs.writeFile(`./file/${req.body.title.split(' ').join('')}.txt`, req.body.details, (err)=>{
        res.redirect("/");
    });
});


// App listening
app.listen(PORT, ()=>{
    console.log("server is running...");
})