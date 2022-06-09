export const checked = 'fa-check-square';
export const unchecked = 'fa-square-o';
export const lineThrough = 'text-decoration-line-through';
export const list = document.querySelector('#list-items');
let LIST = JSON.parse(localStorage.getItem('TODO')) || [];
// remove todo
export const removeTodo = () => {
  list.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-trash')) {
      const tagId = e.target.closest('li').id;
      LIST = LIST.filter((todo) => todo.id !== parseInt(tagId, 10));
      LIST = LIST.map((todo, index) => {
        todo.id = index + 1;
        return todo;
      });
      localStorage.setItem('TODO', JSON.stringify(LIST));
      window.location.reload();
    }
  });
};

// add todo list
export const addToDoList = (todo, completed, id) => {
  const done = completed ? checked : unchecked;
  const line = completed ? lineThrough : '';
  const item = `
  <li class=" icon-check card-header d-flex justify-content-between" id="${id}">
      <div class="text1">
        <i class="complete fa ${done}" id="${id}" aria-hidden="true"></i>
        <p class="text ${line}" ${!todo.completed ? 'contenteditable' : ''}>${todo}</p>
      </div>
      <i class="delete fa-solid fa-ellipsis-vertical" id="${id}"></i>
    </li>
  `;
  const position = 'beforeend';

  list.insertAdjacentHTML(position, item);
};

// load items from localhost to ui
export const loadList = (array) => {
  array.forEach((item) => {
    addToDoList(item.name, item.completed, item.id);
  });
  localStorage.setItem('TODO', JSON.stringify(LIST));
};
// clear checked function
export const clearChecked = () => {
  const clearBtn = document.querySelector('.clear-all');
  clearBtn.addEventListener('click', () => {
    LIST = LIST.filter((todo) => todo.completed !== true);
    LIST = LIST.map((todo, index) => {
      todo.id = index + 1;
      return todo;
    });
    localStorage.setItem('TODO', JSON.stringify(LIST));
    window.location.reload();
  });
};

// completetodo function
export const completeTodo = (element) => {
  element.classList.toggle(checked);
  element.classList.toggle(unchecked);
  element.parentNode.querySelector('.text').classList.toggle(lineThrough);
  if (element.classList.contains('fa-check-square')) {
    LIST[element.id - 1].completed = true;
  } else if (element.classList.contains('fa-square-o')) {
    LIST[element.id - 1].completed = false;
  }
};
