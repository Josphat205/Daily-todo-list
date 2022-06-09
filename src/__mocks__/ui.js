export const addToDoList = (arr, obj) => {
  arr.push(obj);
  return arr;
};
export const removeTodo = (index, arr) => {
  arr.splice(index, 1);
  return arr;
};

// check clear all
export const clearChecked = (arr) => {
  const oldArr = arr.filter((todo) => todo.completed !== true);
  const currentArr = oldArr.map((todo, index) => {
    todo.id = index + 1;
    return todo;
  });
  return currentArr;
};

// completed
export const completeTodo = (arr, element) => {
  if (element === 'fa-check-square') {
    arr.completed = true;
    return arr.completed;
  }
  return 'incomplete';
};

// Editing
export const updateTodo = (arr, id, el) => {
  const array = arr.find((todo) => todo.id === parseInt(id, 10));
  if (el === 'contenteditable') {
    const res = 'updated';
    return res;
  }
  return array;
};



