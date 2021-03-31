//ELEMETNS
var items = JSON.parse(localStorage.getItem('items')) || [];

const toDoList = document.querySelector('.to-do-list');
const addItems = document.querySelector('.add-items');

const dateDisplay = document.querySelector('.date');

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
                <span class="remove" data-index="${i}">X</span>
            </li>
            `;
        }).join('');
    }
}

function toggle(e) {
    if(e.target.matches('input')) {
        const el = e.target;
        const index = el.dataset.index;
    
        items[index].done = !items[index].done;
    }
    else if(e.target.matches('span')) {
        const el = e.target;
        const index = el.dataset.index;
        
        items.splice(index,1);
    }
    else {
        return;
    }

    localStorage.setItem('items',JSON.stringify(items));
    populateList(items, toDoList);
}

function displayDate() {
    var today = new Date();
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    var day = week[today.getDay()];

    dateDisplay.innerHTML = `오늘은 <br> ${today.getMonth()+1}월 ${today.getDate()}일 ${day}요일`;
}

//EVENT LISTENERS
addItems.addEventListener('submit',addItem);
toDoList.addEventListener('click',toggle);

displayDate();
populateList(items, toDoList);