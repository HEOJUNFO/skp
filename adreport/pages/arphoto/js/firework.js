var canvas = null
var ctx = null

//Const
var FLAT = 0
const FIREWORKS_COUNT = 6
const EXP_COUNT = 15
const AFTERIMG_COUNT = 7
const RADIUS = 2

//Class
class Vector {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    add(b) {
        this.x += b.x
        this.y += b.y
    }
    clone() {
        return new Vector(this.x, this.y)
    }
}

class RGB {
    constructor(r, g, b, a = 1) {
        this.R = r
        this.G = g
        this.B = b
        this.A = a
    }
    toString() {
        return `rgb(${this.R}, ${this.G}, ${this.B}, ${this.A})`
    }
    alpha(value) {
        let A = value
        if (value < 0) {
            A = 0
        }
        return new RGB(this.R, this.G, this.B, A)
    }
}

class Fireworks {
    constructor(pos_x, pos_y, speedH, color = Palette[randint(Palette.length)]) {
        this.start = new Vector(pos_x, pos_y)
        this.color = color

        //Explosion Particle Count
        this.EXP_COUNT = EXP_COUNT

        // 0 : 상승, 1: 터짐
        this.mode = 0

        //Particle
        this.elevator = new Particle(pos_x, pos_y, 0, speedH, this.color)
        this.explosion = []
    }
    draw() {
        if (this.mode === 0) {
            this.elevate()
        } else {
            this.explode()
        }
    }
    elevate() {
        this.elevator.draw()
        this.elevator.move()
        this.elevator.vel.y += 0.04
        if (this.elevator.vel.y > 0) {
            const pos = this.elevator.pos
            for (var i = 0; i < this.EXP_COUNT; i++) {
                this.explosion.push(new Particle(pos.x, pos.y,
                    rand(5.5) * randSym(), rand(5.5) * randSym(), this.color))
            }
            this.mode = 1
        }
    }
    explode() {
        this.explosion.forEach(i => {
            i.vel.y += 0.03
            i.life -= 0.03
            i.draw()
            i.move()
        })
    }
}

class Particle {
    constructor(x, y, vel_x, vel_y, color) {
        this.AFTERIMG_COUNT = AFTERIMG_COUNT

        this.life = 1
        this.pos = new Vector(x, y)
        this.vel = new Vector(vel_x, vel_y)
        this.color = color
        this.afterimg = []
    }
    draw() {
        Circle(this.pos, RADIUS, this.color)
        for (var i = 0; i < this.afterimg.length; i++) {
            let _color = this.color.alpha(i / this.AFTERIMG_COUNT - 1 + this.life)
            Circle(this.afterimg[i], RADIUS, _color)
        }
    }
    move() {
        this.color = this.color.alpha(this.life)

        this.afterimg.push(this.pos.clone())
        this.pos.add(this.vel)
        while (true) {
            if (this.afterimg.length <= this.AFTERIMG_COUNT) {
                break
            }
            this.afterimg.shift()
        }
    }
}

//
const Palette = [
    new RGB(255, 59, 59),
    new RGB(0, 255, 255),
    new RGB(96, 231, 69),
    new RGB(61, 74, 255),
    new RGB(255, 145, 0),

    new RGB(255, 255, 0),
    new RGB(255, 0, 255),
]


//Function
function selectColor(color) {
    ctx.beginPath()
    ctx.fillStyle = color.toString()
    ctx.strokeStyle = color.toString()
}

function Circle(pos, r, color) {
    selectColor(color)
    ctx.arc(pos.x, pos.y, r, 0, Math.PI * 2, false)
    ctx.fill()
}

function randint(n) {
    // 0 ~ (n - 1)
    return Math.floor(Math.random() * n)
}

function rand(n) {
    return Math.random() * n
}

function randSym() {
    if (randint(2) == 0) {
        return 1
    }
    return -1
}

function getSym(n) {
    if (n < 0) {
        return -1
    }
    return +1
}

RenderList = [
]

function makeFireworks(i) {
    let randPos = randint(parseInt(canvas.width * 0.8))
    randPos += randint(canvas.width * 0.1)
    return new Fireworks(randPos,
        FLAT, -rand(2) - 2,Palette[i%Palette.length])
}

function createFireworks(i) {
    RenderList.push(makeFireworks(i))
}



let frame = 0
var renderFire = false;
var createFire = false;
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (RenderList.length < FIREWORKS_COUNT && frame % 30 == 0) {
        createFireworks(RenderList.length)
    }

    renderFire = false;
    for (var i = 0; i < RenderList.length; i++) {
        let count = RenderList[i].explosion.length

        if (RenderList[i].mode != 1) {
            renderFire = true;
            break;
        }

        if (RenderList[i].explosion[count - 1].life > 0) {
            renderFire = true;
            break;
        }
    }

    /*
    for (var i = 0; i < RenderList.length; i++) {
        let count = RenderList[i].explosion.length
        if (RenderList[i].mode == 1) {
            if (RenderList[i].explosion[count - 1].life <= 0) {
                RenderList[i] = makeFireworks()
            }
        }
    }*/

    RenderList.forEach(i => {
        i.draw()
    });

    frame++

    if (renderFire == true)
        requestAnimationFrame(render)
}

function startFire(){
    renderFire = true;
    createFire = true;
    RenderList = [];
    frame = 0;
    resizeCanvas();
    render();
}

function initFire(){
    canvas = document.getElementById("canvas")
    ctx = canvas.getContext("2d")
}

function resizeCanvas(){
    let popup = document.querySelector(".agree-popup.popup .content");

    if(popup == null) return;

    canvas.width = popup.offsetWidth;
    canvas.height = popup.offsetHeight;
    FLAT = canvas.height
}