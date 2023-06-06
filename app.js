const getform = document.querySelector("form"),
        gettodolist = document.getElementById("todolist"),
        getul = document.querySelector(".list-group");

gettodolist.focus();

let gettodos = JSON.parse(localStorage.getItem("todos"));

if(gettodos){
    gettodos.forEach(gettodo => addnew(gettodo));
}

getform.addEventListener("submit",(e)=>{
    e.preventDefault();
    addnew();
})

function addnew(todo){
    let getval = gettodolist.value;
    if(todo){
        getval = todo.text;
    }
    if(getval){
        const newli = document.createElement("li");
        newli.appendChild(document.createTextNode(getval));
        newli.classList.add("list-group-item");
        if(todo && todo.done){
            newli.classList.add("done");
        }
        newli.addEventListener("click",function(){
            this.classList.toggle("done");
            uploadlocalstorage();
        })
        newli.addEventListener("contextmenu",(e)=>{
            e.preventDefault();
            e.target.remove();
            uploadlocalstorage();
        })
        getul.appendChild(newli);
        uploadlocalstorage();
        gettodolist.value = "";
    }
}

function uploadlocalstorage(){
    let lis = [];
    let getlis = document.querySelectorAll(".list-group-item");
    getlis.forEach(getli => {
        lis.push({
            text: getli.textContent,
            done: getli.classList.contains("done")
        });
    });
    localStorage.setItem("todos",JSON.stringify(lis));
}