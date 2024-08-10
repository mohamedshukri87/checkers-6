
class BoardController { 
  constructor(board) {
    this.board = board;
  }
  
  getBlackPiecesMatrix() {
    return this.board.getBlackPiecesMatrix();
   
  }
  
  
  setSelectedPiece(){
    this.board.selectedPiece = selectedPiece;
  }

  getSelectedPiece(){
    return this.board.selectedPiece;
  }

  setColourMetaData(colourMetaData){
    this.board.coloursMetaData = colourMetaData;
  }
  getColourMetaData(){
    return this.board.coloursMetaData;
  }



  getMatrix(){
    this.board.getMatrix();
  }

    
  

  getSelectedSquare(row, column){
    return document.getElementById(row, column) // might not work if no checkticks
  }
  
  // board has a player engine? no.

  checkPieceAvailability(i,j){


    if(this.board.getBlackPiecesMatrix()[i][j] === 1 || this.board.getWhitePiecesMatrix()[i][j] === 1) {
        return true
        }
      }
    
    }







 class Game {
  constructor() {
    this.board = this.initialiseGame(); 
    this.currentPlayer = 'white'; 
    this.boardController = new BoardController(this.board);
    this.gameEngine = new gameEngine(this.boardController);
    this.gameEngine.initialisePiece();

    
  }



  initialiseGame() {
    let properBoard = new Board(8, 8, this);
    properBoard.initialiseMatrix();
    properBoard.buildGrid();
    
    return properBoard;
  }



}
class Square {
  constructor(rows, columns, whitematrix, blackmatrix, squares, matrix, board) {
    this.rows = rows;
    this.columns = columns;
    this.squares = [];
    this.board = document.getElementById("board");
    this.whitematrix = whitematrix;
    this.blackmatrix = blackmatrix;
    this.matrix = matrix;
    this.boardInstance = board;

    for (let i = 0; i < rows * columns; i++) {
      this.squares.push({
        colour: this.setPieceColour(i % columns, Math.floor(i / columns)),
      });
    }
  }

  setPieceColour(x, y) {
    return ((x + y) % 2 === 0) ? "rgb(71, 52, 38)" : "rgb(178, 152, 123)";
  }

  buildCell(i, j) {
    return this.squares[i * this.columns + j].colour;
  }



}




class Board {

  constructor(rows, columns, game) {
    this.rows = rows;
    this.columns = columns;
    this.game = game;
    this.matrix = [];
    this.selectedPiece = null;
    this.currentPlayer = 'white'; 

    // Initialize matrices
    this.blackPiecesMatrix = this.addPieceToMatrix('black');
    this.whitePiecesMatrix = this.addPieceToMatrix('white');
    this.boardController = new BoardController(this);
    // this should be in the board controller class
    this.whitePiecesLeft = 12;
    this.blackPiecesLeft = 12;

  

    this.coloursMetaData = this.initialiseColoursMetaData();
    this.square = new Square(this.rows, this.columns, this.getWhitePiecesMatrix(), this.getBlackPiecesMatrix(), this.squares, this.matrix, this);
  }

  setBlackPiecesMatrix(matrix) {
    this.blackPiecesMatrix = matrix;
  }

  setWhitePiecesMatrix(matrix) {
    this.whitePiecesMatrix = matrix;
  }

  getBlackPiecesMatrix() {
    return this.blackPiecesMatrix;
  }

  getWhitePiecesMatrix() {
    return this.whitePiecesMatrix;
  }

  getWhitePiecesLeft(){
    return this.whitePiecesLeft;

  }
  
  getBlackPiecesLeft(){
    return this.blackPiecesLeft;
  }

  decrementBlackPieces() {
    this.blackPiecesLeft --;
  }

  decrementWhitePieces(){
    this.whitePiecesLeft --;
  }


