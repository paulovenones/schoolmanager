const { age, date, graduation } = require("../../lib/utils");
const Teacher = require("../models/Teachers");
module.exports = {
	index(req, res) {
		let { filter, page, limit } = req.query;
		let teachers = [];
		function fixSubjects(allTeachers) {
			for (teacher of allTeachers) {
				teacher.subjects_taught = teacher.subjects_taught.split(",");
				teachers.push(teacher);
			}
		}

		page = page || 1;
		limit = limit || 2;
		let offset = limit * (page - 1);

		const params = {
			filter,
			page,
			limit,
			offset,
			callback(dbTeachers) {
				fixSubjects(dbTeachers);
				const pagination = {
					filter,
					total: Math.ceil(dbTeachers[0].total / limit),
					page,
				};
				return res.render("teachers/teachers", {
					teachers,
					pagination,
					filter,
				});
			},
		};
		Teacher.paginate(params);
	},

	show(req, res) {
		Teacher.find(req.params.id, function (teacher) {
			if (!teacher) return res.send("Teacher not found!");

			teacher.age = age(teacher.birth_date);
			teacher.subjects_taught = teacher.subjects_taught.split(",");
			teacher.created_at = date(teacher.created_at).format;
			teacher.education_level = graduation(teacher.education_level);

			return res.render("teachers/show", { teacher });
		});
	},

	post(req, res) {
		const keys = Object.keys(req.body);

		for (key of keys) {
			if (req.body[key] == "") {
				return res.send("Please fill all the fields!");
			}
		}

		Teacher.create(req.body, function (teacher) {
			return res.redirect(`/teachers/${teacher.id}`);
		});
	},

	edit(req, res) {
		Teacher.find(req.params.id, function (teacher) {
			if (!teacher) return res.send("Teacher not found!");

			teacher.birth_date = date(teacher.birth_date).iso;

			return res.render("teachers/edit", { teacher });
		});
	},

	put(req, res) {
		Teacher.update(req.body, function () {
			return res.redirect(`/teachers/${req.body.id}`);
		});
	},

	delete(req, res) {
		Teacher.delete(req.body.id, function () {
			return res.redirect("/teachers");
		});
	},
};
