"use strict";

class TaskManager {
  constructor() {
    this.notCompletedList = document.querySelector(".notCompleted");
    this.completedList = document.querySelector(".Completed");
    this.input = document.querySelector("input");
    this.btnAdd = document.querySelector(".addTask > button");

    this.btnAdd.addEventListener("click", this.addList.bind(this));
    this.input.addEventListener("keyup", (e) => {
      if (e.keyCode === 13) {
        this.addList(e);
      }
    });
  }

  addList() {
    const newTask = new Task(this.input.value, this);
    if (this.input.value !== "") {
      this.input.value = "";
      this.notCompletedList.appendChild(newTask.render());
    }
  }

  moveTaskToCompleted(task) {
    this.completedList.appendChild(task);
  }
}

class Task {
  constructor(text, manager) {
    this.text = text;
    this.manager = manager;

    this.element = document.createElement("li");
    this.checkBtn = document.createElement("button");
    this.delBtn = document.createElement("button");

    this.checkBtn.innerHTML = '<i class="fa-solid fa-circle-plus"></i>';
    this.delBtn.innerHTML = '<i class="fa-solid fa-circle-minus"></i>';

    this.checkBtn.addEventListener("click", this.completeTask.bind(this));
    this.delBtn.addEventListener("click", this.deleteTask.bind(this));
  }

  render() {
    this.element.textContent = this.text;
    this.element.appendChild(this.checkBtn);
    this.element.appendChild(this.delBtn);
    return this.element;
  }

  completeTask() {
    this.element.remove();
    this.manager.moveTaskToCompleted(this.render());
    this.checkBtn.style.display = "none";
  }

  deleteTask() {
    this.element.remove();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const taskManager = new TaskManager();
});
