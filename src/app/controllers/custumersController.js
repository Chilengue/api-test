const { Op } = require("sequelize");
const { parseISO } = require("date-fns");

const Customer = require("../../model/customer");

let customers = [
    { id: 1, name: "dev escola", site: "http://devsamurai.com.br" },
    { id: 2, name: "Google", site: "http://google.com" },
    { id: 3, name: "uol", site: "http://uol.com.br" },
];

class CustomersController {
    async index(req, res) {
        // Filtro parâmetros de consulta
        const {
            name,
            email,
            status,
            createdBefore,
            createdAfter,
            updatedBefore,
            updatedAfter,
            sort
        } = req.query;

        const page = req.query.page || 1;
        const limit = req.query.limit || 25;

        let where = {};

        if (name) {
            where = {
                ...where,
                name: {
                    [Op.like]: `%${name}%`
                }
            };
        }

        if (email) {
            where = {
                ...where,
                email: {
                    [Op.like]: `%${email}%`
                }
            };
        }

        if (status) {
            where = {
                ...where,
                status: {
                    [Op.in]: status.split(",").map(item => item.toUpperCase())
                }
            };
        }

        if (createdBefore) {
            where = {
                ...where,
                createdAt: {
                    [Op.lte]: parseISO(createdBefore)
                }
            };
        }

        if (createdAfter) {
            where = {
                ...where,
                createdAt: {
                    [Op.gte]: parseISO(createdAfter)
                }
            };
        }

        const data = await Customer.findAll({
            where,
            limit: 1000,
        });

        return res.json(data);
    }

    show(req, res) {
        const id = parseInt(req.params.id, 10);
        const customer = customers.find((item) => item.id === id);
        const status = customer ? 200 : 404;

        console.debug("GET  :: /customers/:id", customer);

        return res
            .status(status)
            .json(customer || { message: "Customer not found" });
    }

    create(req, res) {
        const { name, site } = req.body;
        const id = customers.length > 0 ? customers[customers.length - 1].id + 1 : 1;
        const newCustomer = { id, name, site };

        customers.push(newCustomer);

        return res.status(201).json(newCustomer);
    }

    update(req, res) {
        const id = parseInt(req.params.id, 10);
        const { name, site } = req.body;
        const index = customers.findIndex((item) => item.id === id);
        const status = index >= 0 ? 200 : 404;

        if (index >= 0) {
            customers[index] = { id, name, site };
        }

        return res
            .status(status)
            .json(customers[index] || { message: "Customer not found" });
    }

    destroy(req, res) {
        const id = parseInt(req.params.id, 10);
        const index = customers.findIndex((item) => item.id === id);
        const status = index >= 0 ? 200 : 404;

        if (index >= 0) {
            customers.splice(index, 1);
        }

        return res
            .status(status)
            .json(
                index >= 0
                    ? { message: "Customer deleted" }
                    : { message: "Customer not found" }
            );
    }
}

module.exports = new CustomersController();
