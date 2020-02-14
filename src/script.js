let str = 
`


ssh-keygen

# git


* папка .ssh
- открытый и закрытый RSA ключи

* .ssh/known_hosts
* .ssh/config

* папка .git
* файл .gitignore

> git init
> git config user.name
> git config user.email

> git remote

+ добавить удаленного репозитория
- возможно создать несколько удаленных репозиториев
- возможно создать несколько учеток пользователей

* HEAD

> git log

> git commit
> git commit --amend

> git status
+ просмотреть изменения

* разница между

> git branch
> git checkout


* github.com
+ регистрация
+ добавить ssh-ключа
+ склонировать репозиторий из github

## 
git merge
git 


## Совместная работа
- форкнуть (fork) репозиторий из github
- сделать pull-request

- вернуться ну нужный коммит
- переключить ветку


====

##
git diff
git stash
git apply

git `
let arr = str.split('\n'); /* разделяем строку построчно, как бы это ни звучало */
let list=[];
for (let i = 0; i < arr.length; i++) { 
  let currentText = arr[i].substring(1) , /* полученная с помощью substring подстрока с текстом */
    currentMarker = arr[i].substring(0,1); /* полученная с помощью substring подстрока с маркером */
    if (currentMarker=='' || currentMarker==' ') {continue} /* убираем пустые строки */
  let currentType = (currentMarker=='>') ? 'code' : /* распределяем элементы массива по типам. Например, * - объект и т.д.*/
    (currentMarker=='*') ? 'object' : 
    (currentMarker=='+') ? 'action' :
    (currentMarker=='-') ? 'property' : /* эта функция - аналог функции if, насколько я понял. Надеюсь, так можно было */
    (currentMarker=='/') ? 'link' :
    'smth';
  if (currentType=='smth') { /* это я добавил, чтоб не вырезались первые буквы у строчек, которые не начинаются с символов + - * и т.д. */
    currentText = arr[i];
  }
  list.push({ /* вносим текст и тип текста в массив list */
        text: currentText,
        type: currentType
    })
}
for (let i = 0; i < list.length; i++ ){
  var newElem = document.createElement('p'); /* создаем абзац */
  newElem.className = list[i].type; /* присваиваем абзацу тип */
  const text = document.createTextNode(list[i].text); /* это я сам не понял зачем) объяснишь? */
  newElem.appendChild(text);/* в абзац добавляем текст, взятый из массива */
  document.body.appendChild(newElem); /* добавляем абзац в body */
}
/* Не знаю, зачем я сделал комментарии так)
Крч, это программа совсем сырая, и она без ввода данных, мне нужна помощь в этом, не бейте только
P.s. цвета в css уродские, знаю)) */