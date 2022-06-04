import 'lodash';
import './style.css';
import removeTodo from './ui.js';
import Swal from 'sweetalert2/src/sweetalert2.js';

// list class

// variables
const checked = 'fa-check-square';
const unchecked = 'fa-square-o';
const lineThrough = 'text-decoration-line-through';
const list = document.querySelector('#list-items');
let id;
let LIST = JSON.parse(localStorage.getItem('TODO')) || [];

class TodoList {
  // add todo list
  static addToDoList(todo, completed, id) {
    const done = completed ? checked : unchecked;
    const line = completed ? lineThrough : '';
    const item = `
    <li class=" icon-check card-header d-flex justify-content-between" id="${id}">
        <div class="text1">
          <i class="complete fa ${done} " id="${id}" aria-hidden="true"></i>
          <p class="text ${line}" ${
  !todo.completed ? 'contenteditable' : ''
}>${todo}</p>
        </div>
        <i class="delete fa-solid fa-ellipsis-vertical" id="${id}"></i>
      </li>
    `;
    const position = 'beforeend';

    list.insertAdjacentHTML(position, item);
  }
}

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
      TodoList.addToDoList(todo, false, id);
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

// completetodo
const completeTodo = (element) => {
  element.classList.toggle(checked);
  element.classList.toggle(unchecked);
  element.parentNode.querySelector('.text').classList.toggle(lineThrough);
  if (element.classList.contains('fa-check-square')) {
    LIST[element.id - 1].completed = true;
  } else if (element.classList.contains('fa-square-o')) {
    LIST[element.id - 1].completed = false;
  }
};

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

// get data fro localhost

// function to loadlist
const loadList = (array) => {
  array.forEach((item) => {
    TodoList.addToDoList(item.name, item.completed, item.id);
  });
  localStorage.setItem('TODO', JSON.stringify(LIST));
};

const data = JSON.parse(localStorage.getItem('TODO'));
if (data) {
  LIST = data;
  loadList(LIST);
} else {
  LIST = [];
  id = 0;
}

removeTodo();

document.querySelector('.fa-arrows-rotate').addEventListener('click', () => {
  window.location.reload();
});

const clearChecked = () => {
  const clearBtn = document.querySelector('.clear-all');
  clearBtn.addEventListener('click', () => {
    LIST = LIST.filter((todo) => todo.completed !== true);
    LIST = LIST.map((todo, index) => {
      todo.id = index + 1;
      return todo;
    });
    localStorage.setItem('TODO', JSON.stringify(LIST));
    window.location.reload();
    Swal.fire(
      'Good job!',
      'Items Deleted Successfully!',
      'success'
    )
  });
};

clearChecked();