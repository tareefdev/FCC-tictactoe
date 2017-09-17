$(document).ready(function() {
  var orgiBoard, huPlayer, aiPlayer;
  var explain = document.getElementById("explain");
  
  document.getElementById("xplayer").onclick = function() {
    huPlayer = "X";
    aiPlayer = "O";
    restGame();
    afterChoes()
  }
  document.getElementById("oplayer").onclick = function() {
    huPlayer = "O";
    aiPlayer = "X";
    restGame();
    afterChoes()
  }

  document.addEventListener('click', function(e) {
        e = e || window.event;
        var target = e.target || e.srcElement,
            text = target.textContent 
            if (target.className.indexOf("boxy") !== -1) {
                target.innerHTML = huPlayer;
                var x = Number(target.id);
                orgiBoard[x] = huPlayer;
                target.classList.remove("boxy");
                if(winning(orgiBoard,huPlayer)) {
                  explain.innerHTML = "You Won! HOW!!!";
                  setTimeout(restGame,2500);
                } else if (emptyIndexies(orgiBoard).length == 0 ) {
                  draw()
                } else{
                  computerTurn();
                  if(winning(orgiBoard,aiPlayer)) {
                    explain.innerHTML = "Computer Won! Back Soon!";
                    gameFinished()
                    setTimeout(restGame,2500);
                  } else if (emptyIndexies(orgiBoard).length == 0 ) {
                    draw()
                  }
                }
            }
    }, false);

    function emptyIndexies(board){
        return  board.filter(s => s != "O" && s != "X");
    }
    
    function winning(board, player){
        if (
        (board[0] == player && board[1] == player && board[2] == player) ||
        (board[3] == player && board[4] == player && board[5] == player) ||
        (board[6] == player && board[7] == player && board[8] == player) ||
        (board[0] == player && board[3] == player && board[6] == player) ||
        (board[1] == player && board[4] == player && board[7] == player) ||
        (board[2] == player && board[5] == player && board[8] == player) ||
        (board[0] == player && board[4] == player && board[8] == player) ||
        (board[2] == player && board[4] == player && board[6] == player)
        ) {
        return true;
        } else {
        return false;
        }
    }

    function minimax(newBoard, player){
      var availSpots = emptyIndexies(newBoard);
      if (winning(newBoard, huPlayer)){
        return {score:-10};
      }
      else if (winning(newBoard, aiPlayer)){
        return {score:10};
      }
      else if (availSpots.length === 0){
        return {score:0};
       }

    var moves = [];
  
    for (var i = 0; i < availSpots.length; i++){
      var move = {};
        move.index = newBoard[availSpots[i]];
  
      newBoard[availSpots[i]] = player;
  
      if (player == aiPlayer){
        var result = minimax(newBoard, huPlayer);
        move.score = result.score;
      }
      else {
        var result = minimax(newBoard, aiPlayer);
        move.score = result.score;
      }
  
      newBoard[availSpots[i]] = move.index;
  
      moves.push(move);
    }
    
    var bestMove;
    if(player === aiPlayer){
      var bestScore = -10000;
      for(var i = 0; i < moves.length; i++){
        if(moves[i].score > bestScore){
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else{
  
      var bestScore = 10000;
      for(var i = 0; i < moves.length; i++){
        if(moves[i].score < bestScore){
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }
    return moves[bestMove];
  }

  function restGame() {
    orgiBoard = [0,1,2,3,4,5,6,7,8]
    var boxes = document.getElementsByClassName("box")
    explain.innerHTML = "Starts Again"
    for (var i=0; i < boxes.length; i++) {
      boxes[i].classList.add("boxy");
      boxes[i].innerHTML = "";
 }
    if(aiPlayer == "X") {computerTurn()}
  }

  function draw() {
      explain.innerHTML = "It was a draw. Back Soon!";
      setTimeout(restGame,2500);
  }

  function afterChoes() {
    document.getElementById("xplayer").style.display = "none";
    document.getElementById("oplayer").style.display = "none";
    document.getElementById("pip").style.display = "none";
    explain.innerHTML = "Game Starts!"
  }

  function computerTurn() {
    var bestSpot = minimax(orgiBoard,aiPlayer);
    document.getElementById(bestSpot.index).innerHTML = aiPlayer;
    orgiBoard[bestSpot.index] = aiPlayer;
    document.getElementById(bestSpot.index).classList.remove("boxy");
  }

  function gameFinished() {
    var boxes = document.getElementsByClassName("box")
    for (var i=0; i < boxes.length; i++) {
      boxes[i].classList.remove("boxy");
 }
  }
  

})
