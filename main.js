const list_el = document.getElementById("list")
const create_btn_el = document.getElementById("create");

let todos = [];

create_btn_el.addEventListener('click',createNewTodo);

function createNewTodo(){
    const item = {
        id:new Date().getTime(),
        text : " ",
        complete: false
        }
        todos.unshift(item); //item to start of array

        const { item_el , input_el} = createTodoElement(item);

        list_el.prepend(item_el); // add at the beginning

        input_el.removeAttribute("disabled");
        input_el.focus();

        save()  
    }
function createTodoElement(item)
{
    const item_el = document.createElement("div");
    item_el.classList.add("item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.complete;

    if(item.complete)
    {
        item_el.classList.add("complete");

    }
    else{
                item_el.classList.remove("complete");

    }

    const  input_el = document.createElement("input");
    input_el.type = "text";
    input_el.value= item.text;

    input_el.setAttribute("disabled","");

    const action_el = document.createElement("div");

    action_el.classList.add("actions");

    const edit_btn = document.createElement("button");
    edit_btn.classList.add("material-symbols-outlined");
    edit_btn.innerText="edit";

    const rmv_btn = document.createElement("button");
    rmv_btn.classList.add("material-symbols-outlined");
    rmv_btn.innerText="delete";

    action_el.append(edit_btn);
    action_el.append(rmv_btn)

    item_el.append(checkbox);
    item_el.append(input_el);
    item_el.append(action_el);

checkbox.addEventListener("change",()=>{
    item.complete = checkbox.checked;

    if(item.complete){
        item_el.classList.add("complete");
    }
    else
    {
        item_el.classList.remove("complete");
    }
    save();
}
);
input_el.addEventListener('input',()=>{
    item.text= input_el.value;
});

input_el.addEventListener("blur",()=>{
    input_el.setAttribute("disabled","");
    save();
});

edit_btn.addEventListener('click',()=>{
    input_el.removeAttribute("disabled");
    input_el.focus();
});

rmv_btn.addEventListener('click',()=>{
    todos = todos.filter(t => t.id !=item.id);

    item_el.remove();

    save();
});

return { item_el,input_el,edit_btn,rmv_btn};
}

function displayTodos(){
    load();

    for(let i = 0;i<todos.length;i++)
    {
        const item = todos[i];


        const {item_el} = createTodoElement(item);
        list_el.append(item_el);
    }
}
displayTodos();

function save(){
    const save = JSON.stringify(todos);
    localStorage.setItem("tasks",save);
}

function load(){
    const data = localStorage.getItem("tasks");

    if(data){
        todos = JSON.parse(data);
    }
}