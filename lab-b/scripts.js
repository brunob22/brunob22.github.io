class Todo {

  constructor() {
    this.tasks = [];
    this.term = "";
    this.editingIndex = null;
  }

  draw(){
    let todoList = document.getElementById("todoList");

    todoList.innerHTML = "";

    for (let i = 0; i < this.tasks.length; i++) {
      let task = this.tasks[i];
      let li = document.createElement("li");
      li.dataset.index = i;


      if (this.term.length >= 2) {
        if (!task.text.toLowerCase().includes(this.term.toLowerCase())) {
          continue;
        }
      }


      if (i === this.editingIndex) {

        li.innerHTML = '<input type="text" class="edit-text" value="' + task.text + '"> ' + '<input type="date" class="edit-date" value="' + task.date + '">';
        todoList.appendChild(li);

      }

      else
      {
        li.innerHTML = '<span class="todo-text">' + this.highlight(task.text) + '</span> ' + '<span class="todo-date">' + task.date + '</span> ' + '<button type="button">Usuń</button>';
        todoList.appendChild(li);
      }
    }
  }

  add(text,date){

    if (text.length < 3 || text.length > 255 ) {
      alert("Zakres znaków to: 3-255");
      return;
    }

    if (date !== "") {
      let today = new Date();
      let chosen = new Date(date);
      if (chosen <= today) {
        alert("Data musi być w przyszłości");
        return;
      }
    }

    this.tasks.push({ text: text, date: date });
    this.editingIndex = null;
    this.saveToStorage();
    this.draw();
  }

  remove(index) {
    this.tasks.splice(index, 1);
    this.saveToStorage();
    this.draw();
  }

  edit(index) {
    this.editingIndex = index;
    this.draw();
  }

  save(index, newText, newDate) {

    if (this.editingIndex === null) {
      return;
    }

    if (newText.length < 3 || newText.length > 255) {
      alert("Zakres znaków to: 3-255");
      return;
    }

    if (newDate !== "") {
      let today = new Date();
      let chosen = new Date(newDate);
      if (chosen <= today) {
        alert("Data musi być w przyszłości");
        return;
      }
    }

    this.tasks[index].text = newText;
    this.tasks[index].date = newDate;

    this.editingIndex = null;
    this.saveToStorage();
    this.draw();
  }

  highlight(text) {
    if (this.term.length < 2) {
      return text;
    }
    let regex = new RegExp(this.term, "gi");
    return text.replace(regex, '<mark>$&</mark>');
  }

  saveToStorage() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  loadFromStorage() {
    let saved = localStorage.getItem("tasks");
    if (saved) {
      this.tasks = JSON.parse(saved);
    }
  }




}

let todo = new Todo();
document.todo = todo;
todo.loadFromStorage();
todo.draw();

const todoInput = document.getElementById("todoInput");
const todoDate = document.getElementById("todoDate");
const todoAddButton = document.getElementById("todoAddButton");
const todoList = document.getElementById("todoList");
const todoFilter = document.getElementById("todoFilter");



todoAddButton.addEventListener("click", function () {
  todoFilter.value = "";
  todo.term = "";

  todo.add(todoInput.value, todoDate.value);
  todoInput.value = "";
  todoDate.value = "";
});

todoFilter.addEventListener("input", function () {
  todo.term = todoFilter.value;
  todo.draw();
});

todoList.addEventListener("click", function (event) {
  let li = event.target.parentElement;

  let index = parseInt(li.dataset.index);

  if (event.target.tagName === "BUTTON") {
    todo.remove(index);
    return;
  }

  if (todo.editingIndex === index) {
    return;
  }

  todo.edit(index);
  event.stopPropagation();
});


document.addEventListener("click", function (event) {

  if (todo.editingIndex === null) {
    return;
  }

  let li = document.querySelector('li[data-index="' + todo.editingIndex + '"]');

  if (li && li.contains(event.target)) {
    return;
  }

  let editText = li.querySelector(".edit-text");
  let editDate = li.querySelector(".edit-date");
  todo.save(todo.editingIndex, editText.value, editDate.value);
});