 initialiseMatrix() {
    this.matrix = new Array(this.rows).fill(0).map(() => new Array(this.columns).fill(0));
    
    const blackMatrix = this.getBlackPiecesMatrix();
    const whiteMatrix = this.getWhitePiecesMatrix();
    
    if (blackMatrix && whiteMatrix) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          if (blackMatrix[i][j] === 1 || whiteMatrix[i][j] === 1) {
            this.matrix[i][j] = 1;
          }
        }
      }
    }
    
    return this.matrix;
  }

  getMatrix() {
    return (this.getBlackPiecesMatrix() | this.getWhitePiecesMatrix());
  }

  initialiseColoursMetaData() {
    const pieceColours = ["black", "white"]; // perhaps use database
    const coloursInfo = {
      black: { start: 0, oppositeEdge: this.rows-1 },
      white: { start: this.rows - 3, oppositeEdge: 0 }
    };
    
    return pieceColours.map(colour => ({
      colour,
      start: coloursInfo[colour].start,
      oppositeEdge: coloursInfo[colour].oppositeEdge
    
    
    
  }));

  
}


  addPieceToMatrix(colour) {
      

    
    
    const matrix = {
      matrix: Array(this.rows).fill(0).map(() => Array(this.columns).fill(0)),
      alternatingArray: Array.from({ length: this.columns }, (_, i) => i % 2),
      flipbits: arr => arr.map(b => (1 - b)),
    }
    
    let x; // switch 
    switch (colour) {
      case "black":
     
        x = this.initialiseColoursMetaData()[0].start;
        break;
      case "white":
        x = this.initialiseColoursMetaData()[1].start;
        matrix.alternatingArray = matrix.flipbits(matrix.alternatingArray);
        break;
      default:
        return matrix.matrix;
    }
    switch (colour) {
      case "black":
        for (let i = x; i < x + 3; i++) {
          matrix.matrix[i] = (i % 2 === 0) ? matrix.alternatingArray : matrix.flipbits(matrix.alternatingArray);
        }
        break;
      case "white":
        for (let i = x; i < x + 3; i++) {
          matrix.matrix[i] = (i % 2 === 0) ? matrix.flipbits(matrix.alternatingArray) : matrix.alternatingArray;
        }
        break;
    }

    return matrix.matrix;
  }


  setMatrix(matrix){
    this.matrix = matrix;
  }
  buildGrid() {
    this.initialiseMatrix(); // Ensure matrix is set here
  

    for (let i = 0; i < this.rows; i++) {
      this.buildBoard(i);
    }

  }

  buildBoard(i) { /// actually building the board.
    const cellContainer = document.createElement("div");
    cellContainer.className = "cellContainer";

    for (let j = 0; j < this.columns; j++) {
      

        const cell = document.createElement("div");
        cell.className = "cell";
        cell.style.backgroundColor = this.square.buildCell(i, j);
        cell.id = `${i}${j}`;
        
        cellContainer.appendChild(cell);
        this.boardController.checkPieceAvailability(i,j);
    }
    
    document.getElementById("board").appendChild(cellContainer);

    
}

          
      
  }
      




// calls piece controller 

 
class gameEngine { // a game has a game engine : determines which pieces are kings and which are not.Turn Management: Win conditions
  // initialise pieceController in this class.
  constructor(boardControllerInstance) {
    //this.boardController = new boardController(board);
    //this.selectedPiece = selectedPiec
    this.boardControllerInstance = boardControllerInstance
    this.player1 = new Player();
    this.opponent = new Opponent();
    this.playerEngine = new PlayerEngine(this);
    this.pieceColour = ["white", "black"];
    this.selectedPiece = this.boardControllerInstance.getSelectedPiece();
    this.currentPlayer = "black";

    this.whiteKings = 0;
    this.blackKings = 0;
    this.ai = new AI(this);
    this.isPlayerTurn = true;
    // ({this.selectedPieceCoordinateX, this.selectedPieceCoordinateY} = this.getCoordinates(this.selectedPiece)); fix this
  } // selectedpiece controller


  setTurn(){
    return;
  }

  getNumberOfWhitePieces(){
    return this.whitePiecesLeft
  }

  getNumberOfBlackPieces(){
    return this.blackPiecesLeft
  }

  incrementWhiteKings(){
    this.whiteKings++;
  }

  incrementBlackKings(){
    this.blackKings++;
  }

  getNumberOfWhiteKings(){
    return this.whiteKings
  }

  getNumberOfBlackKings(){
    return this.blackKings
  }
  getSelectedPiece(){
   return;
  }

  getPieceColour(){
    return this.pieceColour
  }

  checkKing(selectedPiece) {
    const board = this.boardControllerInstance.board;
    // Log the selectedPiece to see its value
    if (selectedPiece) {

      const row = selectedPiece.dataset.row;
      const col = selectedPiece.dataset.col;
      if (selectedPiece.style.backgroundColor == this.boardControllerInstance.getColourMetaData()[0].colour && row == this.boardControllerInstance.getColourMetaData()[0].oppositeEdge
    
        || selectedPiece.style.backgroundColor == this.boardControllerInstance.getColourMetaData()[1].colour && row == this.boardControllerInstance.getColourMetaData()[1].oppositeEdge){
   
          selectedPiece.remove();
          const kingPiece = new KingPiece(
            board.getWhitePiecesMatrix(),
            board.getBlackPiecesMatrix(),
            board.matrix,
            board,
            board.square,
            row, col,
            this 
          );
          const kingElement = kingPiece.constructPiece(row, col);
          const cell = document.getElementById(`${row}${col}`);
          if (cell) {
            cell.appendChild(kingElement);
            kingPiece.setPieceAttributes(kingElement, row, col);
            kingElement.appendChild(kingPiece.turnToKingPiece(kingElement));
            (selectedPiece.style.backgroundColor = "black") ? this.incrementWhiteKings() : this.incrementBlackKings();
          }

          


        }
      else{
    
      }
  } else {

  }
    return false;
  }    
    
  
  

