const tasks = [];
let time = 0;
let timer = null;
let timerBreak = null;
let current = null;

const bAdd = document.querySelector("#bAdd");
const itTask = document.querySelector("#itTask");
const form = document.querySelector("#form");
const taskName = document.querySelector("#time #taskName");

renderTime();
renderTasks();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (itTask.value !== "") {
    createTask(itTask.value);
    itTask.value = "";
    renderTasks();
  }
});


function createTask(value) {
  const newTask = {
    id: (Math.random() * 100).toString(36).slice(3),
    title: value,
    completed: false,
  };

  tasks.unshift(newTask);
}

function renderTasks() {
  const html = tasks.map((task) => {
    return `
            <div class = "task">
                <div class = "completed">${task.completed
        ? `<span class = "done">Done</span>`
        : `<button class = "start-button" data-id="${task.id}">Start</button>`
      }</div>
                <div class = "title">${task.title}</div>
                <!-- <button class = "delete-button"><i class="fa-solid fa-trash"></i></button> --> 
            </div>
        `;
  });

  //prueba funcion eliminar task//

  // function deleteTask(html) {
  //   html.parentNode.removeChild(html.parentNode())
  // }

  // const deleteButtons = document.querySelectorAll(".task .delete-button");


  // deleteButtons.forEach((button) => {
  //   button.addEventListener("click", (e) => {
  //     deleteTask(deleteTask)
  // });
  // })
  //fin prueba

  const tasksContainer = document.querySelector("#tasks");
  tasksContainer.innerHTML = html.join("");

  const startButtons = document.querySelectorAll(".task .start-button");

  startButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      if (!timer) {
        const id = button.getAttribute("data-id");
        startButtonHandler(id);
        button.textContent = "In progress...";
      }
    });
  });
}

function startButtonHandler(id) {
  time = 0.2 * 60;
  current = id;
  const taskIndex = tasks.findIndex((task) => task.id === id);

  taskName.textContent = tasks[taskIndex].title;
  renderTime();
  timer = setInterval(() => {
    timerHnadler(id);
  }, 1000);
}

function timerHnadler(id) {
  time--;
  renderTime();

  if (time === 0) {
    clearInterval(timer);
    markCompleted(id);
    timer = null;
    renderTasks();
    startBreak();
  }
}

function startBreak() {
  time = 0.2 * 60;
  taskName.textContent = "Break";
  renderTime();
  timerBreak = setInterval(() => {
    timerBreakHandler();
  }, 1000);
}

function timerBreakHandler() {
  time--;
  renderTime();

  if (time === 0) {
    clearInterval(timerBreak);
    current = null;
    timerBreak = null;
    taskName.textContent = "";
    renderTasks();
  }
}

function renderTime() {
  const timeDiv = document.querySelector("#time #value");
  const minutes = parseInt(time / 60);
  const seconds = parseInt(time % 60);

  timeDiv.textContent = `
        ${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""
    }${seconds}
    `;
}

function markCompleted(id) {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  tasks[taskIndex].completed = true;
}
