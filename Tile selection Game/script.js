const elements = document.getElementsByClassName("single-container");
const resetBoard = document.getElementById("resetBoard");

let orderOfSelectedElements = [];
resetBoard.addEventListener('click', () => {
  for (let lastSelectedElement of orderOfSelectedElements) {
    lastSelectedElement.classList.remove("clicked")
    lastSelectedElement.innerHTML = '';
  }
  orderOfSelectedElements = []
})

for (let eachBox of elements) {
  eachBox.addEventListener('click', () => {
    if (!eachBox.classList.contains('clicked')) {
      eachBox.classList.remove("un-clicked");
      eachBox.classList.add('clicked');
      eachBox.innerHTML = orderOfSelectedElements.length + 1;
      orderOfSelectedElements.push(eachBox);
      unSelectBoxes();
    }
  })
}

function unSelectBoxes() {
  if (orderOfSelectedElements.length === elements.length) {
    for (let i = elements.length - 1; i >= 0; i--) {
      setTimeout(() => {
        const lastSelectedElement = orderOfSelectedElements.shift();
        lastSelectedElement.classList.remove("clicked");
        lastSelectedElement.classList.add("un-clicked");
        lastSelectedElement.innerHTML = '';
      }, i * 300)
    }
  }
}