  switchPlayer() {
    const newPlayer = (this.getCurrentPlayer() === 'white') ? 'black' : 'white';
    this.setCurrentPlayer(newPlayer);
  }
  

  setCurrentPlayer(player) {
    this.currentPlayer = player;
  }

  getCurrentPlayer() {
    return this.currentPlayer;
  }

  checkTurn(pieceColour) {
    return pieceColour === this.getCurrentPlayer();

  }

  gameOver(){
    if(this.getNumberOfWhitePieces() === 0 || this.getNumberOfBlackPieces() === 0){

      return true;
    }; // add to see if there is blockages
  }



  
    
  initialisePiece() {
    const board = this.boardControllerInstance.board;
      if(!this.checkKing()){
      for (let i = 0; i < board.rows; i++) {
        for (let j = 0; j < board.columns; j++) {
          if (this.boardControllerInstance.checkPieceAvailability(i, j)) {
            let piece = new Piece(
              board.getWhitePiecesMatrix(),
              board.getBlackPiecesMatrix(),
              board.matrix,
              board,
              board.square,
              i,j,
              this // is game engine really connected to piece?
            );
            const pieceElement = piece.constructPiece(i, j);
            const cell = document.getElementById(`${i}${j}`);
            if (cell) {
              cell.appendChild(pieceElement);
              piece.setPieceAttributes(pieceElement, i, j);


              //pieceElement.addEventListener('click', (event) => this.playerEngine.handlePieceSelection(event, pieceElement));
            }
         }
       }
      }


      }
  
    
  }

  // bug: you cant change your mind about piece selection


  handleGameClick(event, piece) {
                            
      this.startPlayerMove(piece);
    

  
  }
  

    
  startPlayerMove(piece) {
    const turnInfo = this.playerEngine.makeMove(null, piece, this.boardControllerInstance);
      this.displayMove(piece);
      this.isPlayerTurn = false;


    
  }
  
    
    


  

  displayMove(selectedPiece) {
    let moveOption = new PieceController(selectedPiece, this.boardControllerInstance.board, this, false);
    moveOption.generateMove();
    
  }
  
  aiMove(){


      let  AIsearch = this.ai.minimax(this.boardControllerInstance.board, 3, true, this); // evaluate variable is encapsulated because there's no reason the gameEngine should know it ... (carry on)

      let bestPosition = AIsearch[1]

      let oldRow, oldCol, newRow, newCol, selectedPiece
    
      for(let i=0; i<this.boardControllerInstance.board.rows; i++){
        for(let j=0; j<this.boardControllerInstance.board.columns; j++){
           if(this.boardControllerInstance.board.matrix[i][j] == 1 && bestPosition[i][j]== 0){
          
            [oldRow, oldCol] = [i,j];
            selectedPiece = document.querySelector(`div[data-row="${i}"][data-col="${j}"]`);


           }
           if(this.boardControllerInstance.board.matrix[i][j] !== 1 && bestPosition[i][j] !== 0){
             [newRow, newCol] = [i,j]
           }
          }
        
      }

      let AIMove = new PieceController(selectedPiece, this.boardControllerInstance.board, this, false)
      const moveDirection = (Math.abs(newRow-oldRow))>=2 ? "jump" : "null";

      AIMove.updateMatrix(oldRow, oldCol, newRow, newCol, moveDirection)
      AIMove.updateBoard(oldRow, oldCol, newRow, newCol, moveDirection)
      this.checkKing(selectedPiece);


      const combinedMatrixAND = bestPosition.map((row, i) =>
        row.map((cell, j) => cell & this.boardControllerInstance.board.getWhitePiecesMatrix()[i][j])
      );
      

      console.log("COMBINED MATRIX AND", combinedMatrixAND)
      this.boardControllerInstance.board.setWhitePiecesMatrix(combinedMatrixAND);


      this.isPlayerTurn = true;

      console.log("White pieces left", this.boardControllerInstance.board.getWhitePiecesLeft())

      

    }
  

  
  

    ///
  
  handleKingTransition(row, column, piece){
    
      // remove current piece at location.
      // call king class
      // construct king piece by its method
      
      //if(piece){
        //this.boardController.getSelectedSquare().removeChild(piece);
        //const king = new King() // also add piece here perhaps
      //}

    }
  
    // check if the king is on the opposite side of the matrix and change it into a king piece.

}
  

class Piece {
  constructor(parentMatrix1, parentMatrix2, matrix, board, square, x, y, gameEngineInstance) {
    this.parentMatrix1 = parentMatrix1;
    this.parentMatrix2 = parentMatrix2;
    this.matrix = matrix;
    this.boardInstance = board;
    this.squareInstance = square;
    this.operand = null;
    this.x = x;
    this.y = y;
    //this.piece = piece
    this.isKing = false;
    this.pieceColour = this.getColour(this.x,this.y);
    this.gameEngineInstance = gameEngineInstance;
    this.state = "pieces"
 

  }


  
  

