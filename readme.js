const express = require('express');
const server=express();
const cors = require('cors');
server.use(cors());


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

server.put("/customers/:id", (req, res)=>{
    const id =parseInt(req.params.id);
    const {name, site}=req.body;    
    const Index=customers.findIndex(item => item.id===id);
    const status=Index>=0? 200:404

    if(Index>=0){
        customers[Index]={id, name, site};  
    }
     return res.status(status).json(customers[Index]) || {message: "Customer not found"};
})

server.delete("/customers/:id", (req, res)=>{
    const id =parseInt(req.params.id); 
    const Index=customers.findIndex(item => item.id===id);
    const status=Index>=0 ? 200:404

    if(Index>=0){
        customers.splice(Index, 1);
    }
    return res.status(status).json(Index>=0 ? {message: " Customer deleted"}: {message: "Customer not found"});
})
server.listen(3000,()=>{
    console.log(`servidor rodando na porta ${server}`);
    
})