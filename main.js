var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')

var timer = 0
var cactusLists = []
var jumpTimer = 0
var animation

canvas.width = 600
canvas.height = 250

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

class End {
    constructor() {
        this.m1 = '당신은 우끼끼 티어'
        this.m2 = '당신은 애니멀 티어'
        this.m3 = '당신은 킹 티어'
        this.m4 = '당신은 갓 티어'
    }
    draw() {
        var m = ''
        if (timer < 1000) m = this.m1
        else if (timer < 1500) m = this.m2
        else if (timer < 2000) m = this.m3
        else m = this.m4
        ctx.fillStyle = 'brown'
        ctx.font = '40px serif';
        var message = `${timer}점 ${m}`
        ctx.fillText(message, 60, 90);
    }
}

function re() {
    animation = requestAnimationFrame(re)
    timer++

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = 'green'
    ctx.font = '20px serif';
    ctx.fillText(timer, 10, 30);

    if (timer % 70 === 0) {
        var cactus = new Cactus()
        cactus.width = Math.random() * 50
        cactusLists.push(cactus)
    }

    cactusLists.forEach((a, i, o) => {
        if (a.x < 0) {
            o.splice(i, 1)
        }
        a.x -= 3

        crash(dino, a)
        
        a.draw()
    })

    if (jumping === true) {
        dino.y -= 4
        jumpTimer++
    }
    if (jumping === false) {
        if (dino.y < 200) { 
            dino.y += 4
        }
    }
    if (jumpTimer > 30) {
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
        var end = new End()
        end.draw()
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