  constructPiece(i,j) {
    const piece = document.createElement("div");
    
    [i].forEach(myNumber => {
      let formattedI = `1${myNumber}` 
      piece.id =`${formattedI}${j}` 

    })
    return piece;
  }

  getColour(i, j) {
   return (this.parentMatrix1[i][j] == 1) ? "white" : "black";
   
  }

  setPieceAttributes(piece, i, j) {
    piece.style.backgroundColor = this.pieceColour
    
    piece.className = this.state;
    piece.classList.add(this.state);
    piece.setAttribute("data-row", i);
    piece.setAttribute("data-col", j);
    if(piece.style.backgroundColor == "black"){
      piece.addEventListener('click', (event) => this.gameEngineInstance.handleGameClick(event, piece) ,{ once: false });
  }}

  
  //simulateClick(piece) {
    //const event = new MouseEvent('click', {
      //bubbles: true,
      //cancelable: true,
      //view: window
    //});
    //piece.dispatchEvent(event);
  //}

  


  

  unToggleHighlight() {
    document.querySelectorAll('.legalMove').forEach(cell => {
      cell.style.backgroundColor = "rgb(178, 152, 123)";
      cell.classList.remove('legalMove');
    });
  }








}






// make consideration about moving in king class.

class KingPiece extends Piece {
  constructor(parentMatrix1, parentMatrix2, matrix, board, square, x, y, gameEngineInstance) {
    super(parentMatrix1, parentMatrix2, matrix, board, square, x, y, gameEngineInstance);
    this.isKing = true;
    this.numberOfKingPieces = 0;
    this.shiftType = 1
    this.state = "king"




  }


  
  setPieceAttributes(piece, i, j) {
    piece.style.backgroundColor = this.pieceColour
    piece.classList.add('king');
    piece.setAttribute("data-row", i);
    piece.setAttribute("data-col", j);
    piece.className = "pieces"
    piece.addEventListener('click', (event) => this.gameEngineInstance.handleGameClick(event, piece) );
    


  }

  turnToKingPiece(piece) {
    const kingImage = document.createElement("img");
    kingImage.src = (piece.style.backgroundColor == "black") ? 'whiteCrown.png' : 'blackCrown1.png';
    kingImage.style.height = "35px"
    kingImage.style.position = "relative"
    kingImage.style.right = "-13px"
    kingImage.style.bottom = "-8.5px"
    kingImage.alt ="KING"

    return kingImage;
      
  }


}



class PlayerEngine{ // interface class
  constructor(gameEngineInstance){
    //this.selectedPiece = selectedPiece;
    this.gameEngineInstance = gameEngineInstance;

  }

  // get based on piece and its i                                                                                                                                                                              if(piece.style.backgroundColor == this.board.currentPlayer && (!this.board.selectedPiece)){



  startMoving(piece, boardController){
    let moveOption = new PieceController(piece, boardController.board, this.gameEngineInstance);
    moveOption.generateMove();
  }

  makeMove(event, piece, boardController) {
    let board = boardController.board
    return [(board.selectedPiece = (piece === board.selectedPiece) ? null : piece) !== null, board.selectedPiece];
 
  }
}


  



class Player extends PlayerEngine {
  constructor(gameEngineInstance) {
    super(gameEngineInstance);

    this.pieceColour = null;
    
  }

  setPieceColour(colour){
    this.pieceColour = colour; 
  }

  getPieceColour(){
    return this.pieceColour;

  }


  

  handleCellClick(){
    return;
  }

  makeMove(){
    return;
  }

}

class Opponent extends PlayerEngine {
  constructor(gameEngineInstance) {
    super(gameEngineInstance);
    this.pieceColour = null;
 
  }

  setPieceColour(colour){
    this.pieceColour = colour;
  }

  getPieceColour(){
    return this.pieceColour;
  }
}



class AI extends Opponent {
  constructor(gameEngineInstance) {
    super(gameEngineInstance);
    this.pieceColour = null;
// ai has a piece controller to aid it to move

  }

  evaluate(board) {
    return(board.getWhitePiecesLeft()-board.getBlackPiecesLeft())
  }
  

  // return all the pieces of a colour
  getPieces(colour){
    return ((colour == "white") ? this.gameEngineInstance.boardControllerInstance.getWhitePiecesMatrix() : this.gameEngineInstance.boardControllerInstance.getBlackPiecesMatrix())
  }

