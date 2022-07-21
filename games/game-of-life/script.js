var gridSize = 10;

function start() {
    var start = document.getElementById('start')
    start.style.display = 'none'
}

function drawGrid() {
    var grid = document.getElementsByClassName('grid')[0]
    width = window.innerWidth
    height = window.innerHeight
    gridX = Math.ceil(width / gridSize)
    gridY = Math.ceil(height / gridSize)
    for (y = 0; y < gridY; y++) {
        for (x = 0; x < gridX; x++) {
            var square = document.createElement('div')
            square.id = `${x}, ${y}`
            square.classList.add('square')
            square.setAttribute('state', 'dead')
            square.setAttribute('x', x)
            square.setAttribute('y', y)
            square.onclick = e => {
                if (playing) { return }
                if (e.target.attributes['state'].value == 'dead') {
                    e.target.setAttribute('state', 'live')
                } else {
                    e.target.setAttribute('state', 'dead')
                }
            }
            grid.append(square)
        }
    }

    grid.style.gridTemplateColumns = `repeat(${gridX}, ${gridSize}px)`
    grid.style.gridTemplateRows = `repeat(${gridY}, ${gridSize}px)`
}

var playing = false;

function playPause() {
    btn = document.getElementById('playing')
    if (playing) {
        playing = false
        btn.classList.add('play')
        btn.classList.remove('pause')
    } else {
        playing = true
        btn.classList.remove('play')
        btn.classList.add('pause')
        saveGrid()
    }
}

function resetGrid() {
    playing = false
}

function saveGrid() {

}

function clearGrid() {
    playing = false
    squares = document.getElementsByClassName('square')
    for (square of squares) {
        if (square.attributes['state'].value == 'live') {
            square.setAttribute('state', 'dead')
            square.removeAttribute('next-generation')
        }
    }
}

var play = window.setInterval(function() {
    var squares = document.getElementsByClassName('square')
    if (playing) {
        for (square of squares) {
            var x = parseInt(square.attributes['x'].value)
            var y = parseInt(square.attributes['y'].value)
            var state = square.attributes['state'].value

            var neighbors = []
            neighbors.push(document.getElementById(`${x}, ${y-1}`))
            neighbors.push(document.getElementById(`${x}, ${y+1}`))
            neighbors.push(document.getElementById(`${x-1}, ${y}`))
            neighbors.push(document.getElementById(`${x+1}, ${y}`))
            neighbors.push(document.getElementById(`${x-1}, ${y-1}`))
            neighbors.push(document.getElementById(`${x-1}, ${y+1}`))
            neighbors.push(document.getElementById(`${x+1}, ${y-1}`))
            neighbors.push(document.getElementById(`${x+1}, ${y+1}`))

            var liveNeighbors = 0;
            for (neighbor of neighbors) { // get neighbor states
                if (neighbor !== null) { // wall / offscreen
                    if (neighbor.attributes['state'].value == 'live') {
                        liveNeighbors++
                    }
                }
            }

            // square.textContent = liveNeighbors
            // console.log(liveNeighbors)

            if (state == 'live') {
                if (liveNeighbors < 2 || liveNeighbors > 3) {
                    square.setAttribute('next-generation', 'dead')
                } else {
                    square.setAttribute('next-generation', 'live')
                }
            } else if (state == 'dead') {
                if (liveNeighbors == 3) {
                    square.setAttribute('next-generation', 'live')
                } else {
                    square.setAttribute('next-generation', 'dead')
                }
            }
        }
        for (square of squares) { // next generation
            if (square.hasAttribute('next-generation')) {
                square.setAttribute('state', square.attributes['next-generation'].value)
            }
        }
    }
}, 50);