



var boardService = {

  /*
    Returns 2-dimensional array as representaiton of board.
  */
  getNewBoard: function () {
    var twoDimBoard = new Array(7);
    for (var i = 0; i < twoDimBoard.length; i++) {
      twoDimBoard[i] = new Array(6);
    }
    return twoDimBoard;
  },


  /*
    Prints board values. Void function.
  */
  printBoard: function (board) {
    var boardString = '';
    for (var i = 0; i< board.length; i++) {
      var row = '';
      for (var j = 0; j < board[i].length; j++) {
        var currentPiece = board[i][j];
        if (currentPiece != null) {
          row = row + currentPiece;
        } else {
          row = row + '*';
          // row = row + '(' + i + ', ' + j +')';
        }
        row = row + ',';
      }
      boardString = boardString + '\n' + row;
    }
    console.log(boardString);
  },


  /*
    Prints board values. Void function.
  */
  printBoardCoords: function (board) {
    var boardString = '';
    for (var i = 0; i< board.length; i++) {
      var row = '';
      for (var j = 0; j < board[i].length; j++) {
        row = row + '(' + i + ', ' + j +')' + ',';
      }
      boardString = boardString + '\n' + row;
    }
    console.log(boardString);
  },



  isBoardFull: function(board) {
    for (var column = 0; column < 7; column++) {
      if (board[column][5] == null) {
        return false;
      }
    }
    return true;
  },

  /*
    A piece will be either 'R' or 'B'
  */
  placePiece: function (board, piece, row) {
    if (piece != 'R' && piece != 'B') {
      throw('Piece must either be R or B!');
    }

    if (row > board.length - 1) {
      throw('Invalid row position');
    }

    for (var i = 0; i < board[row].length; i++) {
      if (board[row][i] != null) {
        if (i === board[row].length -1) {
          throw('This row is full!');
        }
        continue;
      } else {
        board[row][i] = piece;
        break;
      }
    }
    boardService.printBoard(board);
    return board;
  }
};

var playerService = {
  color: null,

  getNewPlayer: function (pieceType) {
    if (pieceType != 'R' && pieceType != 'B') {
      throw('Choose either be R or B!');
    }
    color = playerService.pieceType;
    return this;
  }
};

var game = {
  players: null,

  turn: null,

  board: null,

  init: function() {
    player1 = playerService.getNewPlayer('R');
    player2 = playerService.getNewPlayer('B');
    game.players = {
      'R': player1, 
      'B': player2
    };
    game.board = boardService.getNewBoard();

    /// Who goes first will be random:
    if (Math.floor(Math.random()*100)%2 === 0) {
      game.turn = 'R';
    } else {
      game.turn = 'B';
    }
    return game;
  },

  playRandom: function() {
    boardService.placePiece(game.board, game.turn, Math.floor(Math.random()*100)%6);
    if (game.turn === 'R') {
      game.turn = 'B';
    } else {
      game.turn = 'R';
    }
  },

  simulateRandomGame: function () {
    game.init();
    var winnerFound = false;
    while(!boardService.isBoardFull(game.board) && !winnerFound) {
      try {
        game.playRandom();
      } catch (e) { }
      
      var gameOver = game.boardContainsConnectFour(game.board);
      if (gameOver) {
        winnerFound = true;
        console.log(gameOver, 'wins the game!');
        break;
      }
    }
  },

  boardContainsConnectFour: function (board) {

    var result;
    for(var i = 0; i < board.length; i++) {
      result = game.rowContainsConnectFour(board, i);
      if (result) {
        return result;
      }
    }

    var height = board[0].length;

    for (var j = 0; j < height; j++) {
      result = game.columnContainsConnectFour(board, j);
      if (result) {
        return result;
      }
    }

    /// Diagonal Down Right
    for (var rowDesc = 0; rowDesc < 6; rowDesc++) {
      result = game.diagonalDownRight(board, rowDesc, 0);
      if (result) {
        return result;
      }
    }
    for (var colDesc = 1; colDesc < 7; colDesc++) {
      result = game.diagonalDownRight(board, 5, colDesc);
      if (result) {
        return result;
      }
    }

    /// Diagonal Up Right
    for (var colAsc = 6; colAsc >= 0; colAsc--) {
      result = game.diagonalUpRight(board, 0, colAsc);
      if (result) {
        return result;
      }
    }
    for (var rowAsc = 1; rowAsc < 6; rowAsc++) {
      result = game.diagonalUpRight(board, rowAsc, 0);
      if (result) {
        return result;
      }
    }

    return false;
  },

  rowContainsConnectFour: function(board, row) {
    if (board[row] == null) {
      throw ('Checking invalid row for connect four!');
    }
    var sequence = [];
    for (var i = 0; i < board[row].length; i++) {
      var currentPiece = board[row][i];
      sequence.push(currentPiece);
    }
    return game.sequenceContainsConnectFour(sequence);
  },

  columnContainsConnectFour: function (board, column) {
    var sequence = [];
    for (var i = 0; i < board.length; i++) {
      var currentPiece = board[i][column];
      sequence.push(currentPiece);
    }
  },

  diagonalDownRight: function (board, startRowIndex, startColumnIndex) {
    var sequence = [];
    var row = startRowIndex;
    var column = startColumnIndex;

    while (row >= 0 && column < 7) {
      sequence.push(board[column][row]);
      row--;
      column++;
    }
    return game.sequenceContainsConnectFour(sequence);
  },

  diagonalUpRight: function (board, startRowIndex, startColumnIndex) {
    var sequence = [];
    var row = startRowIndex;
    var column = startColumnIndex;

    while (row < 6 && column < 7) {
      // console.log('(' + column + ',' + row + ')');
      sequence.push(board[column][row]);
      row++;
      column++;
    }
    return game.sequenceContainsConnectFour(sequence);
  },

  sequenceContainsConnectFour: function (array) {
    var streak = 0;
    var previous = null;
    for(var i = 0; i< array.length; i++) {
      if (i===0) {
        streak = 1;
        previous = array[i];
        continue;
      } else if (array[i] != null && array[i] === previous) {
        streak = streak + 1;
        if (streak === 4) {
          console.log('Connect 4 found!');
          return previous;
        }
        continue;
      } else {
        streak = 1;
        previous = array[i];
      }
    }
    return false;
  }
};