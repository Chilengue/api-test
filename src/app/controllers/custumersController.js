let customers = [
    { id: 1, name: "dev escola", site: "http://devsamurai.com.br" },
    { id: 2, name: "Google", site: "http://google.com" },
    { id: 3, name: "uol", site: "http://uol.com.br" }
];

class CustomersController {
  
    constructor() {
        
    }

    index(req, res) {
        return res.json(this.customers);
    }

    show(req, res) {
        const id = parseInt(req.params.id);
        const customer = this.customers.find(item => item.id === id);
        const status = customer ? 200 : 404;

        console.debug("GET  :: /customers/:id", customer);

        return res.status(status).json(customer || { message: "Customer not found" });
    }

    create(req, res) {
        const { name, site } = req.body;
        const id = this.customers.length > 0 ? this.customers[this.customers.length - 1].id + 1 : 1;
        const newCustomer = { id, name, site };

        this.customers.push(newCustomer);

        return res.status(201).json(newCustomer);
    }

    update(req, res) {
        const id = parseInt(req.params.id);
        const { name, site } = req.body;
        const index = this.customers.findIndex(item => item.id === id);
        const status = index >= 0 ? 200 : 404;

        if (index >= 0) {
            this.customers[index] = { id, name, site };
        }

        return res.status(status).json(this.customers[index] || { message: "Customer not found" });
    }

    destroy(req, res) {
        const id = parseInt(req.params.id);
        const index = this.customers.findIndex(item => item.id === id);
        const status = index >= 0 ? 200 : 404;

        if (index >= 0) {
            this.customers.splice(index, 1);
        }

        return res.status(status).json(index >= 0 ? { message: "Customer deleted" } : { message: "Customer not found" });
    }
}

module.exports = new CustomersController();
