const express = require('express')
const nunjucks = require('nunjucks')
const server = express()
const videos = require("./data")

server.use(express.static("public"))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req, res){
    const about = {
        avatar_url: "https://avatars0.githubusercontent.com/u/62737540?s=460&u=09e9ee790a8aa4fddae19edd23e6c2c604390eae&v=4",
        name: "Luan Ogawa",
        role: "Estudante de Programação",
        description: "Estudante de programação, focado em desenvolvimento web, procurando sempre novas tecnologias para se aprender ❤",
        links: [
            {name: "Github", url:"https://github.com/ogawaluan"},
            {name: "Linkedin", url:"https://www.linkedin.com/in/luan-ogawa/"}
        ]
    }


    return res.render("about", {about})
})

server.get("/classes", function(req, res){
    return res.render("classes", {items: videos})
})

server.get("/video", function(req, res){
    const id = req.query.id
    
    const video = videos.find(function(video){
       return video.id == id
    })

    if (!video){
        return res.send("Video not found!")
    }

    return res.render("video", {item: video})
})

server.listen(5000, function(){
    console.log("server is running")
})