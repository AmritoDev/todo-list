//variables
const todoInput = document.querySelector(".todo-input");
const todoAdd = document.querySelector(".todo-add");
const warningText = document.querySelector(".warning-text");
const todoList = document.querySelector(".todo-list");
const todoFilter = document.querySelector(".todo-filter");

//event listener
document.addEventListener("DOMContentLoaded", getTodo);
todoAdd.addEventListener("click", getInput);
todoList.addEventListener("click", deleteTodo);
todoFilter.addEventListener("click", doFilter);
//function
function getInput(e) {
  e.preventDefault();
  if (todoInput.value === "") {
    warningText.style.visibility = "visible";
  } else {
    warningText.style.visibility = "hidden";
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");
    const todoText = document.createElement("span");
    todoText.classList.add("todo-text");
    todoText.innerText = todoInput.value;
    todoItem.appendChild(todoText);
    saveLocal(todoInput.value);
    const todoCompleted = document.createElement("div");
    todoCompleted.classList.add("todo-completed");
    const iconCompleted = document.createElement("i");
    iconCompleted.classList.add("fa-solid");
    iconCompleted.classList.add("fa-check");
    todoCompleted.appendChild(iconCompleted);
    todoItem.appendChild(todoCompleted);
    const todoDelete = document.createElement("div");
    todoDelete.classList.add("todo-delete");
    const iconDelete = document.createElement("i");
    iconDelete.classList.add("fa-solid");
    iconDelete.classList.add("fa-trash");
    todoDelete.appendChild(iconDelete);
    todoItem.appendChild(todoDelete);
    todoList.appendChild(todoItem);
    todoInput.value = "";
  }
}
//delete and completed
function deleteTodo(e) {
  const item = e.target;
  if (item.classList[0] === "todo-delete") {
    removeLocal(item.parentElement);
    item.parentElement.remove();
  }
  if (item.classList[0] === "todo-completed") {
    item.parentElement.children[0].classList.add("completed");
  }
}

//filter todos

function doFilter(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todoItem) {
    switch (e.target.value) {
      case "all":
        todoItem.style.display = "flex";
        break;
      case "completed":
        if (todoItem.children[0].classList.contains("completed")) {
          todoItem.style.display = "flex";
        } else {
          todoItem.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todoItem.children[0].classList.contains("completed")) {
          todoItem.style.display = "flex";
        } else {
          todoItem.style.display = "none";
        }
        break;
    }
  });
}

function saveLocal(todo) {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodo() {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");
    const todoText = document.createElement("span");
    todoText.classList.add("todo-text");
    todoText.innerText = todo;
    todoItem.appendChild(todoText);
    const todoCompleted = document.createElement("div");
    todoCompleted.classList.add("todo-completed");
    const iconCompleted = document.createElement("i");
    iconCompleted.classList.add("fa-solid");
    iconCompleted.classList.add("fa-check");
    todoCompleted.appendChild(iconCompleted);
    todoItem.appendChild(todoCompleted);
    const todoDelete = document.createElement("div");
    todoDelete.classList.add("todo-delete");
    const iconDelete = document.createElement("i");
    iconDelete.classList.add("fa-solid");
    iconDelete.classList.add("fa-trash");
    todoDelete.appendChild(iconDelete);
    todoItem.appendChild(todoDelete);
    todoList.appendChild(todoItem);
  });
}

function removeLocal(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const indexOf = todo.children[0].innerText;
  todos.splice(todos.indexOf(indexOf), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
