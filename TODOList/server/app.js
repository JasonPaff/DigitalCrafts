class Task {
    constructor(title, priority) {
        this.title = title;
        this.priority = priority;
        this.dateCreated = new Date();
    };

    update (newTitle, newPriority) {
        this.title = newTitle;
        this.priority = newPriority;
        this.dateCreated = new Date();
    }
}

const express = require('express');
const cors = require('cors');
const app = express();

let tasks = [];

let fakeTask1 = new Task("clean kitchen", "medium");
let fakeTask2 = new Task("clean bathroom", "low");
tasks.push(fakeTask1);
tasks.push(fakeTask2);

app.use(express.json());
app.use(cors());

// start server
app.listen(3000, function() {
    console.log('Server is running');
});

// return all the tasks
app.get('/todos', (request, response) => {
    response.json(tasks);
});

// add a new task - /todos/:title/:priority
app.post('/todos', (request, response) => {
    const title = request.body.title;
    const priority = request.body.priority;

    // add new task
    tasks.push(new Task(title, priority));

    // respond
    response.json({ message: 'Task added successfully' });
});

// delete a task
app.post('/todos/delete', (request, response) => {
    // get tasks index in array, returns -1 on no task found
    let index = findTaskIndex(request.body.title, request.body.priority);

    // no matching task found
    if (index === -1) {
        response.json({message: 'No matching task found'})
        return;
    }

    // remove task
    tasks.splice(index,1);

    // respond
    response.json({message: 'Task removed successfully'});
});

// update a task
app.post('/todos/update', (request, response) => {
    // get tasks index in array, returns -1 on no task found
    let index = findTaskIndex(request.body.oldTitle, request.body.priority);

    // no matching task found
    if (index === -1) {
        response.json({message: 'No matching task found'})
        return;
    }

    // update task
    tasks[index] = new Task(request.body.newTitle, request.body.priority);

    // respond
    response.json({message: 'Task updated successfully'});
});


// TODO: Match on date created and priority instead of just title
// returns the index of the task based on title and priority
// returns -1 when no task is found otherwise returns the tasks index in the tasks array
function findTaskIndex(title, priority) {
    // find the matching task
    let task = tasks.filter(task => {
        return (task.title === title);
    })

    // no matching task found
    if (!task || task.length === 0) {
        return -1;
    }

    // return tasks index in array
    return tasks.indexOf(task[0]);
}