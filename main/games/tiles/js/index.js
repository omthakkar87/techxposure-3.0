var moves;

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function toggle(a, b) {
    moves += 1;
    document.getElementById("moves").innerHTML = "Moves: " + moves;
    $(document.getElementsByClassName('block')[a + (b * 5)]).toggleClass("b1 b2");
    if (a < 4) { $(document.getElementsByClassName('block')[(a + 1) + (b * 5)]).toggleClass("b1 b2") }
    if (a > 0) { $(document.getElementsByClassName('block')[(a - 1) + (b * 5)]).toggleClass("b1 b2") }
    if (b < 4) { $(document.getElementsByClassName('block')[a + ((b + 1) * 5)]).toggleClass("b1 b2") }
    if (b > 0) { $(document.getElementsByClassName('block')[a + ((b - 1) * 5)]).toggleClass("b1 b2") }
    if (document.getElementsByClassName('b1').length == 25 || document.getElementsByClassName('b2').length == 25) {
        document.getElementById('winmodal').style.display = 'block';
    }
}

function set(a, b) {
    $(document.getElementsByClassName('block')[a + (b * 5)]).toggleClass("b1 b2");
    if (a < 4) { $(document.getElementsByClassName('block')[(a + 1) + (b * 5)]).toggleClass("b1 b2") }
    if (a > 0) { $(document.getElementsByClassName('block')[(a - 1) + (b * 5)]).toggleClass("b1 b2") }
    if (b < 4) { $(document.getElementsByClassName('block')[a + ((b + 1) * 5)]).toggleClass("b1 b2") }
    if (b > 0) { $(document.getElementsByClassName('block')[a + ((b - 1) * 5)]).toggleClass("b1 b2") }
}

function newgame() {
    moves = 0;
    var j = document.getElementsByClassName('b2').length
    for (var i = 0; i < j; i++) {
        $(document.getElementsByClassName('b2')[0]).toggleClass("b1 b2");
    }
    for (var i = 0; i < 14; i++) {
        set(random(0, 4), random(0, 4))
    }
    document.getElementById("moves").innerHTML = "Moves: " + moves;
}

newgame();