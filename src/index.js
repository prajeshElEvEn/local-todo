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
                            <a href="#" id=${index} onclick=markAsCompleted(this.id) class="btn btn-primary"><svg width="20" height="20" fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
 <path d="m10 15.17 9.192-9.193 1.415 1.414L10 17.998l-6.364-6.364L5.05 10.22 10 15.17Z"></path>
</svg></a>
                            <a href="#" id=${index} onclick=deleteTask(this.id) class="btn btn-primary"><svg width="20" height="20" fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
 <path d="M7 4V2h10v2h5v2h-2v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6H2V4h5ZM6 6v14h12V6H6Zm3 3h2v8H9V9Zm4 0h2v8h-2V9Z"></path>
</svg></a>
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
                            <a href="#" id=${index} onclick=deleteCompletedTask(this.id) class="btn btn-primary"><svg width="20" height="20" fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
 <path d="M7 4V2h10v2h5v2h-2v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6H2V4h5ZM6 6v14h12V6H6Zm3 3h2v8H9V9Zm4 0h2v8h-2V9Z"></path>
</svg></a>
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
