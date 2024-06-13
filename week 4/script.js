// script.js

document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const renderTasks = () => {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = task.completed ? 'completed' : '';

            const taskText = document.createElement('span');
            taskText.textContent = task.text;

            const completeButton = document.createElement('button');
            completeButton.textContent = task.completed ? 'Uncomplete' : 'Complete';
            completeButton.className = 'complete';
            completeButton.addEventListener('click', () => {
                tasks[index].completed = !tasks[index].completed;
                saveTasks();
                renderTasks();
            });

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.className = 'edit';
            editButton.addEventListener('click', () => {
                const newTaskText = prompt('Edit task:', task.text);
                if (newTaskText) {
                    tasks[index].text = newTaskText;
                    saveTasks();
                    renderTasks();
                }
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete';
            deleteButton.addEventListener('click', () => {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });

            taskItem.appendChild(taskText);
            taskItem.appendChild(completeButton);
            taskItem.appendChild(editButton);
            taskItem.appendChild(deleteButton);
            taskList.appendChild(taskItem);
        });
    };

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            saveTasks();
            renderTasks();
            taskInput.value = '';
        }
    });

    renderTasks();
});
