const getForm = document.querySelector("form"),
  getTodolist = document.getElementById("todolist"),
  getUl = document.querySelector(".list-group");

let getTodos = JSON.parse(localStorage.getItem("todo"));

if (getTodos) {
  getTodos.forEach((getTodo) => {
    addNew(getTodo);
  });
}

getForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addNew();
});

function addNew(todo) {
  let getTodo = getTodolist.value;

  if (todo) {
    getTodo = todo.text;
  }

  if (getTodo) {
    const newli = document.createElement("li");
    newli.appendChild(document.createTextNode(getTodo));
    newli.classList.add("list-group-item");

    if (todo && todo.done) {
      newli.classList.add("done");
    }

    newli.addEventListener("click", () => {
      newli.classList.toggle("done");
      uploadLocalStorage();
    });

    newli.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      e.target.remove();
      uploadLocalStorage();
    });

    getUl.appendChild(newli);

    uploadLocalStorage();

    getTodolist.value = "";
  }
}

function uploadLocalStorage() {
  const getListGroupItems = document.querySelectorAll(".list-group-item");
  let lis = [];

  getListGroupItems.forEach((getListGroupItem) => {
    lis.push({
      text: getListGroupItem.textContent,
      done: getListGroupItem.classList.contains("done"),
    });
  });

  localStorage.setItem("todo", JSON.stringify(lis));
}
