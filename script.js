// Load tasks from localStorage
const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
tasks.forEach(task => {
  const li = createTaskElement(task.task, task.completed);
  taskList.appendChild(li);
});

//Make it so that the user can click enter to add a task
document.getElementById('taskInput').addEventListener('keydown', function(event) {
  if (event.keyCode === 13) {
    addTask();
  }
});

//Event listeners these buttons call the addTask() and clearAll() functions
document.getElementById('addTask').addEventListener('click', addTask);

document.getElementById('clearAll').addEventListener('click', clearAll);

//Creates a new list item element for a task and adds the checkbox, label, task text, delete button to the task
function createTaskElement(task, completed) {
  const li = document.createElement("li");
  const checkboxDiv = document.createElement("div");
  const checkbox = document.createElement("input");
  const label = document.createElement("label");
  const taskText = document.createElement("span");
  const deleteBtn = document.createElement("button");


  checkboxDiv.classList.add("checkbox");
  checkbox.type = "checkbox";
  checkbox.id = "taskCheckbox" + (taskList.children.length + 1);
  label.htmlFor = checkbox.id;
  
  taskText.classList.add("task-text");
  taskText.textContent = task;

  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener('click', function() {
    taskList.removeChild(li);
    updateLocalStorage();
  });

  checkboxDiv.appendChild(checkbox);
  checkboxDiv.appendChild(label);

  li.appendChild(checkboxDiv);
  li.appendChild(taskText);
  li.appendChild(deleteBtn);

  if (completed) {
    checkbox.checked = true;
    li.classList.add('completed');
  }

  checkbox.addEventListener('change', function() {
    if (this.checked) {
      li.classList.add('completed');
    } else {
      li.classList.remove('completed');
    }
    updateLocalStorage();
  });

  return li;
}

//Add a new task to the list
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  //Checks if the input is empty
  if (taskInput.value.trim() === "") {
    alert("Please enter a task.");
    return;
  }

  //Creates a new task element
  const li = createTaskElement(taskInput.value);
  taskList.appendChild(li);

  taskInput.value = "";

  updateLocalStorage();
}

//Clears all tasks from the task list and removes the task list data from local storage
function clearAll() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  localStorage.removeItem('tasks');
}

//creates an array of task objects. It then saves the array to local storage as a JSON string.
function updateLocalStorage() {
  const tasks = [];
  const taskElements = document.querySelectorAll('#taskList li');
  taskElements.forEach(taskElement => {
    const taskText = taskElement.querySelector('.task-text').textContent;
    const completed = taskElement.classList.contains('completed');
    tasks.push({ task: taskText, completed: completed });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Create task elements from localStorage. 
//Checks if there are any tasks in local storage and creates a list item element for each task using the createTaskElement() function
if (tasks.length > 0) {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const li = createTaskElement(task.task, task.completed);
    taskList.appendChild(li);
  });
}
