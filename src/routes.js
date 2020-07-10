const express = require("express");
const routes = express.Router();
const teachers = require("./app/controllers/teachers");
const students = require("./app/controllers/students");

routes.get("/", (req, res) => {
	return res.redirect("/teachers");
});

routes.get("/teachers", teachers.index);
routes.get("/teachers/create", (req, res) => {
	return res.render("teachers/create.njk");
});
routes.post("/teachers", teachers.post);
routes.get("/teachers/:id", teachers.show);
routes.get("/teachers/:id/edit", teachers.edit);
routes.put("/teachers", teachers.put);
routes.delete("/teachers", teachers.delete);

routes.get("/students", students.index);
routes.get("/students/create", students.create);
routes.post("/students", students.post);
routes.get("/students/:id", students.show);
routes.get("/students/:id/edit", students.edit);
routes.put("/students", students.put);
routes.delete("/students", students.delete);

routes.use(function (req, res) {
	res.status(404).render("not-found.njk");
});

module.exports = routes;
