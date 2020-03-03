
let list=[];

function distribution(str){
  let arr = str.split('\n'); //разделяем строку построчно

  list=[];

  for (let i = 0; i < arr.length; i++) { 
    let currentText = arr[i].substring(1) , //полученная с помощью substring подстрока с текстом
      currentMarker = arr[i].substring(0,1), //полученная с помощью substring подстрока с маркером
      currentType;
      
    if (currentMarker=='') {continue} //убираем пустые строки

    switch(currentMarker) { //по маркеру присваиваем тип
        case '>':
          currentType = 'code';
          break;
        case '*':
          currentType = 'object';
          break;
        case '+':
          currentType = 'action';
          break;
        case '-':
          currentType = 'property';
          break;
        case '/':
          currentType = 'link';
          break;
        default:{
          currentType = 'smth';
          currentText = arr[i];
          currentMarker = '';
        }
    }
    
    let counter = 0;
    for (let k = 0; k < currentText.length; k++){
      if (currentText[k] != ' ') {break;}            //удаляем строки, состоящие из пробелов
      else {counter++;}
    }
    if (counter == currentText.length) {continue}

    list.push({ //вносим текст и тип текста в массив list
          text: currentText,
          type: currentType,
          marker: currentMarker
      })

  }
  return list;
}

function addTextFromTextarea(){
    let str = document.getElementById('list').value; //получаем текст из окна ввода
    addText(str);
}

export function addText(str){
  list = distribution(str); //разделяем этот текст на массив
  createDiv(list,'list'); //вставляем элементы в body
}

function createDiv(list,idnode){

  for (let i = 0; i < list.length; i++ ){ 
    
    let newElem = document.createElement('p'); // создаем абзац 
    let delButton = document.createElement('button'); //создаем кнопку для удаления
    let changeButton = document.createElement('button'); //создаем кнопку для изменения

    let rng = Math.random().toString().substr(2); //создаем случайный id и отбрасываем 0. и получается целое число

    newElem.className = list[i].type; // присваиваем абзацу тип
    newElem.innerHTML = list[i].text; //вставляем текст в newElem

    delButton.addEventListener( "click" , () => deleteElement(rng)); //по клику срабатывает функция deleteElement
    delButton.className = 'del'; //даем кнопке class del
    delButton.innerHTML = 'удалить текст'; //вставляем текст в нашу кнопку

    changeButton.addEventListener( "click" , () => changeString(rng));
    changeButton.className = 'change';
    changeButton.innerHTML = 'изменить текст';

    let newDiv = document.createElement('div'); //создаем div, в котором будет текст и кнопка, чтобы потом его удалить
    newDiv.id = rng; //выдаем айдишник диву
    newDiv.appendChild(newElem); //запихиваем в див текст
    newDiv.appendChild(delButton); //и кнопку
    newDiv.appendChild(changeButton); //и еще лодну
    newDiv.className = 'part'; 


    if (idnode == 'list') { //это будет работать, если мы вводим новые данные
      document.body.appendChild(newDiv); //див запихиваем в body
    } 

    else {
      let oldDiv = document.getElementById(idnode); //это будет работать, если мы меняем уже имеющиеся данные
      oldDiv.before(newDiv); //вставляем новый элемент перед старым
    }

  }

  document.getElementById('list').value =''; //очищаем окно ввода
  }
document.createDiv = createDiv; //это для того, чтобы функция работала на localhost и может еще где-нибудь

function deleteElement(deleteId){ //создаем функцию для удаления по кнопке
  let element = document.getElementById(deleteId); //получаем наш div по id
  element.remove(); //удаляем div
}




function changeString(changeId) {
  let chan = document.getElementById(changeId); //находим div с которым будем работать

  chnageP = chan.querySelector('p'); //находим элемент p c текстом, который надо изменить
  changeButton = chan.querySelectorAll('button')[1]; // находим кнопку изменения

  switch(chnageP.className) { //узнаем какой маркер был перед текстом раньше
    case 'code':
      currentMarker = '>';
      break;
    case 'object':
      currentMarker = '*';
      break;
    case 'action':
      currentMarker = '+';
      break;
    case 'property':
      currentMarker = '-';
      break;
    case 'link':
      currentMarker = '/';
      break;
    default:{
      currentMarker = '';
    }
}

  let newArea = document.createElement('textarea'); //создаем окно ввода
  newArea.innerHTML = currentMarker + chnageP.innerHTML; //в окно ввода вставляем маркер и текст
  newArea.className = 'changeArea'; 
  chnageP.replaceWith(newArea); //заменяем текст на окно ввода с маркером и этим текстом

  let acceptButton = document.createElement('button'); //создаем кнопку 'изменить'
  acceptButton.className = 'del';
  acceptButton.innerHTML = 'принять изменения';
  acceptButton.addEventListener( "click" , () => acceptChanges(changeId)); //onclick = функция
  changeButton.replaceWith(acceptButton); //заменям кнопку изменить на принять изменения
  
}


function acceptChanges(changeId) { 
  let chan = document.getElementById(changeId); //находим div с которым будем работать
  
  changeArea = chan.querySelector('textarea'); //находим окно ввода(изменения)
  arr = changeArea.value; //arr - текст в окне ввода
  list = distribution(arr) //разбиваем текст в окне на массив

  createDiv(list,changeId); //вставляем новые divы перед нашим дивом(чтоб они были в правильном порядке)

  chan.remove(); //удаляем наш div
}


function deleteAll(){
  let allElements = document.querySelectorAll('div.part'); //находим все div с part
  for(let i = 0;i < allElements.length; i++) //удаляем их
  allElements[i].remove();
}

document.deleteElement = deleteElement;
document.distribution = distribution;
document.acceptChanges = acceptChanges;
document.changeString = changeString;
document.createDiv = createDiv;
document.addTextFromTextarea = addTextFromTextarea;
document.deleteAll = deleteAll;