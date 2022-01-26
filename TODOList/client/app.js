const btnAddTask = document.getElementById('btnNewTask');
btnAddTask.onclick = () => addTask();

// display task list initially
getTasks();

// get the list of tasks
function getTasks() {
    // fetch list of tasks from server
    fetch('http://localhost:3000/todos')
        .then(response => response.json())
        .then(result => displayTasks(result)); // display tasks after fetching
}

// display the tasks
function displayTasks(tasks) {
    const ulTaskList = document.getElementById('ulTaskList');

    // map task to html list item
    ulTaskList.innerHTML = tasks.map(task => {
        return `
        <li>${task.title} - ${task.priority} - 
            <button id="${task.title}" onclick="removeTask('${task.title}', '${task.priority}')">remove</button>
            <button id="${task.title}" onclick="showUpdateTask('${task.title}')">update</button>
            <div id="divUpdate${task.title}" style="display: none">
                <input type="text" id="txtUpdateTitle${task.title}"" placeholder="Enter new task title"/>
                <select id="selUpdatePriority${task.title}">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </select>
                <button id="btnSaveUpdate" onclick="saveUpdate('${task.title}')">Save</button>
                <button id="btnCancelUpdate" onclick="cancelUpdate('${task.title}')">Cancel</button>
            </div>
        </li>`
    }).join('');
}

// add new task
function addTask() {
    const txtTask = document.getElementById('txtTaskTitle');
    const selPriority = document.getElementById('selTaskPriority');

    // get task title and priority
    const taskTitle = txtTask.value;
    const taskPriority = selPriority.value;

    // post new task to server
    fetch('http://localhost:3000/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: taskTitle,
            priority: taskPriority,
        })
    }).then(response => response.json())
        .then(result => console.log(result)) // log result
        .then(() => getTasks()) // update task list after
        .then(() => txtTask.value = "") // clear text box
}

// remove a task
function removeTask(task, priority) {
    // post new task to server
    fetch('http://localhost:3000/todos/delete', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: task,
            priority: priority,
        })
    }).then(response => response.json())
        .then(result => console.log(result)) // log result
        .then(() => getTasks()) // update task list after
}

// shows the update task div
function showUpdateTask(task) {
    const divUpdate = document.getElementById(`divUpdate${task}`);

    // make update html elements visible
    divUpdate.style.display = 'block';
}

// cancel the update
function cancelUpdate(task) {
    const divUpdate = document.getElementById(`divUpdate${task}`);

    // make update html elements invisible
    divUpdate.style.display = 'none';
}

// save the updated task
function saveUpdate(task) {
    const divUpdate = document.getElementById(`divUpdate${task}`);
    const txtUpdateTitle = document.getElementById(`txtUpdateTitle${task}`);
    const selUpdatePriority = document.getElementById(`selUpdatePriority${task}`);

    // make update html elements invisible
    divUpdate.style.display = 'none';

    // get new values
    const newTitle = txtUpdateTitle.value;
    const newPriority = selUpdatePriority.value;

    // TODO: check for no text, no changes, bad inputs, ect.

    // post new task to server
    fetch('http://localhost:3000/todos/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            oldTitle: task,
            newTitle: newTitle,
            priority: newPriority,
        })
    }).then(response => response.json())
        .then(result => console.log(result)) // log result
        .then(() => getTasks()) // update task list after
}