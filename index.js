//ELEMETNS
var items = JSON.parse(localStorage.getItem('items')) || [];

const toDoList = document.querySelector('.to-do-list');
const addItems = document.querySelector('.add-items');

const clearList = document.querySelector('.clearList');

//FUNCTIONS
function addItem(e) {
    e.preventDefault();
    
    const text = (this.querySelector('input[name=item]')).value;
    const item = {
        content : text,
        done : false
    }
    
    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, toDoList);
    this.reset();
}  

function populateList(lists, toDoList) {
    if(lists.length === 0) {
        toDoList.innerHTML = '<li>Loading...</li>';
    }
    else {
        toDoList.innerHTML = lists.map((list, i) => {
            return `
            <li>
                <input type="checkbox" data-index="${i}" id="item${i}" ${list.done ? "checked" : ""} />
                <label for="item${i}">${list.content}</label>
            </li>
            `;
        }).join('');
    }
}

function clearAll() {
    items = [];
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, toDoList);
}

function toggleDone(e) {
    if(!e.target.matches('input')) return;
    
    const el = e.target;
    const index = el.dataset.index;

    items[index].done = !items[index].done;
    localStorage.setItem('items',JSON.stringify(items));
    populateList(items, toDoList);
}

//EVENT LISTENERS
addItems.addEventListener('submit',addItem);
clearList.addEventListener('click',clearAll);
toDoList.addEventListener('click',toggleDone);

populateList(items, toDoList);