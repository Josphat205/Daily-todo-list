 jest.mock("./ui");
import { addToDoList, removeTodo } from "./ui";
describe("add and delete", () => {
  test("add item", () => {
    //arrange
    const arr = [];
    const obj = {
      name: "josphat",
      completed: false,
      index: 1,
    };
    //act
    //add 1 item
    const res = addToDoList(arr, obj);
    //add item 2
    addToDoList(arr, obj);
    //assert
    //check the length of array
    expect(res).toHaveLength(2);
  });

});
