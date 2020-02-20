function myFunc(){
  let str = document.getElementById('spisok').value; //получаем текст из окна ввода
  
  let arr = str.split('\n'); /* разделяем строку построчно, как бы это ни звучало */
  let list=[];
  for (let i = 0; i < arr.length; i++) { 
    let currentText = arr[i].substring(1) , /* полученная с помощью substring подстрока с текстом */
      currentMarker = arr[i].substring(0,1); /* полученная с помощью substring подстрока с маркером */
      if (currentMarker=='' || currentMarker==' ') {continue} /* убираем пустые строки */
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
        default:
          currentType = 'smth';
    }
      currentText = arr[i];
    list.push({ /* вносим текст и тип текста в массив list */
          text: currentText,
          type: currentType
      })
  }
  for (let i = 0; i < list.length; i++ ){ 
    let rng = Math.random().toString().substr(2) //создаем случайный id и отбрасываем 0. и получается целое число
    let newElem = document.createElement('p'); /* создаем абзац */
    newElem.className = list[i].type; /* присваиваем абзацу тип */
    let newButton = document.createElement('button'); //создаем кнопку для удаления
    newButton.addEventListener( "click" , () => delEl(rng)); //по клику срабатывает функция delEl
    newButton.className = 'del'; //даем кнопке class del
    newButton.innerHTML = 'удалить текст над кнопкой'; //вставляем текст в нашу кнопку
    newElem.innerHTML = list[i].text; //вставляем текст в newElem
    let newDiv = document.createElement('div') //создаем dic, в котором будет текст и кнопка, чтобы потом его удалить
    newDiv.id = rng; //выдаем айдишник диву
    newDiv.appendChild(newElem); //запихиваем в див текст
    newDiv.appendChild(newButton); //и кнопку
    document.body.appendChild(newDiv); //див запихиваем в body
  }
  document.getElementById('spisok').value =''; //очищаем окно ввода
  }
document.myFunc = myFunc; //это для того, чтобы функция работала на localhost и может еще где-нибудь

function delEl(delId){ //создаем функцию для удаления по кнопке
  let element = document.getElementById(delId); //получаем наш div по id
  element.remove(); //удаляем div
}
document.delEl = delEl;