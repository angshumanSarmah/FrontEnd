const searchInput = document.getElementById('search-input');
const listItem = document.getElementById('list-holder');

searchInput.addEventListener('keyup', (event)=> { 
    let itemsToShow = ''
    const userEnteredValue = event.target.value.toLocaleLowerCase();
    if(userEnteredValue) {
        const filteredData = availableList.filter(item=> item.toLowerCase().startsWith(userEnteredValue));
        if(!filteredData.length) {
            itemsToShow += `<li> ${userEnteredValue} </li>`;
        } else {
            filteredData.map(data => itemsToShow += `<li> ${data} </li>`);
        }
        listItem.classList.add('active')
    } else {
        itemsToShow = ''
        listItem.classList.remove('active')
    }
    listItem.innerHTML = itemsToShow;
})

const availableList = [
    "How to login to reddit",
    "How to cook",
    "How to holiday in Goa",
    "How to login to fiver",
]