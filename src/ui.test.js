import {
  addToDoList, removeTodo, clearChecked, completeTodo, updateTodo,
} from './ui';

jest.mock('./ui');
describe('add and delete', () => {
  test('add item', () => {
    // arrange
    const arr = [];
    const obj = {
      name: 'josphat',
      completed: false,
      index: 1,
    };
    // act
    // add 1 item
    const res = addToDoList(arr, obj);
    // add item 2
    addToDoList(arr, obj);
    // assert
    // check the length of array
    expect(res).toHaveLength(2);
  });

  test('Delete item', () => {
    // arrange
    const index = 0;
    // 3 items in the array
    const arr = [
      { name: 'josphat', completed: false, index: 0 },
      { name: 'josphat1', completed: false, index: 1 },
      { name: 'josphat2', completed: false, index: 2 },
    ];
    // act
    // remove one item from the array
    const result = removeTodo(index, arr);
    // assert
    expect(result).toHaveLength(2);
  });

  test('clear all checked', () => {
    // arrange
    // assign values to array
    const arr = [
      { name: 'josphat', completed: false, id: 1 },
      { name: 'josphat1', completed: false, id: 2 },
      { name: 'josphat2', completed: true, id: 3 },
      { name: 'josphat3', completed: true, id: 4 },
    ];
    // act
    // call clearchecked function
    const res = clearChecked(arr);
    // assert
    expect(res).toHaveLength(2);
  });

  // test completed
  test('test Completed', () => {
    // arrange
    // declare a variable for the icon and object
    const element = 'fa-check-square';
    const arr = { name: 'josphat', completed: true, id: 1 };
    // act
    const result = completeTodo(arr, element);
    // assert
    expect(result).toEqual(true);
  });

  // checking editing
  test('test Updated', () => {
    // arrange
    const id = 3;
    const arr = [
      { name: 'josphat', completed: false, id: 1 },
      { name: 'josphat1', completed: false, id: 2 },
      { name: 'josphat2', completed: true, id: 3 },
      { name: 'josphat3', completed: true, id: 4 },
    ];
    const el = 'contenteditable';

    // act
    const result = updateTodo(arr, id, el);
    // assert
    expect(result).toBe('updated');
  });
});
