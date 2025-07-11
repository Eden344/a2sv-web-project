// Select DOM elements
const taskInput = document.getElementById('taskInput');
const todoList = document.getElementById('todoList');

// Add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const li = document.createElement('li');
    li.className = 'todo-item';

    // Create span for task text (editable)
    const span = document.createElement('span');
    span.textContent = taskText;

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => li.remove();

    // Create edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = () => {
        const newText = prompt('Edit task:', span.textContent);
        if (newText && newText.trim() !== '') {
            span.textContent = newText.trim();
        }
    };

    // Append elements to li
    li.appendChild(span);
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    // Add li to todoList
    todoList.appendChild(li);

    // Clear input
    taskInput.value = '';
}

// Add task on Enter key press
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});