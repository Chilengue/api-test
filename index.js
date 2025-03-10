const express = require('express');
const server=express();
const cors = require('cors');
server.use(cors());


// server.get("", (req, res)=>{
//     const {nome, idade}=req.query;
//     return res.json({
//         title: "ola mundo",
//         message:`"ola ${nome} meu amigo tudo bem`,
//         idade: idade
//     });
// })
// server.get("/oi/:nome", (req, res)=>{
//     return res.json({
//         title: "ola mundo",
//         message:`"ola ${nome} meu amigo tudo bem`
//     });
// })

let customers=[
    {id: 1, name: "dev escola", site: "http://devsamurai.com.br"},
    {id: 2, name: "Google", site: "http://google.com"},
    {id: 3, name: "uol", site: "http://uol.com.br"}
];

server.get("/customers", (req, res)=>{
    return res.json(customers);
})

server.get("/customers/:id", (req, res)=>{
   const id=parseInt(req.params.id);
   const customer=customers.find(item => item.id===id);
   const status=customer? 200:404;

   return res.status(status).res.json(customers);
})

server.post("/customers", (req, res)=>{
    const {name, site}=req.body;
    const id =customers[customers.length -1].id+1;

    const newCustomer ={id, name, site};
    customers.push(newCustomer);

    return res.status(201).json(newCustomer)
})


server.listen(3000);