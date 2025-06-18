'use strict';
const {
  Model
} = require('sequelize');
const { Op } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return  await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      // FILL IN HERE
      const overdues = await this.overdue();
      //print the list with no trailling spaces
      console.log(overdues.map((item) => item.displayableString()).join("\n"));
      console.log("\n");

      console.log("Due Today");
      const dueToday = await this.dueToday();
      console.log(dueToday.map((item) => item.displayableString()).join("\n"));
      // FILL IN HERE
      console.log("\n");

      console.log("Due Later");
      // FILL IN HERE
      const dueLater = await this.dueLater();
      console.log(dueLater.map((item) => item.displayableString()).join("\n"));
    }

    static async overdue() {
      const todos = await Todo.findAll({
        where: {
          dueDate: {
            [Op.lt]: new Date()
          }
        }
      })
      return todos;
    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY
      const todos = await Todo.findAll({
        where: {
          dueDate: {
            [Op.eq]: new Date(),
          }
        }
      })
      return todos;
    }

    static async dueLater() {
      const todos = await Todo.findAll({
        where: {
          dueDate: {
            [Op.gt]: new Date()
          }
        }
      })  
      return todos;
    }

    static async markAsComplete(id) {
      // FILL IN HERE TO MARK AN ITEM AS COMPLETE
      const todo = await Todo.findByPk(id);
      todo.completed = true;
      await todo.save();
    }
    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      let date = (new Date(this.dueDate).toDateString() === (new Date().toDateString())) ? "" : this.dueDate;
      return `${this.id}. ${checkbox} ${this.title} ${date}`.trim();
    }
  }
  Todo.init({
    title: DataTypes.STRING,
    dueDate: DataTypes.DATEONLY,
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Todo',
    tableName: 'ToDos'
  });
  return Todo;
};
