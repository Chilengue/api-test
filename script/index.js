const express = require('express');
const server = express();
const cors = require('cors');

server.use(cors());
server.use(express.json()); // Add middleware to parse JSON bodies

let customers = [
    { id: 1, name: "dev escola", site: "http://devsamurai.com.br" },
    { id: 2, name: "Google", site: "http://google.com" },
    { id: 3, name: "uol", site: "http://uol.com.br" }
];

// Get all customers
server.get("/customers", (req, res) => {
    return res.json(customers);
});

// Get a single customer by id
server.get("/customers/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const customer = customers.find(item => item.id === id);
    const status = customer ? 200 : 404; 

    console.debug("GET  :: /custoners/:id", customer);

    return res.status(status).json(customer || { message: "Customer not found" });
});

// Add a new customer
server.post("/customers", (req, res) => {
    const { name, site } = req.body;
    const id = customers[customers.length - 1].id + 1;

    const newCustomer = { id, name, site };
    customers.push(newCustomer);

    return res.status(201).json(newCustomer);
});

// Update a customer by id
server.put("/customers/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { name, site } = req.body;
    const index = customers.findIndex(item => item.id === id);
    const status = index >= 0 ? 200 : 404;

    if (index >= 0) {
        customers[index] = { id, name, site };
    }

    return res.status(status).json(customers[index] || { message: "Customer not found" });
});

// Delete a customer by id
server.delete("/customers/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = customers.findIndex(item => item.id === id);
    const status = index >= 0 ? 200 : 404;

    if (index >= 0) {
        customers.splice(index, 1);
    }

    return res.status(status).json(index >= 0 ? { message: "Customer deleted" } : { message: "Customer not found" });
});

// Start the server
server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
