interface TodoItem {
  id: number;
  task: string;
}

let todoList: TodoItem[] = [];

const taskInput = document.getElementById("taskInput") as HTMLInputElement;
const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
const todoListElement = document.getElementById("todoList") as HTMLUListElement;

function renderTodos(): void {
  todoListElement.innerHTML = "";
  todoList.forEach((todo) => {
    const li = document.createElement("li");

    const taskSpan = document.createElement("span");
    taskSpan.textContent = todo.task;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.onclick = () => editTodo(todo.id, taskSpan);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => removeTodo(todo.id);

    li.appendChild(taskSpan);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    todoListElement.appendChild(li);
  });
}

function addTodo(task: string): void {
  if (task.trim() === "") {
    alert("Field empty! Please fill in a task.");
    return;
  }

  const newTodo: TodoItem = {
    id: Date.now(),
    task,
  };
  todoList.push(newTodo);
  taskInput.value = "";
  renderTodos();
}


function removeTodo(id: number): void {
  todoList = todoList.filter((todo) => todo.id !== id);
  renderTodos();
}

function editTodo(id: number, taskSpan: HTMLElement): void {
  const todo = todoList.find((t) => t.id === id);
  if (!todo) return;

  const input = document.createElement("input");
  input.type = "text";
  input.value = todo.task;

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  saveBtn.onclick = () => {
    const newTask = input.value.trim();
    if (newTask !== "") {
      todo.task = newTask;
      renderTodos();
    }
  };

  const parent = taskSpan.parentElement!;
  parent.innerHTML = ""; // Clear current content
  parent.appendChild(input);
  parent.appendChild(saveBtn);
}

addBtn.addEventListener("click", () => addTodo(taskInput.value));
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTodo(taskInput.value);
  }
});
