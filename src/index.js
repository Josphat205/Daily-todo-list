import './style.css';
import {
  completeTodo,
  clearChecked,
  addToDoList,
  list,
  loadList,
  removeTodo,
} from './ui.js';
// variables
let LIST = JSON.parse(localStorage.getItem('TODO')) || [];
let id;
const updateTodo = (todoId, el) => {
  const todo = LIST.find((todo) => todo.id === parseInt(todoId, 10));
  if (el.hasAttribute('contenteditable')) {
    todo.name = el.textContent;
  }
};
// add to list
document.addEventListener('keyup', (e) => {
  // LIST.sort((a, b) => b.id - a.id);
  if (e.keyCode === 13) {
    const description = document.querySelector('#form-input');
    const todo = description.value;
    if (todo) {
      addToDoList(todo, false, id);
      if (LIST !== ' ') {
        LIST.push({
          name: todo,
          completed: false,
          id: LIST.length + 1,
        });
      } else {
        LIST.push({
          name: todo,
          completed: false,
          id: LIST.length + 1,
        });
      }
      id += 1;
      localStorage.setItem('TODO', JSON.stringify(LIST));
      window.location.reload();
      description.value = ' ';
    } else {
      alert('Please fill the field');
    }
  }
});

list.addEventListener('input', (e) => {
  const val = e.target;
  const tagId = e.target.closest('li').id;
  updateTodo(tagId, val);
  localStorage.setItem('TODO', JSON.stringify(LIST));
});

list.addEventListener('click', (e) => {
  const element = e.target;
  if (element.classList.contains('text')) {
    const el = element.parentNode.parentNode.lastElementChild;
    if (el.classList.contains('delete')) {
      el.classList.toggle('fa-ellipsis-vertical');
      el.classList.toggle('fa-trash');
    } else {
      el.classList.remove('fa-trash');
      el.classList.add('fa-ellipsis-vertical');
    }
  }
  if (element.classList.contains('complete')) {
    completeTodo(element);
  }
  // update list in localstorage
  localStorage.setItem('TODO', JSON.stringify(LIST));
});

// function to loadlist

const data = JSON.parse(localStorage.getItem('TODO'));
if (data) {
  LIST = data;
  loadList(LIST);
} else {
  LIST = [];
  id = 0;
}
removeTodo();
clearChecked();
document.querySelector('.fa-arrows-rotate').addEventListener('click', () => {
  window.location.reload();
});