  // position = boardController Object, depth = how many moves ahead to look, maxplayer = maximising/minimising depending on piece. game= game Object
  minimax(position, depth, maxPlayer, game) {



    if (depth === 0) {

        return [this.evaluate(position), position];
    }
    
    if (maxPlayer) {
        let maxEval = -Infinity;
        let bestMove = null;
        for (let [move, board] of this.getAllMoves(position, "white", game)) {
            let evaluation = this.minimax(board, depth - 1, false, game)[0];
            if (evaluation > maxEval) {
                maxEval = evaluation;
                bestMove = move;
            }
        }
        return [maxEval, bestMove];
    } else {
        let minEval = Infinity;
        let bestMove = null;
        for (let [move, board] of this.getAllMoves(position, "black", game)) {
            let evaluation = this.minimax(board, depth - 1, true, game)[0];
            if (evaluation < minEval) {
                minEval = evaluation;
                bestMove = move;
            }
        }
        return [minEval, bestMove];
    }
}


  getAllMoves(board, colour, game) {
    const moves = [];  
    const pieceMatrix = colour === 'white' ? board.getWhitePiecesMatrix() : board.getBlackPiecesMatrix();
    console.log("pieceMatrix: ", pieceMatrix)
    for (let i = 0; i < (pieceMatrix.length); i++) {
      for (let j = 0; j < (pieceMatrix[i].length)+1; j++) {
        

        if (pieceMatrix[i][j] == 1) {
          let tempPiece = document.querySelector(`div[data-row="${i}"][data-col="${j}"]`)
          console.log("considering row: ", i," column: ", j)
  
          if (tempPiece && tempPiece.style) {
            board = this.cloneBoard(board);
            const AIpieceController = new PieceController(tempPiece, board, game, true);
            const [pieceMoves, direction] = AIpieceController.generateSingleMoves(i, j);
            
            pieceMoves.forEach(move => {
              moves.push([move, board]);
  
            });
          }
        }
      }
    }
    return moves;
  }
  



  cloneBoard(board) {
    const clone = Object.create(Object.getPrototypeOf(board));
    Object.assign(clone, JSON.parse(JSON.stringify(board, (key, value) => {
      if (key === "boardController" || key === "Square" || key === "boardInstance" || key==="game") return undefined;
      return value;
    })));
    clone.getWhitePiecesMatrix = board.getWhitePiecesMatrix.bind(clone);
    clone.getBlackPiecesMatrix = board.getBlackPiecesMatrix.bind(clone);
    return clone;
  }
  

}
  // programming  to an interface that can be used by both the player and the opponent.


// class to manage piece selection and management backend
class PieceController {
  constructor(selectedPiece, boardInstance, gameEngineInstance, aiSearchMode) {
    this.selectedPiece = selectedPiece;
    this.boardInstance = boardInstance;
    this.gameEngineInstance = gameEngineInstance; 
    this.aiSearchMode = Boolean(aiSearchMode); // key to piece controller to search possible moves to aid minimax, or just to move. true/false respectively.
    this.rows = boardInstance.rows;
    this.columns = boardInstance.columns;
    this.matrix = boardInstance.matrix;
    this.operand = this.selectedPiece.style.backgroundColor === 'black' ? ">>" : "<<";

  }


  // gets identity of the selected piece by getting the row and column of the selected piece, and then calling a method to generate moves for that piece
  generateMove() {
    const row = parseInt(this.selectedPiece.getAttribute('data-row'));
    const col = parseInt(this.selectedPiece.getAttribute('data-col'));
    this.generateSingleMoves(row, col);
  }

  unToggleHighlight() {
    document.querySelectorAll('.legalMove').forEach(cell => {
      cell.style.backgroundColor = "rgb(178, 152, 123)" // changes colour from green
      cell.classList.remove('legalMove'); // removes any attributes relating to a legal move for a piece
    });
  }

  // converts BigInt number to a string of 1s and 0s, forcing a legnth of up to 64 of trailing zeroes if too short
  getBinaryString(bigIntNumber){
    return(bigIntNumber.toString(2).padStart(this.rows * this.columns, '0'));
  }

  // this drops a matrix down to string length and as a string and converting it to bigInt
  matrixToBigInt(matrix) {
    return(BigInt('0b' + matrix.flat().join(''))) // "0b" is a BigInt identifier for javascript
  }
  // converts bigInt number to a matrix
  BigIntToMatrix(binaryBigInt) {
    const binaryString = this.getBinaryString(binaryBigInt) 
    const matrix = [];
    for (let i = 0; i < this.rows; i++) {
      const row = [];
      for (let j = 0; j < this.columns; j++) {
        row.push(Number(binaryString[i * this.columns + j])); // pushing the number 1/0 for every square
      }
      matrix.push(row);
    }
    return matrix;
  }

  // this returns bigInt number encoding just the one selected piece
  getPieceAlone() {
    let emptyPieceArray = new Array(this.rows).fill(0).map(() => new Array(this.columns).fill(0));  // this sets an empty 8x8 array, filled with zeroes
    emptyPieceArray[parseInt(this.selectedPiece.getAttribute('data-row'))][parseInt(this.selectedPiece.getAttribute('data-col'))] = 1; // puts the selected piece in the array.
    return this.matrixToBigInt(emptyPieceArray); // returns bigInt version of calculated array
  }




