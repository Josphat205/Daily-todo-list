export const addToDoList = (arr, obj) => {
  arr.push(obj);
  return arr;
};
export const removeTodo = (index, arr) => {
  arr.splice(index, 1);
  return arr;
};
