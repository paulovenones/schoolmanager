module.exports = {
	age: function (timestamp) {
		const today = new Date();
		const birthDate = new Date(timestamp);

		let age = today.getFullYear() - birthDate.getFullYear();

		let month = today.getMonth() - birthDate.getMonth();

		if (month <= 0 && today.getDate() - birthDate.getDate()) {
			age = age - 1;
		}

		return age;
	},

	// date: function(timestamp) {
	//   let date = new Date(timestamp);

	//   date = new Intl.DateTimeFormat('en-BR').format(date)

	//   return date;
	// },

	graduation: function (grade) {
		if (grade == "medio") {
			grade = "Ensino Médio Completo";
		} else if (grade == "superior") {
			grade = "Ensino Superior Completo";
		} else if (grade == "mestrado") {
			grade = "Mestrado";
		} else if (grade == "doutorado") {
			grade = "Doutorado";
		}
		return grade;
	},

	date: function (timestamp) {
		const date = new Date(timestamp);

		const year = date.getUTCFullYear();
		const month = `0${date.getUTCMonth() + 1}`.slice(-2);
		const day = `0${date.getUTCDate()}`.slice(-2);

		return {
			day,
			month,
			year,
			iso: `${year}-${month}-${day}`,
			birthDay: `${day}/${month}`,
			format: `${day}/${month}/${year}`,
		};
	},
};