  // method to obtain every possible moves for selected piece in matrix form, and either highlights them if it's the players' turn or returns them to the minimax methods in a loop to get every available piece's possible moves
  generateSingleMoves(row, column) {
    let moves = [];
    let potentialMoves = this.generateBigIntMoves(this.selectedPiece.childNodes.length > 0, row, column); // this generates possible moves in a bigInt form, handling the matrices updates mathematically before updating them in grid format
    this.unToggleHighlight(); // clears any generated highlight
    for (const [move, direction] of potentialMoves) {
      if (this.isMoveLegal(move, direction)) { // returns true if the move is legal in the context of an grid structure
        const [newRow, newCol] = this.getCoordinates(move, false);
            if (this.aiSearchMode) { // if minimax initialised the
              const [oldRow, oldCol] = this.getCoordinates(this.getPieceAlone(), false);
              moves.push([oldRow, oldCol, newRow, newCol, direction]); // all the information for a move for the ai to utilise
              
            } else {
              this.highlightMove(newRow, newCol, direction); // visually highlights players' available moves
            }
          }
      }

    
    if (this.aiSearchMode) {
      return(this.aiSearch(moves));
    }
  }

// this prepares a moves matrix to apply to a deep copy of a matrix for the AI
  aiSearch(moves){ 
  
      let allMatrices = [];
      let directions = [];

      // this loops through each moveInfo and then directs to a method that converts it to matrix
      moves.forEach((moveInformation)=> {
        const [oldRow, oldCol, newRow, newCol, direction] = [...moveInformation]
        allMatrices.push(this.searchMatrix(oldRow, oldCol, newRow, newCol, direction))
        directions.push(direction)
      })

     return [allMatrices, directions];
    
}
  
  

               
// method to deal with bitwise shift operations for any piece, in any grid structure
  generateBigIntMoves(isKing, row,column){
    let potentialMoves = []; 
    const pieceBigInt = this.getPieceAlone(); // this is the BigInt version of the matrix with the only selected piece in it - abstracting other pieces to ensure operations are handled only to pieces.
    
    // object containing all of considerations the amount of places binary shifts for each possible move - compatible for any grid size
    const directions = {
      left: BigInt((this.columns - column) + (column - 1)),
      right: BigInt((this.columns - column) + (column + 1)),
      jumpLeft: BigInt((this.columns - column) + (column - 2) + (this.columns)),
      jumpRight: BigInt((this.columns - column) + (column + 2) + (this.columns)),
    };

    // difference in << and >> is  down to opposite horizontal ends programmed. e.g << (right binary shift) is for white pieces because they can only move upwards, making the binary BigInt number bigger, which is why right shift is used
    // king moves CAN move in all of these directions given they're not at the right edges

    // formulated shifts for white and king pieces
    if((!isKing && this.operand===">>") || (isKing)){ 
      // * carefully tested parameters to avoid potential moves from falling outside the board all below.
      // white and black pieces have different considerations due to opposite encoded co-ordinates of matrix
     
      if (row >= 0 && column > 0) { 
          potentialMoves.push([pieceBigInt >> BigInt(directions.left), Object.keys(directions)[0]]); // gets the key from directions object 
      }
      if(column > 1){
        potentialMoves.push([pieceBigInt >> BigInt(directions.jumpLeft), Object.keys(directions)[2]]);
      }
      if (row < this.rows-1  && column < this.columns - 1 ) { 
        potentialMoves.push([pieceBigInt >> BigInt(directions.right), Object.keys(directions)[1]]);
      }
      if(row < this.rows - 1 && column < this.columns - 2  ){
        potentialMoves.push([pieceBigInt >> BigInt(directions.jumpRight), Object.keys(directions)[3]]);
      }

    } else if((!isKing && this.operand==="<<") || (isKing)){ // black and king pieces moves
      if (row >0 && column >  1) { 
        potentialMoves.push([pieceBigInt << BigInt(directions.jumpRight), Object.keys(directions)[3]]);
      }
      if(row> 0 && column >0){
        potentialMoves.push([pieceBigInt << BigInt(directions.right), Object.keys(directions)[1]]);
      }
      if (row > 0 && column < this.columns - 1) { 
        potentialMoves.push([pieceBigInt << BigInt(directions.left), Object.keys(directions)[0]]);
      }
      if(row>0 &&   column >= 0 && column <  this.columns - 2){
        potentialMoves.push([pieceBigInt << BigInt(directions.jumpLeft), Object.keys(directions)[2]]);
      }
    
  }
  return potentialMoves; // returns a 2d array of altered BigInt numbers, and the direction that was referenced whilst altering 
  

    }


  

