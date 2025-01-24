import Sequelize from "sequelize";
const { DataTypes } = Sequelize;

const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: "./database.sqlite",
	define: {
		timestamps: false,
	},
});

const Student = sequelize.define(
	"student",
	{
		student_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [4, 20]
			}
		},
		favourite_class: {
			type: DataTypes.STRING(25),
            defaultValue: "Computer Science"
		},
		school_year: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
        has_language_examination:{
            tpye: DataTypes.TINYINT,
            defaultValue: true
        }
	},
	{
		freezeTableName: true,
	}
);

console.log(sequelize.models.students);

Student.sync()
	.then((data) => {
		console.log("Table and model synced successful");
	})
	.catch((err) => {
		console.log("Error syncing the table and model");
	});


    Student.sync({ alert: true })
	.then(() => {
		return User.bulkCreate([
      { student_id: 1, name: "Jani", favourite_class, school_year: 2, has_language_examination },
      { student_id: 2, name: "Jani", favourite_class, school_year: 2, has_language_examination },
      { student_id: 3, name: "Jani", favourite_class, school_year: 2, has_language_examination },
      { student_id: 4, name: "Jani", favourite_class, school_year: 2, has_language_examination },
      { student_id: 5, name: "Jani", favourite_class, school_year: 2, has_language_examination },
    ],
  );
	})
	.then((data) => {
		data.forEach((element) => {
      console.log(element.toJSON())
    })
	})
	.catch((err) => {
		console.log(`Error: ${err.message}`);
	});

    Student.sync({ alter: true })
	.then(() => {
		return User.findAll({
            attributes: [
                "name"
            ],
			where: {
				[Op.or]: { favourite_class, has_language_examination: true },
			},
		});
	})
	.then((data) => {
		data.forEach((element) => {
			console.log(element.toJSON());
		});
	})
	.catch((err) => {
		console.log(`Error: ${err.message}`);
	});

    Student.sync({ alter: true })
	.then(() => {
		return User.findAll({
			attributes: [
				"student_id",
				[sequelize.fn("SUM", sequelize.col("student_id")), "sum_students"],
			],
			group: "school_year",
		});
	})
	.then((data) => {
		data.forEach((element) => {
			console.log(element.toJSON());
		});
	})
	.catch((err) => {
		console.log(`Error: ${err.message}`);
	});