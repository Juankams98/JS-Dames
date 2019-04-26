var squares;
var turn = true;
squares = [], [];
for (let i = 0; i < 8; i++) {
    squares.push(["", "", "", "", "", "", "", ""]);
}
console.log(squares);
createTable();
function createTable() {
    let table = document.getElementById("table");
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
                }
                else {
                    square.classList.add("blackSquare");
                }
            }
            else {
                if (j % 2 == 0) {
                    square.classList.add("blackSquare");
                }
                else {
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
            }
            else {
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
            }
            else {
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
function addToken(parent, type) {
    squareList = document.getElementsByClassName("square");
    let token = document.createElement("div");
    token.classList.add(type);
    token.classList.add("token");


    if (type == 'blackToken') {
        token.onclick = (e) => {
            let x = parseInt(token.parentElement.getAttribute("x"));
            let y = parseInt(token.parentElement.getAttribute("y"));
            for (let j = 0; j < squareList.length; j++) {
                squareList[j].classList.remove("moveOption");

            }
            let nsquare = 0;
            for (let i = 0; i < squareList.length; i++) {
                element = squareList[i];

                if (squareList[i].hasChildNodes() == true &&
                    squareList[i].childNodes[0].classList.contains("whiteToken") &&
                    squareList[i].getAttribute("x") == x + 1 &&
                    squareList[i].getAttribute("y") == y - 1 &&
                    squareList[i + 7] &&
                    squareList[i + 7].hasChildNodes() == false) {
                    squareList[i + 7].classList.add("moveOption");
                    squareList[i + 7].onclick = (e) => {
                        if (turn) {
                            console.log(e.target);
                            parent.innerHTML = "";
                            squareList[i].innerHTML = "";
                            addToken(e.target, type);
                            for (let j = 0; j < squareList.length; j++) {
                                squareList[j].classList.remove("moveOption");
                                squareList[j].onclick = () => { }
                            }
                            turn = !turn;
                        }
                    }

                }


                if (squareList[i].hasChildNodes() == true &&
                    squareList[i].childNodes[0].classList.contains("whiteToken") &&
                    squareList[i].getAttribute("x") == x + 1 &&
                    squareList[i].getAttribute("y") == y + 1 &&
                    squareList[i + 9] &&
                    squareList[i + 9].hasChildNodes() == false) {
                    squareList[i + 9].classList.add("moveOption");
                    squareList[i + 9].onclick = (e) => {
                        if (turn) {
                            console.log(e.target);
                            parent.innerHTML = "";
                            squareList[i].innerHTML = "";
                            addToken(e.target, type);
                            for (let j = 0; j < squareList.length; j++) {
                                squareList[j].classList.remove("moveOption");
                                squareList[j].onclick = () => { }
                            }
                            turn = !turn;
                        }
                    }

                }

                if (element.hasChildNodes() == false &&
                    element.getAttribute("x") == x + 1 &&
                    element.getAttribute("y") == y + 1 ||
                    element.hasChildNodes() == false &&
                    element.getAttribute("x") == x + 1 &&
                    element.getAttribute("y") == y - 1) {
                    element.classList.add("moveOption");
                    element.onclick = function move(e) {
                        if (turn) {
                            console.log(e.target);
                            parent.innerHTML = "";
                            addToken(e.target, type);
                            for (let j = 0; j < squareList.length; j++) {
                                squareList[j].classList.remove("moveOption");
                                squareList[j].onclick = () => { }
                            }
                            turn = !turn;
                        }

                    }
                    nsquare++
                    if (nsquare == 2) {
                        break;
                    }
                }

            }
        }
    }
    else {
        token.onclick = (e) => {
            let x = parseInt(token.parentElement.getAttribute("x"));
            let y = parseInt(token.parentElement.getAttribute("y"));
            for (let j = 0; j < squareList.length; j++) {
                squareList[j].classList.remove("moveOption");

            }
            for (let i = 0; i < squareList.length; i++) {
                element = squareList[i];
                if (squareList[i].hasChildNodes() == true &&
                    squareList[i].childNodes[0].classList.contains("blackToken") &&
                    squareList[i].getAttribute("x") == x - 1 &&
                    squareList[i].getAttribute("y") == y + 1 &&
                    squareList[i - 7] &&
                    squareList[i - 7].hasChildNodes() == false) {
                    squareList[i - 7].classList.add("moveOption");
                    squareList[i - 7].onclick = (e) => {
                        if (!turn) {
                            console.log(e.target);
                            parent.innerHTML = "";
                            squareList[i].innerHTML = "";
                            addToken(e.target, type);
                            for (let j = 0; j < squareList.length; j++) {
                                squareList[j].classList.remove("moveOption");
                                squareList[j].onclick = () => { }
                            }
                            turn = !turn;
                        }
                    }

                }


                if (squareList[i].hasChildNodes() == true &&
                    squareList[i].childNodes[0].classList.contains("blackToken") &&
                    squareList[i].getAttribute("x") == x - 1 &&
                    squareList[i].getAttribute("y") == y - 1 &&
                    squareList[i - 9] &&
                    squareList[i - 9].hasChildNodes() == false) {
                    squareList[i - 9].classList.add("moveOption");
                    squareList[i - 9].onclick = (e) => {
                        if (!turn) {
                            console.log(e.target);
                            parent.innerHTML = "";
                            squareList[i].innerHTML = "";
                            addToken(e.target, type);
                            for (let j = 0; j < squareList.length; j++) {
                                squareList[j].classList.remove("moveOption");
                                squareList[j].onclick = () => { }
                            }
                            turn = !turn;
                        }
                    }

                }
                if (squareList[i].hasChildNodes() == false &&
                    squareList[i].getAttribute("x") == x - 1 &&
                    squareList[i].getAttribute("y") == y + 1 ||
                    squareList[i].hasChildNodes() == false &&
                    squareList[i].getAttribute("x") == x - 1 &&
                    squareList[i].getAttribute("y") == y - 1) {
                    squareList[i].classList.add("moveOption");
                    squareList[i].onclick = (e) => {
                        if (!turn) {
                            console.log(e.target);
                            parent.innerHTML = "";
                            addToken(e.target, type);
                            for (let j = 0; j < squareList.length; j++) {
                                squareList[j].classList.remove("moveOption");
                                squareList[j].onclick = () => { }
                            }
                            turn = !turn;
                        }
                    }
                }
            }
        }
    }

    parent.appendChild(token);
}
