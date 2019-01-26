class ParticleSystem {
    constructor(x, y, r, velXMin, velXMax, velYMin, velYMax, parcticlePerUpdateMin, parcticlePerUpdateMax, fadeVelMin, fadeVelMax, startFill) {
        this.x = x;
        this.y = y;
        this.r = r;

        this.velXMin = velXMin;
        this.velXMax = velXMax;
        this.velYMin = velYMin;
        this.velYMax = velYMax;

        this.particles = [];
        this.parcticlePerUpdateMin = parcticlePerUpdateMin;
        this.parcticlePerUpdateMax = parcticlePerUpdateMax;

        this.fadeVelMin = fadeVelMin;
        this.fadeVelMax = fadeVelMax;
        this.startFill = startFill;
    }

    reset() {
        this.particles = [];
    }

    update() {
        for (let i=0; i<this.particles.length; i++) {
            let particle = this.particles[i];
            if (particle.finished()) {
                this.particles.splice(i, 1);
                i--;
            } else {
                particle.update();
            }
        }

        let particleCount = floor(random(this.parcticlePerUpdateMin, this.parcticlePerUpdateMax+1));
        for (let i=0; i<=particleCount; i++) {
            let velX = random(this.velXMin, this.velXMax);
            let velY = random(this.velYMin, this.velYMax);
            let fadeVel = random(this.fadeVelMin, this.fadeVelMax+1);

            this.particles.push(new Particle(this.x, this.y, this.r, velX, velY, this.startFill, fadeVel));
        }
    }

    show() {
        for (let i=0; i<this.particles.length; i++) {
            let particle = this.particles[i]
            particle.show();
        }
    }
}

class Particle {
    constructor(x, y, r, velX, velY, fill, fadeVel) {
        this.x = x;
        this.y = y;
        this.r = r;

        this.velX = velX;
        this.velY = velY;

        this.fill = fill;
        this.a = alpha(this.fill);
        this.fadeVel = fadeVel;

    }

    update() {
        this.a -= this.fadeVel;

        this.x += this.velX;
        this.y += this.velY;
    }

    show() {
        noStroke();
        fill(color(red(this.fill), green(this.fill), blue(this.fill), this.a));
        ellipse(this.x, this.y, 2*this.r);
    }

    finished() {
        return this.a < 0 || this.a > 255;
    }
}
