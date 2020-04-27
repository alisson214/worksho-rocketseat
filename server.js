

//criei o express para criar e configurar meu servidor
const express = require("express");
const server = express();

const db = require("./db")

 const ideas = [
     {
         img: "https:image.flaticon.com/icons/svg/2729/2729007.svg",
         title:"Cursos de programação",
         category:"Estudo",
         description:" Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum quam ducimus distinctio labore",
         url:"https:rocketseat.com.br"
     },
     {
         img: "https:image.flaticon.com/icons/svg/2729/2729005.svg",
         title:"Exercicios",
         category:"Saúde",
         description:" Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum quam ducimus distinctio labore",
         url:"https:rocketseat.com.br"
     },
     {
         img: "https:www.flaticon.com/premium-icon/icons/svg/2593/2593830.svg",
         title:"Meditação",
         category:"Mentalidade",
         description:" Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum quam ducimus distinctio labore",
         url:"https:rocketseat.com.br"
     },
     {
         img: "https:image.flaticon.com/icons/svg/2563/2563094.svg",
         title:"karaokê",
         category:"Diversão em Familia",
         description:" Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum quam ducimus distinctio labore",
         url:"https:rocketseat.com.br"
     },
     {
         img: "https:www.flaticon.com/premium-icon/icons/svg/2265/2265267.svg",
         title:"Piano",
         category:"Mentalidade",
         description:" Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum quam ducimus distinctio labore",
         url:"https:rocketseat.com.br"
     },
     {
         img: "https:www.flaticon.com/premium-icon/icons/svg/57/57968.svg",
         title:"karaokê",
         category:"Diversão em Familia",
         description:" Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum quam ducimus distinctio labore",
         url:"https:rocketseat.com.br"
     },
 ]


//configurar arquivos estaticos ( css,scripts, imagens)
server.use(express.static("public"))

//configuração do (npm i nunjucks)
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server, 
    noCache: true, //boolean
})

//criei uma rota /
//capturo o pedido do cliente para responder 
server.get("/", function(req, res){

    db.all(`select * FROM ideas`, function(err, rows) {
        
        if (err) return console.log(err)
    
        const reversedIdeas = [...rows].reverse()
        
        let lastIdeas = []
        for (let idea of reversedIdeas) {
          if (lastIdeas.length < 2) {
              lastIdeas.push(idea)
    
          }   
        }

        return res.render("index.html", { ideas: lastIdeas }) 
    
        })         
})

server.get("/ideias", function(req, res){

    const reversedIdeas = [...ideas].reverse()

    return res.render("ideias.html", {ideas:reversedIdeas})    
})

//liguei meu servidor na porta tal
server.listen(3333);