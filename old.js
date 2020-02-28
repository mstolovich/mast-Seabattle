const warShips = [
    Battleship = {
        id: 'BS',
        length: 4,
        sunk: false
    },
    Cruiser = {
        id: 'CR',
        length: 3,
        sunk: false
    },
    Destroyer = {
        id: 'DS',
        length: 2,
        sunk: false
    },
    PatrolBoat = {
        id: 'PB',
        length: 1,
        sunk: false
    }]; 
 
 class  BattleField{
    constructor(width, height, addCell = (x, y) => undefined) {
        this.width = width;
        this.height = height;
        this.content = [];
 
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++){
                this.content[y * width + x] = addCell(x,y);
            }
        }
    }
 
    get(x, y){
        return this.content[y * this.width + x];
    }
    set(x, y, value){
        this.content[y * this.width + x] = value;
    }
    
    [Symbol.iterator]() {
        return new BattleFieldIterator(this);
    }
 }
 
 class BattleFieldIterator{
    constructor(battlefield){
        this.x = 0;
        this.y = 0;
        this.battlefield = battlefield;
    }
 
    next(){
        if (this.y === this.battlefield.height) return {done: true};
 
        let value = {
            x: this.x,
            y: this.y,
            value: this.battlefield.get(this.x, this.y)
        };
        this.x++;
        if (this.x === this.battlefield.width) {
            this.x = 0;
            this.y++;
        }
        return {value, done: false};
    }
 }
 
 function createSeaBattle(width, height) {
    let battleField = new BattleField(width, height, (x, y) => ({ occupied: false, xPos: x, yPos: y}));
    let placeShip, makeTurn, addCell;
   
    placeShip = function (ship){
            //choose direction randomly and start to check fields
        let randomDirection = function () { return Math.floor(Math.random() * 2) + 1 < 2 ? 'width' : 'length'; };
        let randomCell = function() {
            let x = Math.floor(Math.random() * width);
            let y = Math.floor(Math.random() * height);
            return battleField.get(x, y);
        }
        let checkPosition = function () {
            let direction = randomDirection();
            let cell = randomCell();
            let cells = []; 
            let checkNeighbours = function(x, y){
                for (let i = x - 1; i <= x + 1; x++){
                    for (let j = x - 1; j <= x + 1; j++){
                        if (battleField.get(i, j).occupied === true) return -1;
                    }
                }
                return 1;  
            }
        
            let shipCells = [];
            if (direction === 'width'){
                let shipEndCell = randomCell.x + ship.length - 1;
                for (let x = randomCell.x; x < randomCell.x + ship.length; x++){
                    if (x < shipEndCell && x >= battleField.width) return;
                    else{
                        let currentCell = { xPos: x, yPos: randomCell.y };
                        shipCells.push(checkNeighbours(x, randomCell.y));
                    } 
                }
                if(!shipCells.some(i => i === -1)){
                    for (cell
                }
            else {
                
            }
            }
            //if (i !== ship.length - 1 && cell.x === battleField[direction] - 1){
                console.log('End of the field. Try a new cell.'); 
            }
            // CHECKING ADJASENT SURROUNDING CELLS if occupied
            else if ()
             
            }
        }
        for (cell in shipcells) {cell.occupied = true} 
    }
    
 };
 
 createSeaBattle();
 
 
    
 
    /*
    shipPositioning = function (ships){
        for (let ship of arguments) {
            for (let i = 0; i < ship.value, i++;) {
 
            }
        }
    } 
    
 
 }
 
 addCell = function (xCoordinate, yCoordinate){
        battleField.push( {
            occupied: undefined,
            coordinate: {
                x: xCoordinate,
                y: yCoordinate    
            }
        })  
    }
 
    fieldMake = function (xLength, yLength) {
        for (let i = 0; i < xLength; i++){
            for (let j = 0; j < yLength; j++){
                addCell(i, j);                
            }
        }  
    }
 
 
 
 
 {
     occupied: undefined,
     coordinate: {
         x: xCoordinate,
         y: yCoordinate    
     }
 
 
 
 
 
 Привет 

 На клиенте нужно:
1) Показывать всю историю действий пользователя
2) Показывать текущее состояние игрового поля (опционально)
3) Иметь возможность каким-то образом ввести координаты и сделать выстрел
4) Иметь возможность начать заново игру
5) Показывать ошибки, например если пользователь повторно стреляют в ту же ячейку (alert-a достаточно)
(если дизайн предусматривает возможность появлиения такой ошибки)На сервере нужно:
1) Хранить всю историю действий пользователя в базе данных
2) Реализовать REST API для игры
 - GET /seabattle возвращает историю всех действий пользователя
 - PUT /seabattle "выстрел" в теле запроса передаются координаты x, y
 - DELETE /seabattle начать новую игруДейтвия:
 - Новая игра
 - Выстрел и результат (мимо, ранил, убил, ошибка)
 - Игра закончена (все корабли убиты)
 - Пользователь начал новую игру
 - ОшибкаНапример, история действий может быть такой
 - New game started
 - User shot x: 0, y: 6. Result: -1
 - User shot x: 0, y: 2. Result: 1
 - User shot x: 0, y: 2. Error: Already shot
 - User requested new game
 - New game started
 - Error: Invalid request
 - Error: Unknown error
 - User shot x: 0, y: 0. Result: 1
 - User shot ...
 - Game over
 - New game started
8:08
Как это будет выглядеть в браузере, решать вам, тут всё зависит от ваших знаний
Как варианты,
 - это может быть полноценное красивое поле для морского боя, где по клику на ячейки посылается запрос и они меняют свой вид и потом становятся неактивными
 - это может быть 2 инпута для x, y координат и кнопка
 - это может быть кнопка выстрелить и prompt в который пользователь будет вводить координаты
 - это может быть что угодно, ограниченное вашей фантазиейЧто и в каком виде передавать в запросах и их ответах, вам надо придумать самостоятельно, это важно
В каком виде хранить историю в базе данных, тожеВалидация. Валидацию нужно реализовать и на клиенте и на сервере, т.е. вам надо
1) На клиенте проверять чтоб пользователь не мог ввести какие-то инвалидные значения и отправить их
2) На сервере обрабатывать уже существующие ошибки, чтоб сервер не падал, а писал в историю и что-то отвечал
(Как вариант, послать какой-то инвалидный запрос c помощью postman)
 
 
 
 давай познакомимся поближе. Мне понравились твои фото и анкета
 
 Ты интересная и привлекательная :)
 
 Какая ты в жизни? Какой у тебя характер? 
 
 
 
 &#127801;
 
 Привет)
 
 Ты довольно привлекательна)
 
 Почему знакомство онлайн? Отсеиваешь придурков?))) 
 
 Домашнее задание
 В вашем файле index.js удалить что было и
 Написать функцию которая вернет игру в "Морской Бой"
 Чье второе задание еще не попало в мастер и находится в стадии разработки... Вам придется его таки доделать )
 Потому что, важно чтоб задание ниже было именно в файле index.js
 Ваша задача реализовать функцию createSeaBattle() которую можно использовать следующим образом
 12:53
 let seaBattle = createSeaBattle(); // Не получает аргументов, возвращает функцию
 12:55
 Использование seaBattle т.е. того что вернет написанная вами функция
    Аргумент первой функции координата на оси Х только Number
    Аргумент второй функции координата на оси Y только Number
    Вызов возрващает один из трех вариантов: "Мимо", "Ранил", "Убил"
    Для простоты тестирования и унификации пусть:
    "Mимо": -1
    "Ранил": 0,
    "Убил": 1
    Функция бросает исключение когда "корабли" закончились (Выразительный Джаваскрипт Глава 8. Ошибки и дефекты)
    Функция бросает исключение если в качестве координат ввели не число (ничего не приводим)
    Функция бросает исключение если ввели координаты больше или меньше заданого поля
    Функция бросает исключение если повторно "стреляем" по тем же координатам   Обычное задание "Речной бой":
    Размер поля 10*1 т.е.
    По оси X валидные значения 0 - 9
    По оси Y тольк 0
    Количество кораблей 1 "двухпалубный", 2 "однопалубных"   Задание со звездчокой *:
    Сделать из вашего файла index.js node-модуль который будет экспортить createSeaBattle
    Чтоб я мог написать так:
    let hw = require('homework/mkov');
    let seaBattle = hw.createSeaBattle();   Задание с двумя звездочками **:
    Сделать полноценный "Морской бой"
    По оси X валидные значения 0 - 9
    По оси Y валидные значения 0 - 9
    Количество кораблей надо загуглить я уже не помню )
 12:55
 Например
 12:55
 let seaBattle = createSeaBattle();
 seaBattle('0')('0'); // throw an exception
 seaBattle([])({});   // throw an exception
 seaBattle(42)(-19);  // throw an exception
 seaBattle(0)(0); // return  0
 seaBattle(1)(0); // return  1
 seaBattle(1)(0); // throw an exception
 seaBattle(2)(0); // return -1
 seaBattle(3)(0); // return -1
 seaBattle(4)(0); // return  1
 seaBattle(5)(0); // return -1
 seaBattle(6)(0); // return -1
 seaBattle(7)(0); // return -1
 seaBattle(8)(0); // return  1
 seaBattle(9)(0); // throw an exception 


 
 When we are building APIs, we want our models to provide four basic types of 
 functionality. The model must be able to Create, Read, Update, and Delete resources
 
 If an action cannot be described by one of these four operations, 
 then it should potentially be a model of its own.
 
 RESTful APIs, paths should be designed to help the client know what is going on. 
 Conventionally, the first part of the path should be the plural form of the resource.
 This keeps nested paths simple to read and easy to understand.
 Хорошо:
 fashionboutique.com/customers/223/orders/12
 Paths should contain the information necessary to locate a resource with the degree of specificity needed. When referring to a list or collection of resources, it is unnecessary to add an id to a POST request to a fashionboutique.com/customers path would not need an extra identifier,
  as the server will generate an id for the new object.
  Хорошо:
  GET fashionboutique.com/customers/:id
 
  The content-type that the server sends back in the response should be one of the options
   that the client specified in the accept field of the request. 
 
 GET /articles/23 HTTP/1.1
 Accept: text/html, application/xhtml
 
 HTTP/1.1 200 (OK)
 Content-Type: text/html
 
 
 GET — return 200 (OK)
 POST — return 201 (CREATED)
 PUT — return 200 (OK)
 DELETE — return 204 (NO CONTENT) If the operation fails, 
 return the most specific status code possible corresponding to the problem that was encountered.
 
 
 POST http://fashionboutique.com/customers
 Body:
 {
   “customer”: {
     “name” = “Scylla Buss”
     “email” = “scylla.buss@codecademy.org”
   }
 }
 
 Start by writing out:
 
     what kinds of requests we would want to make
     what responses the server should return
     what the content-type of each response should be
 
     {
         “user”: {
           "id": <Integer>,
           “username”: <String>,
           “password”:  <String>
         }
       }
       
       {
         “photo”: {
           "id": <Integer>,
           “venue_id”: <Integer>,
           “author_id”: <Integer>
         }
       }
       
       {
         “venue”: {
           "id": <Integer>,
           “name”: <String>,
           “address”: <String>
         }
       }
 
       GET Requests
 
 Request- GET /index.html Accept: text/html Response- 200 (OK) Content-type: text/html
 
 Request- GET /style.css Accept: text/css Response- 200 (OK) Content-type: text/css
 
 Request- GET /venues Accept:application/json Response- 200 (OK) Content-type: application/json
 
 Request- GET /venues/:id Accept: application/json Response- 200 (OK) Content-type: application/json
 
 Request- GET /venues/:id/photos/:id Accept: application/json Response- 200 (OK) Content-type: image/png
 POST Requests
 
 Request- POST /users Response- 201 (CREATED) Content-type: application/json
 
 Request- POST /venues Response- 201 (CREATED) Content-type: application/json
 
 Request- POST /venues/:id/photos Response- 201 (CREATED) Content-type: application/json
 PUT Requests
 
 Request- PUT /users/:id Response- 200 (OK)
 
 Request- PUT /venues/:id Response- 200 (OK)
 
 Request- PUT /venues/:id/photos/:id Response- 200 (OK)
 DELETE Requests
 
 Request- DELETE /venues/:id Response- 204 (NO CONTENT)
 
 Request- DELETE /venues/:id/photos/:id Response- 204 (NO CONTENT)
 
 
 
    */
 