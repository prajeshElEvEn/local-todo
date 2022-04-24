taskTitle = document.getElementById('title')
taskDescription = document.getElementById('description')

pendingTasks = JSON.parse(localStorage.getItem('pendingTasks')) || []
completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || []

const readTask = () => {
    let tasks = JSON.parse(localStorage.getItem('pendingTasks'))
    // console.log(tasks)
    let html = ''
    tasks.forEach((task, index) => {
        html += `<div class="card">
                        <div class="card-body">
                            <h5 class="card-title" id="card-title">${task.title}</h5>
                            <p class="card-text" id="card-text">${task.description}</p>
                            <a href="#" id=${index} onclick=markAsCompleted(this.id) class="btn btn-primary">Mark as Complete</a>
                            <a href="#" id=${index} onclick=deleteTask(this.id) class="btn btn-primary">Delete</a>
                        </div>
                    </div>
                    `
    })
    document.getElementById('task-box').innerHTML = html
    if (tasks.length === 0) {
        document.getElementById('task-box').innerHTML = 'No tasks to show. Add a to-do to display here.'
    }
}

const readCompletedTask = () => {
    let tasks = JSON.parse(localStorage.getItem('completedTasks'))
    // console.log(tasks)
    let html = ''
    tasks.forEach((task, index) => {
        html += `<div class="card">
                        <div class="card-body">
                            <h5 class="card-title" id="card-title">${task.title}</h5>
                            <p class="card-text" id="card-text">${task.description}</p>
                            <a href="#" id=${index} onclick=deleteCompletedTask(this.id) class="btn btn-primary">Delete</a>
                        </div>
                    </div>
                    `
    })
    document.getElementById('complete-box').innerHTML = html
    if (tasks.length === 0) {
        document.getElementById('complete-box').innerHTML = 'No tasks completed.'
    }
}

if (pendingTasks.length > 0) {
    readTask()
}
if (completedTasks.length > 0) {
    readCompletedTask()
}

const addTask = () => {
    if (taskTitle.value !== '' && taskDescription.value !== '') {
        let task = {
            title: taskTitle.value,
            description: taskDescription.value,
        }
        // console.log(task)
        pendingTasks.push(task)
        localStorage.setItem('pendingTasks', JSON.stringify(pendingTasks))
        taskTitle.value = ''
        taskDescription.value = ''
        readTask()
    } else {
        alert('Please fill all fields')
    }
}

const deleteTask = (index) => {
    let tasks = JSON.parse(localStorage.getItem('pendingTasks'))
    tasks.splice(index, 1)
    pendingTasks = tasks
    localStorage.setItem('pendingTasks', JSON.stringify(pendingTasks))
    readTask()
}

const markAsCompleted = (index) => {
    let tasks = JSON.parse(localStorage.getItem('pendingTasks'))
    let task = tasks[index]
    completedTasks.push(task)
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks))
    tasks.splice(index, 1)
    pendingTasks = tasks
    localStorage.setItem('pendingTasks', JSON.stringify(pendingTasks))
    readTask()
    readCompletedTask()
}

const deleteCompletedTask = (index) => {
    let tasks = JSON.parse(localStorage.getItem('completedTasks'))
    tasks.splice(index, 1)
    completedTasks = tasks
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks))
    readCompletedTask()
}