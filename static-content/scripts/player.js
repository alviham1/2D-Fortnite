class Player extends Actor {
	constructor(stage, position, velocity, health, size){
		super(stage, position, velocity, health);
    this.weapon = null;
		this.shields = 0;
		this.walls = 5;
    this.score = 0;
		this.healbox = 0;
    this.gold = 4;
    this.type = "player";
    this.size = new Pair(120, 120);
    this.radius = 60;
		this.fReady = true;
		this.fImage = new Image();
		this.fImage.onload = function(){
			this.fReady = true;
		}
    this.fImage.src="icons/player-regular.png";
	}

  addHealth(amount) {
    this.health+= amount;
  }

  move(posX, posY){
    if (this.stage.inWater()){
      if (posX > 0){
        posX -= 6;
      } else if (posX < 0) {
        posX += 6;
      } else if (posY < 0) {
        posY += 6;
      } else if (posY > 0) {
        posY -= 6;
      }
      var dx = this.position.x + (posX);
  		var dy = this.position.y + (posY);
    } else {
      var dx = this.position.x + posX;
  		var dy = this.position.y + posY;
    }
    var newPos = new Pair(dx, dy);
    var insideCircle = this.stage.inCircle();
    if(insideCircle){
      console.log("Inside circle");
    } else {
      this.reduceHealth();
      console.log("reducing health");
    }
    var collisionActor = this.stage.collisionCheck(this, newPos, this.size);
    if (collisionActor){
      var type = collisionActor.type;
    }
    if (!collisionActor || type == "weaponOne" || type == "weaponTwo" || type == "ammo" || type == "healbox" || type == "shield" || type =="circle" || type =="water" || type =="coin"){

        if (0<=dx && dx<=this.stage.width){
          this.position.x += posX;
        }
        if (0<=dy && dy<=this.stage.height){
          this.position.y += posY;
        }

    }
    if (type == "portal") {
         var x=Math.floor((Math.random()*this.width));
         var y=Math.floor((Math.random()*this.height));
         var position = new Pair(this.stage.width/2,this.stage.height/2);
         this.stage.player.position = position;
    }
    this.intPosition();
	}
}
// ------------------------------------------------------------------------------------ End Class Player

