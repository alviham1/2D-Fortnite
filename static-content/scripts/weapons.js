class WeaponOne extends Actor {
	constructor(stage, position, velocity, range, size){
    super(stage, position, velocity);
		this.type = "weaponOne";
    this.ammo = 5;
    this.fReady = true;
    this.fImage = new Image();
		this.fImage.src="icons/weaponone.png";
    this.fImage.onload = function(){
      this.fReady = true;
    }
		this.size = new Pair(50, 70);
  }

  shoot(bullet){
    var shotSound = new Audio();
		shotSound.src = "sounds/PistolShot.mp3";
		shotSound.play();
    this.stage.addActor(bullet);
    this.ammo--;
  }
}

class WeaponTwo extends Actor {
	constructor(stage, position, velocity, range, size){
    super(stage, position, velocity);
		this.type = "weaponTwo";
    this.ammo = 10;
    this.fReady = true;
    this.fImage = new Image();
		this.fImage.src="icons/weapontwo.png";
    this.fImage.onload = function(){
      this.fReady = true;
    }
		this.size = new Pair(90, 90);
  }

  shoot(bullet){
    var shotSound = new Audio();
		shotSound.src = "sounds/SmgShots.mp3";
		shotSound.play();

    for (var i=0; i <=3; i++){
      this.stage.addActor(bullet);
    }
    this.ammo--;
  }
}


class Bullet extends Actor {
	constructor(stage, position, velocity, health, range, size){
    super(stage, position, velocity, health);
    this.fReady = true;
    this.fImage = new Image();
		this.fImage.src="icons/bullet.png";
    this.fImage.onload = function(){
      this.fReady = true;
    }

    this.type = "bullet";
    this.size = new Pair(30, 150);
    this.range = range
	}

	toString(){
		return this.position.toString() + " " + this.velocity.toString();
	}

	step(){
    this.range -= Math.max(Math.abs(9*this.velocity.x), Math.abs(9*this.velocity.y));
    if (this.range <= 0){
      this.stage.removeActor(this);
    }
    var collisionActor = this.stage.collisionCheck(this, this.position, this.size);
    if (collisionActor){
      var type = collisionActor.type;
    }

    if (!collisionActor){
		  this.position.x=this.position.x+9*this.velocity.x;
		  this.position.y=this.position.y+9*this.velocity.y;
    }

		if(this.position.x<0 || this.position.y<0 || this.position.x>this.stage.width || this.position.y>this.stage.height){
		  this.stage.removeActor(this);
    }
		this.intPosition();
	}

  hit(target){
    this.stage.removeActor(this);
    if(target.type == "Obstacle" && target.subtype == "tree" && target.health == 1){
      this.stage.player.walls += 1;
      target.reduceHealth();
    } else {
      target.reduceHealth();
    }
		if (target.type == "wall"){
			console.log("bullet hit the wall");
			console.log(target.health);
		}
	}

	intPosition(){
		this.x = Math.round(this.position.x);
		this.y = Math.round(this.position.y);
	}
}