  searchMatrix(oldRow, oldCol, newRow, newCol, moveDirection) {
      // require lodash
      let newMatrix = JSON.parse(JSON.stringify(this.boardInstance.matrix));  // Deep copy of current matrix
      let board = JSON.parse(JSON.stringify(this.boardInstance));  // Deep copy of current board
      newMatrix[oldRow][oldCol] = 0; 
      newMatrix[newRow][newCol] = 1; 
      
      if (moveDirection.match(/jump*/)) {
          let [midRow, midCol] = this.getMidCoordination(oldRow, newRow, oldCol, newCol);
          newMatrix[midRow][midCol] = 0; 
          (this.selectedPiece.style.backgroundColor == "black") ? this.boardInstance.decrementWhitePieces() : this.boardInstance.decrementBlackPieces();
  
      }
      return newMatrix;
  }
  
    
    
  // this method ensures the legality of any move processed
  isMoveLegal(binaryBigInt, direction) {
    const [oldRow, oldCol] = this.getCoordinates(this.getPieceAlone(), false);
    const [newRow, newCol] = this.getCoordinates(this.BigIntToMatrix(binaryBigInt), true);
    const opponentMatrix =this.selectedPiece.style.backgroundColor === 'black' ? this.boardInstance.getWhitePiecesMatrix() :this.boardInstance.getBlackPiecesMatrix() 
   
    if(direction.match(/jump*/) && this.checkJumpMove(oldRow, newRow, oldCol, newCol) ||  ((!direction.match(/jump*/) && this.checkRegularMove(newRow, newCol)))){ // initialises checks
      return true;
    }
  }

  // calculates midpoint of current position and position of jump to get the coordinates of piece to be potentially be taken
  getMidCoordination(oldRow, newRow, oldCol, newCol) {
    return [
      Math.floor((oldRow + newRow) / 2),
      Math.floor((oldCol + newCol) / 2)
    ];
  }


  checkRegularMove(newRow, newCol){
    return(!this.isWithinBounds(newRow, newCol) || this.matrix[newRow][newCol] === 1) ? false : true // a move can't be placed if it's outside the grid or the destination already has a piece in it

  }

   // checks if a jump move is possible   
  checkJumpMove(oldRow, newRow, oldCol, newCol){
    const opponentMatrix =this.selectedPiece.style.backgroundColor === 'black' ? this.boardInstance.getWhitePiecesMatrix() :this.boardInstance.getBlackPiecesMatrix() 
   // RegEx to identify and jump-direction moves (taking other players' piece)
      let [midRow, midCol] = this.getMidCoordination(oldRow, newRow, oldCol, newCol); // where the other players' piece must be at.

      if( !this.isWithinBounds(newRow, newCol) || opponentMatrix[midRow][midCol] !== 1 ){ // if the jump is outside of grid bondaries or there is no piece at regular move, jump move is invalid
        return false;
      } else{
        return true;
      }
}
      


    
   
  // this method retrieves co-ordinates for an array or string with one element inside
  getCoordinates(searchItem, isMatrix){
    let row, col;
    
    // finding a way to use a loop to find target in both searchItem format, a matrix/string
    const finder = (isMatrix) ? searchItem : this.getBinaryString(searchItem) // searchItem valid if matrix, else need to be converted to a string
    for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {

          try{
            const target = (isMatrix) ? (finder[i][j]===1) : ( finder[i * this.columns + j] === "1") // matrix uses the bracket notation but string references numerical order and searches its data type version of 1 
  
            if(target){
              row = i;
              col = j;
              break; // stop the loop - no need to waste more processing memory - as we are only looking for one targer
            }
            if (row !== undefined) {
              break; 
            }
              
            
          }

             catch(error){
                if (error instanceof TypeError){ // this blocks any undefined values
                  console.error("undefined")
                }
              }
        }
    }

    return [row, col];        
       
  }

   

  
// method to check if co-ordinates exists inside the board range
  isWithinBounds(row, col) {
    return row >= 0 && row < this.rows && col >= 0 && col < this.columns;
}



  highlightMove(newRow, newCol, moveDirection) {
    const cell = document.getElementById(`${newRow}${newCol}`);
    if (cell) {
        cell.classList.add('legalMove');
        cell.style.backgroundColor = (moveDirection.match(/jump*/)) ? "red" : "green";
        cell.addEventListener('click', (event) => this.movePiece(event, newRow, newCol, moveDirection), { once: true });
    }
}


