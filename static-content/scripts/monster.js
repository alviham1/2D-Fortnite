class  Monster extends Actor {
	constructor(stage, position, velocity, health, size){
		super(stage, position, velocity, health);
    this.type = "monster";
  }

  reduceHealth() {
    this.health--;
    if (!this.isAlive()){
      if (this.subtype == "purple"){
        var position = this.position;
        this.stage.removeActor(this);
        var shield = new Shield(this, position, new Pair(0, 0), 100);
				this.stage.addActor(shield);
        this.stage.player.score += 1;

      } else if(this.subtype == "green"){
        var position = this.position;
        this.stage.removeActor(this);
        var healthbox = new HealthBox(this, position, new Pair(0, 0), 100);
        this.stage.addActor(healthbox);
        this.stage.player.score += 1;
      } else {
        this.stage.removeActor(this);
        this.stage.player.score += 1;
      }
    } else{
      if (this.health === 6){
        this.fImage.src=this.smallDamageImg;
      } else if (this.health === 3){
        this.fImage.src=this.bigDamageImg;
      }
    }
  }

  step(){
    this.changeDirection(this.stage.player.position.x, this.stage.player.position.y);
    this.headTo(new Pair(this.stage.player.position.x, this.stage.player.position.y));

    var dx=this.position.x+3*this.velocity.x;
    var dy=this.position.y+3*this.velocity.y;
    var newPos = new Pair(dx,dy);
    var collisionActor = this.stage.collisionCheck(this, newPos, this.size);
    if (collisionActor){
      var type = collisionActor.type;
    }

    if (collisionActor){
      if (type == "player"){
				if(this.stage.useshield == false){
					this.stage.player.reduceHealth();
	        if (isOdd(this.stage.player.health)){
	          var zombieBiteSound = new Audio();
	          zombieBiteSound.src = "sounds/zombieBite.mp3";
	          zombieBiteSound.play();
	        }
				}

			} else if (type == "bullet" || type == "weaponOne" || type == "weaponTwo" || type == "ammo" || type == "healbox" || type == "shield" || type == "portal" || type == "water" || type == "circle" || type == "coin"){
               this.position.x = dx;
               this.position.y = dy;
       } else{ 
          this.velocity.x=-this.velocity.x;
          this.velocity.y=-this.velocity.y;
       }

		} else{
      this.position.x = dx;
      this.position.y = dy;
    }

    if(this.position.x<0){
    this.position.x=0;
    this.velocity.x=Math.abs(this.velocity.x);
    }
    if(this.position.x>this.stage.width){
    this.position.x=this.stage.width;
    this.velocity.x=-Math.abs(this.velocity.x);
    }
    if(this.position.y<0){
    this.position.y=0;
    this.velocity.y=Math.abs(this.velocity.y);
    }
    if(this.position.y>this.stage.height){
    this.position.y=this.stage.height;
    this.velocity.y=-Math.abs(this.velocity.y);
    }
    this.intPosition();
    }
}

class  Zombie extends Monster {
	constructor(stage, position, velocity, health, size){
		super(stage, position, velocity, health);
		this.subtype = "green";
		this.fReady = true;
    this.fImage = new Image();

    this.fImage.src="icons/zombie.png";
    this.smallDamageImg = "icons/zombie-crack.png";
    this.bigDamageImg = "icons/zombie-bigcrack.png";
	}
}

class Purple extends Monster {
	constructor(stage, position, velocity, health, size){
		super(stage, position, velocity, health);
		this.subtype = "purple";
		this.fReady = true;
    this.fImage = new Image();
		this.fImage.src="icons/purple.png";
    this.smallDamageImg = "icons/purple-crack.png";
    this.bigDamageImg = "icons/purple-bigcrack.png";
	}
}

class Mini extends Monster {
	constructor(stage, position, velocity, health, size){
		super(stage, position, velocity, health);
		this.subtype = "mini";
		this.fReady = true;
    this.fImage = new Image();
		this.fImage.src="icons/mini.png";
    this.smallDamageImg = "icons/mini-scar.png";
    this.size = new Pair(50, 50);
	}

  reduceHealth() {
    this.health--;
    if (!this.isAlive()){
      var position = this.position;
      this.stage.removeActor(this);
      this.stage.player.score += 1;
      var gold = new Coin(this, position, new Pair(0, 0), 100);
      var gold1 = new Coin(this, new Pair(position.x+5, position.y+5), new Pair(0, 0), 100);
      this.stage.addActor(gold);
      this.stage.addActor(gold1);
    } else{
      if (this.health === 3){
        this.fImage.src=this.smallDamageImg;
      }

    }
  }

}
