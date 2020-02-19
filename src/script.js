function myFunc(){
  let str = document.getElementById('spisok').value;
  
  let arr = str.split('\n'); /* разделяем строку построчно, как бы это ни звучало */
  let list=[];
  for (let i = 0; i < arr.length; i++) { 
    let currentText = arr[i].substring(1) , /* полученная с помощью substring подстрока с текстом */
      currentMarker = arr[i].substring(0,1); /* полученная с помощью substring подстрока с маркером */
      if (currentMarker=='' || currentMarker==' ') {continue} /* убираем пустые строки */
    switch(currentMarker) {
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
    var newElem = document.createElement('p'); /* создаем абзац */
    newElem.className = list[i].type; /* присваиваем абзацу тип */
    let text = document.createTextNode(list[i].text); /* это я сам не понял зачем) объяснишь? */
    newElem.appendChild(text);/* в абзац добавляем текст, взятый из массива */
    document.body.appendChild(newElem); /* добавляем абзац в body */
  }
  document.getElementById('spisok').value ='';
  }