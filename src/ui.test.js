import { addToDoList, removeTodo } from './ui';

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
});
