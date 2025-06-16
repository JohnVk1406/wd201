const todo = require("../todo");

const {all, markAsComplete, add, overdue, dueToday, dueLater} = todo();

describe("TodoList Test Suite", () => {
    beforeAll(() => {
        const formattedDate = d => {
            return d.toISOString().split("T")[0]
        }

        var dateToday = new Date()
        const today = formattedDate(dateToday)
        const yesterday = formattedDate(
        new Date(new Date().setDate(dateToday.getDate() - 1))
        )
        const tomorrow = formattedDate(
        new Date(new Date().setDate(dateToday.getDate() + 1))
        )
        add({title: "Test todo", completed: false, dueDate: today});
        add({title: "Test todo", completed: false, dueDate: yesterday });
        add({title: "Test todo", completed: false, dueDate: tomorrow});
    })
    test("Should add new todos", () => {
        const todoCount = all.length;
        add({title: "Test todo", completed: false, dueDate: new Date().toISOString()});
        expect(all.length).toBe(todoCount+1);
    })
    test("Should mark todos as complete", () => {
        expect(all[0].completed).toBe(false);
        markAsComplete(0);
        expect(all[0].completed).toBe(true);
    })
    test("Retrieving overdue", () => {
        let overdues = overdue();
        expect(new Date(overdues[0].dueDate) < new Date((new Date().toDateString()))).toBe(true);
    })
    test("Retrieving due today", () => {
        let duesToday = dueToday();
        expect((new Date(duesToday[0].dueDate)).toDateString() === (new Date()).toDateString()).toBe(true);
    })
    test("Retrieving due later", () => {
        let duesLater = dueLater();
        expect(new Date(duesLater[0].dueDate) > new Date((new Date().toDateString()))).toBe(true);
    })
})