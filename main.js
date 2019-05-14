var squares;
var turn = false;
(squares = []), [];
for (let i = 0; i < 8; i++) {
  squares.push(["", "", "", "", "", "", "", ""]);
}
createTable();
function createTable() {
  let table = document.getElementById("table");
  table.innerHTML = "";
  for (let i = 0; i < squares.length; i++) {
    let row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < squares.length; j++) {
      let square = document.createElement("div");
      square.classList.add("square");
      square.setAttribute("x", i);
      square.setAttribute("y", j);
      if (i % 2 == 0) {
        if (j % 2 == 0) {
          square.classList.add("whiteSquare");
        } else {
          square.classList.add("blackSquare");
        }
      } else {
        if (j % 2 == 0) {
          square.classList.add("blackSquare");
        } else {
          square.classList.add("whiteSquare");
        }
      }
      row.appendChild(square);
    }

    if (i < 3) {
      if (i == 0 || i == 2) {
        let rowSquares = row.getElementsByClassName("square");
        for (let j = 0; j < rowSquares.length; j++) {
          if (j % 2 != 0) {
            addToken(rowSquares[j], "blackToken");
          }
        }
      } else {
        let rowSquares = row.getElementsByClassName("square");
        for (let j = 0; j < rowSquares.length; j++) {
          if (j % 2 == 0) {
            addToken(rowSquares[j], "blackToken");
          }
        }
      }
    }
    if (i > 4) {
      if (i == 5 || i == 7) {
        let rowSquares = row.getElementsByClassName("square");
        for (let j = 0; j < rowSquares.length; j++) {
          if (j % 2 == 0) {
            addToken(rowSquares[j], "whiteToken");
          }
        }
      } else {
        let rowSquares = row.getElementsByClassName("square");
        for (let j = 0; j < rowSquares.length; j++) {
          if (j % 2 != 0) {
            addToken(rowSquares[j], "whiteToken");
          }
        }
      }
    }
    table.appendChild(row);
  }
}
function addToken(parent, type, queen) {
  squareList = document.getElementsByClassName("square");
  let token = document.createElement("div");
  token.classList.add(type);
  token.classList.add("token");
  let crown = document.createElement("img");
  crown.src = "img/crown.png";
  crown.classList.add("crown");
  if (type == "blackToken") {
    if (
      (!token.classList.contains("queenToken") &&
        parent.getAttribute("x") == 7) ||
      queen
    ) {
      token.classList.add("queenToken");
      token.appendChild(crown);
    }
    token.onclick = e => {
      let x = parseInt(token.parentElement.getAttribute("x"));
      let y = parseInt(token.parentElement.getAttribute("y"));
      for (let j = 0; j < squareList.length; j++) {
        squareList[j].classList.remove("moveOption");
      }
      for (let i = 0; i < squareList.length; i++) {
        element = squareList[i];

        //BLACK QUEEN EAT 1
        if (
          squareList[i].hasChildNodes() &&
          parent.childNodes[0].classList.contains("queenToken") &&
          squareList[i].childNodes[0].classList.contains("whiteToken") &&
          squareList[i].getAttribute("x") == x - 1 &&
          squareList[i].getAttribute("y") == y - 1 &&
          squareList[i - 9] &&
          !squareList[i - 9].hasChildNodes()
        ) {
          if (turn) squareList[i - 9].classList.add("moveOption");
          squareList[i - 9].onclick = e => {
            if (turn) {
              parent.innerHTML = "";
              squareList[i].innerHTML = "";
              addToken(e.target, type, true);
              for (let j = 0; j < squareList.length; j++) {
                squareList[j].classList.remove("moveOption");
                squareList[j].onclick = () => {};
              }
              turn = !turn;
            }
          };
        }
        // BLACK QUEEN EAT 2
        if (
          squareList[i].hasChildNodes() &&
          parent.childNodes[0].classList.contains("queenToken") &&
          squareList[i].childNodes[0].classList.contains("whiteToken") &&
          squareList[i].getAttribute("x") == x - 1 &&
          squareList[i].getAttribute("y") == y + 1 &&
          squareList[i - 7] &&
          !squareList[i - 7].hasChildNodes()
        ) {
          if (turn) squareList[i - 7].classList.add("moveOption");
          squareList[i - 7].onclick = e => {
            if (turn) {
              parent.innerHTML = "";
              squareList[i].innerHTML = "";
              addToken(e.target, type, true);
              for (let j = 0; j < squareList.length; j++) {
                squareList[j].classList.remove("moveOption");
                squareList[j].onclick = () => {};
              }
              turn = !turn;
            }
          };
        }
        // BLACK EAT 1
        if (
          squareList[i].hasChildNodes() &&
          squareList[i].childNodes[0].classList.contains("whiteToken") &&
          squareList[i].getAttribute("x") == x + 1 &&
          squareList[i].getAttribute("y") == y - 1 &&
          squareList[i + 7] &&
          !squareList[i + 7].hasChildNodes()
        ) {
          if (turn) squareList[i + 7].classList.add("moveOption");
          squareList[i + 7].onclick = e => {
            if (turn) {
              if (parent.childNodes[0].classList.contains("queenToken")) {
                addToken(e.target, type, true);
              } else {
                addToken(e.target, type);
              }
              parent.innerHTML = "";
              squareList[i].innerHTML = "";
              for (let j = 0; j < squareList.length; j++) {
                squareList[j].classList.remove("moveOption");
                squareList[j].onclick = () => {};
              }
              turn = !turn;
            }
          };
        }

        //BLACK EAT 2
        if (
          squareList[i].hasChildNodes() &&
          squareList[i].childNodes[0].classList.contains("whiteToken") &&
          squareList[i].getAttribute("x") == x + 1 &&
          squareList[i].getAttribute("y") == y + 1 &&
          squareList[i + 9] &&
          !squareList[i + 9].hasChildNodes()
        ) {
          if (turn) squareList[i + 9].classList.add("moveOption");
          squareList[i + 9].onclick = e => {
            if (turn) {
              if (parent.childNodes[0].classList.contains("queenToken")) {
                addToken(e.target, type, true);
              } else {
                addToken(e.target, type);
              }
              parent.innerHTML = "";
              squareList[i].innerHTML = "";
              for (let j = 0; j < squareList.length; j++) {
                squareList[j].classList.remove("moveOption");
                squareList[j].onclick = () => {};
              }
              turn = !turn;
            }
          };
        }
        //BLACK MOVE
        if (
          (!element.hasChildNodes() &&
            element.getAttribute("x") == x + 1 &&
            element.getAttribute("y") == y + 1) ||
          (!element.hasChildNodes() &&
            element.getAttribute("x") == x + 1 &&
            element.getAttribute("y") == y - 1)
        ) {
          if (turn) element.classList.add("moveOption");
          element.onclick = function move(e) {
            if (turn) {
              if (parent.childNodes[0].classList.contains("queenToken")) {
                addToken(e.target, type, true);
              } else {
                addToken(e.target, type);
              }
              parent.innerHTML = "";
              for (let j = 0; j < squareList.length; j++) {
                squareList[j].classList.remove("moveOption");
                squareList[j].onclick = () => {};
              }
              turn = !turn;
            }
          };
        }
        //BLACK QUEEN MOVE
        if (
          (!element.hasChildNodes() &&
            parent.childNodes[0].classList.contains("queenToken") &&
            element.getAttribute("x") == x + 1 &&
            element.getAttribute("y") == y + 1) ||
          (!element.hasChildNodes() &&
            parent.childNodes[0].classList.contains("queenToken") &&
            element.getAttribute("x") == x - 1 &&
            element.getAttribute("y") == y + 1)
        ) {
          if (turn) element.classList.add("moveOption");
          element.onclick = function move(e) {
            if (turn) {
              parent.innerHTML = "";
              addToken(e.target, type, true);
              for (let j = 0; j < squareList.length; j++) {
                squareList[j].classList.remove("moveOption");
                squareList[j].onclick = () => {};
              }
              turn = !turn;
            }
          };
        }
      }
    };
  } else {
    if (parent.getAttribute("x") == 0) {
      token.classList.add("queenToken");
      token.appendChild(crown);
    }
    token.onclick = e => {
      let x = parseInt(token.parentElement.getAttribute("x"));
      let y = parseInt(token.parentElement.getAttribute("y"));
      for (let j = 0; j < squareList.length; j++) {
        squareList[j].classList.remove("moveOption");
      }
      for (let i = 0; i < squareList.length; i++) {
        element = squareList[i];
        //WHITE EAT 1
        if (
          squareList[i].hasChildNodes() == true &&
          squareList[i].childNodes[0].classList.contains("blackToken") &&
          squareList[i].getAttribute("x") == x - 1 &&
          squareList[i].getAttribute("y") == y + 1 &&
          squareList[i - 7] &&
          squareList[i - 7].hasChildNodes() == false
        ) {
          if (!turn) squareList[i - 7].classList.add("moveOption");
          squareList[i - 7].onclick = e => {
            if (!turn) {
              if (parent.childNodes[0].classList.contains("queenToken")) {
                addToken(e.target, type, true);
              } else {
                addToken(e.target, type);
              }
              parent.innerHTML = "";
              squareList[i].innerHTML = "";
              for (let j = 0; j < squareList.length; j++) {
                squareList[j].classList.remove("moveOption");
                squareList[j].onclick = () => {};
              }
              turn = !turn;
            }
          };
        }

        //WHITE EAT 2
        if (
          squareList[i].hasChildNodes() == true &&
          squareList[i].childNodes[0].classList.contains("blackToken") &&
          squareList[i].getAttribute("x") == x - 1 &&
          squareList[i].getAttribute("y") == y - 1 &&
          squareList[i - 9] &&
          squareList[i - 9].hasChildNodes() == false
        ) {
          if (!turn) squareList[i - 9].classList.add("moveOption");
          squareList[i - 9].onclick = e => {
            if (!turn) {
              if (parent.childNodes[0].classList.contains("queenToken")) {
                addToken(e.target, type, true);
              } else {
                addToken(e.target, type);
              }
              parent.innerHTML = "";
              squareList[i].innerHTML = "";
              for (let j = 0; j < squareList.length; j++) {
                squareList[j].classList.remove("moveOption");
                squareList[j].onclick = () => {};
              }
              turn = !turn;
            }
          };
        }
        // WHITE QUEEN EAT 1
        if (
          squareList[i].hasChildNodes() &&
          parent.childNodes[0].classList.contains("queenToken") &&
          squareList[i].childNodes[0].classList.contains("blackToken") &&
          squareList[i].getAttribute("x") == x + 1 &&
          squareList[i].getAttribute("y") == y + 1 &&
          squareList[i + 9] &&
          !squareList[i + 9].hasChildNodes()
        ) {
          if (turn) squareList[i + 9].classList.add("moveOption");
          squareList[i + 9].onclick = e => {
            if (!turn) {
              parent.innerHTML = "";
              squareList[i].innerHTML = "";
              addToken(e.target, type, true);
              for (let j = 0; j < squareList.length; j++) {
                squareList[j].classList.remove("moveOption");
                squareList[j].onclick = () => {};
              }
              turn = !turn;
            }
          };
        }
        // WHITE QUEEN EAT 2
        if (
          squareList[i].hasChildNodes() &&
          parent.childNodes[0].classList.contains("queenToken") &&
          squareList[i].childNodes[0].classList.contains("blackToken") &&
          squareList[i].getAttribute("x") == x + 1 &&
          squareList[i].getAttribute("y") == y - 1 &&
          squareList[i + 7] &&
          !squareList[i + 7].hasChildNodes()
        ) {
          if (turn) squareList[i + 7].classList.add("moveOption");
          squareList[i + 7].onclick = e => {
            if (!turn) {
              parent.innerHTML = "";
              squareList[i].innerHTML = "";
              addToken(e.target, type, true);
              for (let j = 0; j < squareList.length; j++) {
                squareList[j].classList.remove("moveOption");
                squareList[j].onclick = () => {};
              }
              turn = !turn;
            }
          };
        }
        //WHITE MOVE
        if (
          (squareList[i].hasChildNodes() == false &&
            squareList[i].getAttribute("x") == x - 1 &&
            squareList[i].getAttribute("y") == y + 1) ||
          (squareList[i].hasChildNodes() == false &&
            squareList[i].getAttribute("x") == x - 1 &&
            squareList[i].getAttribute("y") == y - 1)
        ) {
          if (!turn) squareList[i].classList.add("moveOption");
          squareList[i].onclick = e => {
            if (!turn) {
              if (parent.childNodes[0].classList.contains("queenToken")) {
                addToken(e.target, type, true);
              } else {
                addToken(e.target, type);
              }
              parent.innerHTML = "";
              for (let j = 0; j < squareList.length; j++) {
                squareList[j].classList.remove("moveOption");
                squareList[j].onclick = () => {};
              }
              turn = !turn;
            }
          };
        }
        //WHITE QUEEN MOVE
        if (
          (!element.hasChildNodes() &&
            parent.childNodes[0].classList.contains("queenToken") &&
            element.getAttribute("x") == x + 1 &&
            element.getAttribute("y") == y + 1) ||
          (!element.hasChildNodes() &&
            parent.childNodes[0].classList.contains("queenToken") &&
            element.getAttribute("x") == x + 1 &&
            element.getAttribute("y") == y - 1)
        ) {
          if (!turn) {
            element.classList.add("moveOption");
          }
          element.onclick = function move(e) {
            if (!turn) {
              parent.innerHTML = "";
              addToken(e.target, type, true);
              for (let j = 0; j < squareList.length; j++) {
                squareList[j].classList.remove("moveOption");
                squareList[j].onclick = () => {};
              }
              turn = !turn;
            }
          };
        }
      }
    };
  }

  parent.appendChild(token);
}
