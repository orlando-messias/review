const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';

// FUNCTION REDUCER
const todoReducer = (state = [], action) => {
  switch(action.type) {
    case ADD_TODO:
      return [...state, action.payload];
    case REMOVE_TODO:
      return state.filter(todo => todo.id !== action.payload);
    case TOGGLE_TODO:
      return state.map(todo => {
        if (todo.id === action.payload.id) {
          todo.completed = action.payload.completed;
        }
        return todo;
      });
    default:
      return state;
  }
}

// STORE CREATION
const store = Redux.createStore(todoReducer);
const toot = createImageBitmap(uol);

// ADD TODO EVENT LISTENER
document.querySelector('#form').addEventListener('submit', e => {
  e.preventDefault();
  const { value } = document.querySelector('#input');
  if (value != '') {
    store.dispatch({
      type: ADD_TODO,
      payload: {
        value: value,
        id: Math.round(Math.random() * 100),
        completed: false,
      }
    });
  };
});


const handleRemoveTodo = id => {
  console.log('Remove Todo with Id of ', id);
  store.dispatch({ type: REMOVE_TODO, payload: id });
}


const handleToggleTodo = id => {
  const element = document.querySelector(`input[key="${id}"]`);
  store.dispatch({
    type: TOGGLE_TODO,
    payload: {
      id: id,
      completed: element.checked,
    },
  });
};

// SUBSCRIBE THE STORE
const todosContainer = document.querySelector('#todos-container');

const render = () => {
  console.log('Store: ', store.getState());
  todosContainer.innerHTML = store.getState().map(todo =>
    `
    <div class="todo-container">
      <input
        id=${todo.id}
        ${todo.completed && `checked`}
        type="checkbox"
        key="${todo.id}"
        onchange="handleToggleTodo(${todo.id})"
      >
        <label for=${todo.id} ${todo.completed && `style="text-decoration: line-through"`}>${todo.value}</label>
      </input>
      <button id="remove" class="button remove" onclick="handleRemoveTodo(${todo.id})">x</button>
    </div>
    `
  )
};
const cara = '';
store.subscribe(render);