async movePiece(event, newRow, newCol, moveDirection) { // async because we need to wait for the animation to finish
  const { selectedPiece } = this.boardInstance;
  
  if (!selectedPiece || selectedPiece !== this.selectedPiece) {
    return;
  }


  const oldRow = parseInt(this.selectedPiece.getAttribute('data-row'));
  const oldCol = parseInt(this.selectedPiece.getAttribute('data-col'));
  if(moveDirection.match(/jump*/)){
    let [midRow, midCol] = this.getMidCoordination(oldRow, newRow, oldCol, newCol);
    const midCell = document.getElementById(`${midRow}${midCol}`);
    const pieceAtMid = midCell.querySelector('.pieces');
    pieceAtMid.style.backgroundColor === 'black' ? this.boardInstance.decrementBlackPieces(): this.boardInstance.decrementWhitePieces();
      }

  

  
  if (this.matrix[newRow][newCol] !== 0) {
    return;
  }
  

  
  Promise.all([
    this.updateMatrixAsync(oldRow, oldCol, newRow, newCol, moveDirection),
    this.updateBoardAsync(oldRow, oldCol, newRow, newCol, moveDirection),
    this.gameEngineInstance.checkKing(document.getElementById(`${newRow}${newCol}`).querySelector('.pieces'))
    
    

    
  ]).then(() => {
    this.boardInstance.selectedPiece = null;
    this.unToggleHighlight();
    this.gameEngineInstance.switchPlayer();
    setTimeout(() => {
      this.gameEngineInstance.aiMove();
      this.gameEngineInstance.switchPlayer();
    }, 1000);

  });






  }
 


updateMatrix(oldRow, oldCol, newRow, newCol, moveDirection) {
  const color = this.selectedPiece.style.backgroundColor;
  
  // Get current matrices
  const blackMatrix = this.boardInstance.getBlackPiecesMatrix();
  const whiteMatrix = this.boardInstance.getWhitePiecesMatrix();


  if (moveDirection.match(/jump*/)) {
    let [midRow, midCol] = this.getMidCoordination(oldRow, newRow, oldCol, newCol);
    
    if (color === "black") {
      blackMatrix[oldRow][oldCol] = 0;
      whiteMatrix[midRow][midCol] = 0;
      blackMatrix[newRow][newCol] = 1;
      this.boardInstance.setBlackPiecesMatrix(blackMatrix);
      this.boardInstance.setWhitePiecesMatrix(whiteMatrix);
    } else {
      whiteMatrix[oldRow][oldCol] = 0;
      blackMatrix[midRow][midCol] = 0;
      whiteMatrix[newRow][newCol] = 1;
      this.boardInstance.setBlackPiecesMatrix(blackMatrix);
      this.boardInstance.setWhitePiecesMatrix(whiteMatrix);
    }
    
    // Update this.matrix
    this.matrix[oldRow][oldCol] = 0;
    this.matrix[midRow][midCol] = 0;
    this.matrix[newRow][newCol] = 1;
  } else {
    // Update the matrix based on the color of the piece
    if (color === 'black') {
      blackMatrix[oldRow][oldCol] = 0;
      blackMatrix[newRow][newCol] = 1;
      this.boardInstance.setBlackPiecesMatrix(blackMatrix);
    } else {
      whiteMatrix[oldRow][oldCol] = 0;
      whiteMatrix[newRow][newCol] = 1;
      this.boardInstance.setWhitePiecesMatrix(whiteMatrix);
    }
    
    // Update this.matrix
    this.matrix[oldRow][oldCol] = 0;
    this.matrix[newRow][newCol] = 1;


    
  }


 

  

}

updateMatrixAsync(oldRow, oldCol, newRow, newCol, moveDirection) {
  return new Promise(resolve => {
    this.updateMatrix(oldRow, oldCol, newRow, newCol, moveDirection);
    
    resolve();
  });
}

updateBoardAsync(oldRow, oldCol, newRow, newCol, moveDirection) {
  return new Promise(resolve => {
    this.updateBoard(oldRow, oldCol, newRow, newCol, moveDirection);
    resolve();
  });
}


updateBoard(oldRow, oldCol, newRow, newCol, moveDirection) {
  if(!this.aiSearchMode){
    const oldCell = document.getElementById(`${oldRow}${oldCol}`);
    const newCell = document.getElementById(`${newRow}${newCol}`);
    let [midRow, midCol] = this.getMidCoordination(oldRow, newRow, oldCol, newCol);
    const midCell = document.getElementById(`${midRow}${midCol}`);
    
    if (moveDirection.match(/jump*/)) {
      if (midCell && midCell.childNodes.length > 0) {
        midCell.removeChild(midCell.childNodes[0]); // Ensure only the piece is removed
      }
    } 
    
    if (oldCell && oldCell.childNodes.length > 0) {
      oldCell.removeChild(oldCell.childNodes[0]);
    }

    if (newCell) {
      newCell.appendChild(this.selectedPiece);


    }
    
    this.selectedPiece.setAttribute('data-row', newRow);
    this.selectedPiece.setAttribute('data-col', newCol);

    return(this.matrix)

      
  }
}


    

  

}



/*
Move Up-Left: piece <<7n
Move Up-Right: piece << 9n
Move Down-Left: piece >> 7n
Move Down-Right: piece >> 9n
*/ 
const game = new Game();
