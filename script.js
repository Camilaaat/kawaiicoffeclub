const addButton = document.getElementById('addTask');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

loadTasks();

function addTask() {
    const task = taskInput.value.trim();
    if (task) {
        createTaskElement(task);
        taskInput.value = '';
        saveTasks();
    } else {
        alert('Por favor, agrega una tarea.');
    }
}

addButton.addEventListener('click', addTask);

function createTaskElement(task) {
    const listItem = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'taskCheckbox';
    checkbox.addEventListener('change', function() {
        listItem.classList.toggle('completed', checkbox.checked);
        saveTasks();
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(document.createTextNode(task));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Borrar';
    deleteButton.className = 'deleteTask';

    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);

    deleteButton.addEventListener('click', function() {
        taskList.removeChild(listItem);
        saveTasks();
    });
}

function saveTasks() {
    let tasks = [];
    taskList.querySelectorAll('li').forEach(function(item) {
        const checkbox = item.querySelector('.taskCheckbox');
        tasks.push({
            text: item.textContent.replace('Borrar', '').trim(),
            completed: checkbox.checked
        });
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(function(task) {
        createTaskElement(task.text);
        const checkbox = taskList.lastChild.querySelector('.taskCheckbox');
        checkbox.checked = task.completed;
        if (task.completed) {
            taskList.lastChild.classList.add('completed');
        }
    });
}