document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const counter = document.querySelector('.counter');
  let width = 10;
  let bombAmount = 10;
  let squares = [];
  let gameOver = false;
  let isLeftEdge = (i)  => i % width === 0;
  let isRightEdge = (i)  => (i + 1) % width === 0;
  let isTopEdge = (i)  => i < width;
  let isBottonEdge = (i)  => i < (width * width) && i >= (width * width - width);
  let bombs = bombAmount;
  let flags = bombAmount;

function createBoard() {

  counter.innerHTML = flags;
  const bombArray = Array(bombAmount).fill('bomb');
  const validArray = Array(width * width - bombAmount).fill('valid');
  const gameArray = bombArray.concat(validArray).sort(x => Math.random() - 0.5);

  for (let i = 0; i < width * width; i++) {
    const square = document.createElement('div');      
    square.classList.add("unchecked");
    square.addEventListener("click", () => click(square));
    
    square.oncontextmenu = function(e){
    e.preventDefault();
     flag(square);
    }

    square.setAttribute('id', i);
    square.classList.add(gameArray[i]);
    grid.appendChild(square);
    squares.push(square);
  }

  for (let i = 0; i < squares.length; i++) {

    /*const isLeftEdge = i % width === 0;
    const isRightEdge = (i + 1) % width === 0;
    const isTopEdge = i < width;
    const isBottonEdge = i < (width * width) && i >= (width * width - width);*/

    let bombCount = 0;

    if (gameArray[i] != 'bomb') {
      if (isLeftEdge(i)) {
        if (squares[i + 1].classList.contains('bomb'))
          bombCount++;

        if (!isTopEdge(i) && squares[i - width].classList.contains('bomb'))
          bombCount++;

        if (!isTopEdge(i) && squares[i - width + 1].classList.contains('bomb'))
          bombCount++;


        if (!isBottonEdge(i) && squares[i + width].classList.contains('bomb'))
          bombCount++;

        if (!isBottonEdge(i) && squares[i + width + 1].classList.contains('bomb'))
          bombCount++;
      }

      if (isRightEdge(i)) {
        if (squares[i - 1].classList.contains('bomb'))
          bombCount++;

        if (!isTopEdge(i) && squares[i - width].classList.contains('bomb'))
          bombCount++;

        if (!isTopEdge(i) && squares[i - width - 1].classList.contains('bomb'))
          bombCount++;

        if (!isBottonEdge(i) && squares[i + width].classList.contains('bomb'))
          bombCount++;

        if (!isBottonEdge(i) && squares[i + width - 1].classList.contains('bomb'))
          bombCount++;
      }

      if (!isRightEdge(i) && !isLeftEdge(i)) {
        if (squares[i + 1].classList.contains('bomb'))
          bombCount++;
          
        if (squares[i - 1].classList.contains('bomb'))
          bombCount++;

       if (!isTopEdge(i) && squares[i - width + 1].classList.contains('bomb'))
          bombCount++;

        if (!isTopEdge(i) && squares[i - width].classList.contains('bomb'))
          bombCount++;

        if (!isTopEdge(i) && squares[i - width - 1].classList.contains('bomb'))
          bombCount++;

       if (!isBottonEdge(i) && squares[i + width + 1].classList.contains('bomb'))
          bombCount++;

        if (!isBottonEdge(i) && squares[i + width].classList.contains('bomb'))
          bombCount++;

        if (!isBottonEdge(i) && squares[i + width - 1].classList.contains('bomb'))
          bombCount++;
      }

      squares[i].setAttribute("data", bombCount);

    }
  }
}

function discover(square){
  debugger;
  console.log(square);
  let i = parseInt(square.getAttribute('id'));

  if(square.classList.contains('checked'))
  return;

  if (square.classList.contains('bomb'))
  return;

  square.classList.add('checked');
  square.classList.remove('unchecked');

  if (square.getAttribute('data') != 0) {
    square.innerHTML = square.getAttribute('data');
    return;
  }

  if(!isRightEdge(i) && !squares[i + 1].classList.contains('checked'))
  discover(squares[i + 1]);

  if(!isLeftEdge(i) && !squares[i - 1].classList.contains('checked'))
  discover(squares[i - 1]);
 
  if(!isBottonEdge(i)){

    if(!isLeftEdge(i) && !squares[i + width - 1].classList.contains('checked'))
       discover(squares[i + width - 1]);

    if(!isRightEdge(i) && !squares[i + width + 1].classList.contains('checked'))
       discover(squares[i + width + 1]);

    if(!squares[i + width].classList.contains('checked'))
    discover(squares[i + width]);
  }

  if(!isTopEdge(i)){
    if(!squares[i - width].classList.contains('checked'))
         discover(squares[i - width]);

      if(!isLeftEdge(i) &&  !squares[i - width - 1].classList.contains('checked'))
         discover(squares[i - width - 1]);

      if(!isRightEdge(i) &&  !squares[i - width + 1].classList.contains('checked'))
         discover(squares[i - width + 1]);
  }
}

function setGameOver(square){

  gameOver = true;

  squares.forEach(x => {
    if(x.classList.contains('bomb')){
      debugger;
      x.innerHTML = '💣';
    }
  });
  alert("game over");
}

function decreaseFlagCounter(){
  flags--;
  counter.innerHTML = flags;
}

function increaseFlagCounter(){
  flags++;
  counter.innerHTML = flags;
}

function flag(square){
 if(gameOver)
 return;
  
  if (!square.classList.contains('flag')) {
    if(flags == 0)
    return;

    if(square.classList.contains('bomb')){
      bombs--;
    }
  square.classList.add('flag');
 
  square.innerHTML =  ' 🚩';
  decreaseFlagCounter();

  }else{
    square.classList.remove('flag');
    square.innerHTML =  '';
    increaseFlagCounter();
    if(square.classList.contains('bomb')){
      bombs++;
    }
  }

  if(bombs == 0)
  alert("YOU WON!");
}

function click(square) {

  if(gameOver)
  return;

  if (square.classList.contains('bomb')){

    setGameOver(square);
    return;

  }else{
    discover(square);
  }
}

  createBoard();
});

