var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

canvas.width = 600
canvas.height = 600

var dino = {
    x: 10,
    y: 200,
    width: 50,
    height: 50,
    draw() {
        ctx.fillStyle = 'green'
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

class Cactus {
    constructor() {
        this.x = 500
        this.y = 200
        this.width = 5
        this.height = 50
    }
    draw() {
        ctx.fillStyle = 'red'
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

var timer = 0
var cactusLists = []
var jumpTimer = 0
var animation


function re() {
    animation = requestAnimationFrame(re)
    timer++

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = 'green'
    ctx.font = '20px serif';
    ctx.fillText(timer, 10, 30);

    if (timer % 100 === 0) {
        var cactus = new Cactus()
        cactus.width = Math.random() * 50
        cactusLists.push(cactus)
    }

    cactusLists.forEach((a, i, o) => {
        // x좌표가 0미만이면 제거
        if (a.x < 0) {
            o.splice(i, 1)
        }
        a.x -= 2

        crash(dino, a)
        
        a.draw()
    })

    if (jumping === true) {
        dino.y -= 3
        jumpTimer++
    }
    if (jumping === false) {
        if (dino.y < 200) { 
            dino.y += 3
        }
    }
    if (jumpTimer > 40) {
        jumping = false
        jumpTimer = 0
    }
    
    dino.draw()
}

re()

function crash(dino, cactus) {
    var x = cactus.x - (dino.x + dino.width)
    var y = cactus.y - (dino.y + dino.height)
    if (x < 0 && y < 0) {
        console.log(dino, cactus)
        cancelAnimationFrame(animation)
    }
}

var jumping = false
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        if (dino.y === 200) {
            jumping = true
        }
    }
})
