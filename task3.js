// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAl90E4wZWDSOKiBKqD0HN7zzzwL2HnmG4",
    authDomain: "rapo-cb590.firebaseapp.com",
    projectId: "rapo-cb590",
    storageBucket: "rapo-cb590.appspot.com",
    messagingSenderId: "1034346851428",
    appId: "1:1034346851428:web:966d569a5d6cd00e740371",
    measurementId: "G-YFPFH9008H"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database(app);

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('taskForm');
    const input = document.getElementById('taskInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const list = document.getElementById('taskList');
    let editItem = null;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const text = input.value.trim();
        const dueDate = dueDateInput.value;
        if (text === '' || dueDate === '') return;

        if (editItem) {
            editItem.querySelector('span.task-text').textContent = text;
            editItem.querySelector('span.due-date').textContent = dueDate;
            editItem = null;
        } else {
            addTask(text, dueDate);
        }

        input.value = '';
        dueDateInput.value = '';

        highlightNearestDueDateTask();
    });

    function addTask(text, dueDate) {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            <span class="task-text">${text}</span> 
            <span class="due-date ms-2">(${dueDate})</span>
            <div>
                <button class="btn btn-success btn-sm complete-btn">Complete</button>
                <button class="btn btn-warning btn-sm edit-btn">Edit</button>
                <button class="btn btn-danger btn-sm delete-btn">Delete</button>
            </div>
        `;

        list.appendChild(li);

        li.querySelector('.complete-btn').addEventListener('click', function () {
            li.querySelector('span.task-text').classList.toggle('completed');
        });

        li.querySelector('.edit-btn').addEventListener('click', function () {
            input.value = li.querySelector('span.task-text').textContent;
            dueDateInput.value = li.querySelector('span.due-date').textContent.replace(/[()]/g, '');
            editItem = li;
        });

        li.querySelector('.delete-btn').addEventListener('click', function () {
            list.removeChild(li);
            highlightNearestDueDateTask();
        });

        const newTaskRef = database.ref('tasks').push();
        newTaskRef.set({
            text: text,
            dueDate: dueDate
        });

        highlightNearestDueDateTask();
    }

    function highlightNearestDueDateTask() {
        const tasks = list.querySelectorAll('li');
        const currentDate = new Date();
        let nearestTask = null;
        let nearestDateDiff = Infinity;

        tasks.forEach(task => {
            const dueDateStr = task.querySelector('span.due-date').textContent.replace(/[()]/g, '');
            const dueDate = new Date(dueDateStr);
            const timeDiff = dueDate.getTime() - currentDate.getTime();
            const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

            task.classList.remove('nearest-task');

            if (dayDiff >= 0 && dayDiff < nearestDateDiff) {
                nearestTask = task;
                nearestDateDiff = dayDiff;
            }
        });

        if (nearestTask) {
            nearestTask.classList.add('nearest-task');
        }
    }
});
