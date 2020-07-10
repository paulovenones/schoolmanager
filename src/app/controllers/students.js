const { age, date, graduation } = require("../../lib/utils");
const Student = require("../models/Students");
module.exports = {
	index(req, res) {
		let { filter, page, limit } = req.query;

		page = page || 1;
		limit = limit || 2;
		let offset = limit * (page - 1);

		const params = {
			filter,
			page,
			limit,
			offset,
			callback(students) {
				const pagination = {
					filter,
					total: Math.ceil(students[0].total / limit),
					page,
				};
				return res.render("students/students", {
					students,
					pagination,
					filter,
				});
			},
		};
		Student.paginate(params);
	},

	show(req, res) {
		Student.find(req.params.id, function (student) {
			if (!student) return res.send("Student not found!");

			student.birth = date(student.birth).birthDay;

			return res.render("students/show", { student });
		});
	},

	create(req, res) {
		Student.teacherSelectOptions(function (options) {
			return res.render("students/create.njk", { teacherOptions: options });
		});
	},

	post(req, res) {
		const keys = Object.keys(req.body);

		for (key of keys) {
			if (req.body[key] == "") {
				return res.send("Please fill all the fields!");
			}
		}

		Student.create(req.body, function (student) {
			return res.redirect(`/students/${student.id}`);
		});
	},

	edit(req, res) {
		Student.find(req.params.id, function (student) {
			if (!student) return res.send("Student not found!");

			student.birth = date(student.birth).iso;

			Student.teacherSelectOptions(function (options) {
				return res.render("students/edit", {
					student,
					teacherOptions: options,
				});
			});
		});
	},

	put(req, res) {
		Student.update(req.body, function () {
			return res.redirect(`/students/${req.body.id}`);
		});
	},

	delete(req, res) {
		Student.delete(req.body.id, function () {
			return res.redirect("/students");
		});
	},
};
