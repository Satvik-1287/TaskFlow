//Getting all required elements
const inputField = document.querySelector(".input-field textarea"),
  todoLists = document.querySelector(".todoLists"),
  pendingNum = document.querySelector(".pending-num"),
  clearButton = document.querySelector(".clear-button");

// Load tasks from local storage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    let liTag = `<li class="list ${task.status}" onclick="handleStatus(this)">
          <input type="checkbox" ${task.status === 'completed' ? 'checked' : ''} />
          <span class="task">${task.name}</span>
          <i class="uil uil-trash" onclick="deleteTask(this)"></i>
        </li>`;
    todoLists.insertAdjacentHTML("beforeend", liTag);
  });
  allTasks();
}

// Save tasks to local storage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll(".list").forEach(task => {
    tasks.push({
      name: task.querySelector(".task").textContent,
      status: task.classList.contains("completed") ? "completed" : "pending"
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// we will call this function while adding, deleting and checking-unchecking the task
function allTasks() {
  let tasks = document.querySelectorAll(".pending");

  // if tasks' length is 0 then pending num text content will be no, if not then pending num value will be task's length
  pendingNum.textContent = tasks.length === 0 ? "no" : tasks.length;

  let allLists = document.querySelectorAll(".list");
  if (allLists.length > 0) {
    todoLists.style.marginTop = "20px";
    clearButton.style.pointerEvents = "auto";
    saveTasks(); // Save tasks to local storage
    return;
  }
  todoLists.style.marginTop = "0px";
  clearButton.style.pointerEvents = "none";
  saveTasks(); // Save tasks to local storage
}

// Add task while we put value in text area and press enter
inputField.addEventListener("keyup", (e) => {
  let inputVal = inputField.value.trim(); // trim function removes space of front and back of the input value

  // if enter button is clicked and inputted value length is greater than 0.
  if (e.key === "Enter" && inputVal.length > 0) {
    let liTag = `<li class="list pending" onclick="handleStatus(this)">
          <input type="checkbox" />
          <span class="task">${inputVal}</span>
          <i class="uil uil-trash" onclick="deleteTask(this)"></i>
        </li>`;

    todoLists.insertAdjacentHTML("beforeend", liTag); // inserting li tag inside the todo list div
    inputField.value = ""; // removing value from input field
    allTasks();
  }
});

// Checking and unchecking the checkbox while we click on the task
function handleStatus(e) {
  const checkbox = e.querySelector("input"); // getting checkbox
  checkbox.checked = checkbox.checked ? false : true;
  e.classList.toggle("pending");
  e.classList.toggle("completed");
  allTasks();
}

// Deleting task while we click on the delete icon
function deleteTask(e) {
  e.parentElement.remove(); // getting parent element and remove it
  allTasks();
}

// Deleting all the tasks while we click on the clear button
clearButton.addEventListener("click", () => {
  todoLists.innerHTML = "";
  allTasks();
});

// Load tasks on page load
window.addEventListener("load", loadTasks);
