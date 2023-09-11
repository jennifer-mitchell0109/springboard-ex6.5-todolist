const form = document.querySelector('#taskform');
const taskInput = document.querySelector('input[name="newtask');
const toDoList = document.querySelector('#todolist');
let storedToDoList = JSON.parse(localStorage.getItem('storedToDos')) || [];

//  Retrieve to-dos from localStorage
for (let i = 0; i < storedToDoList.length; i++) {
    let newTask = document.createElement('li');
    newTask.innerText = storedToDoList[i].task;
    newTask.isCompleted = storedToDoList[i].isCompleted ? true: false;
    if (newTask.isCompleted) {
        newTask.style.textDecoration = 'line-through';
    }
    let deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    toDoList.append(newTask);
    newTask.append(deleteBtn);
}

// Create new to-dos when user submits form.
form.addEventListener('submit', function(e){
    e.preventDefault();
    let newTask = document.createElement('li');
    let deleteBtn = document.createElement('button');
    newTask.innerText = taskInput.value;
    deleteBtn.innerText = 'Delete';
    newTask.isCompleted = false;
    newTask.append(deleteBtn);
    toDoList.append(newTask);
    taskInput.value = '';

    // Save to localStorage
    storedToDoList.push({ task: newTask.firstChild.textContent, isCompleted: false });
    updateLocalStorage();
});

// Define function to find index of clicked item in storedToDoList.
function findIndex(clickedTask) {
    for (let i = 0; i < storedToDoList.length; i++) {
        if (storedToDoList[i].task === clickedTask.firstChild.textContent) {
            let foundIndex = [i];
            return(foundIndex);
            break;
        }
    }
};

// Handle deleted and completed to-dos. Update storedToDoList.
toDoList.addEventListener('click', function(e){
    e.preventDefault();
    let clicked = e.target;
    if (clicked.tagName === 'LI') {
        let storageIndex = findIndex(clicked);
        if(!clicked.isCompleted) {
            clicked.isCompleted = true;
            clicked.style.textDecoration = 'line-through';
            storedToDoList[storageIndex].isCompleted = true;
        } else if (clicked.isCompleted) {
        clicked.isCompleted = false;
        clicked.style.textDecoration = 'none';
        storedToDoList[storageIndex].isCompleted = false;
        }
    } else if (clicked.tagName === 'BUTTON') {
        let storageIndex = findIndex(clicked.parentElement);
        clicked.parentElement.remove();
        storedToDoList.splice(storageIndex, 1);
        
    }
    updateLocalStorage();
});

// Save list to localStorage.
function updateLocalStorage() {
    for (let i = 0; i < storedToDoList.length + 1; i++) {
        localStorage.setItem('storedToDos', JSON.stringify(storedToDoList));
        }
}
