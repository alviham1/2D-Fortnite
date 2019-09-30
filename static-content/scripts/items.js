class Ammo extends Actor {
	constructor(stage, position, velocity, range, size){
    super(stage, position, velocity);
		this.type = "ammo";
    this.fReady = true;
    this.fImage = new Image();
		this.fImage.src="icons/bulletsbox.png";
    this.fImage.onload = function(){
      this.fReady = true;
    }
		this.size = new Pair(50, 50);
}
}

class HealthBox extends Actor {
	constructor(stage, position, velocity, range, size){
    super(stage, position, velocity);
		this.type = "healbox";
    this.fReady = true;
    this.fImage = new Image();
		this.fImage.src="icons/health.svg";
    this.fImage.onload = function(){
      this.fReady = true;
    }
		this.size = new Pair(50, 50);
}
}

class Coin extends Actor {
	constructor(stage, position, velocity, range, size){
    super(stage, position, velocity);
		this.type = "coin";
    this.fReady = true;
    this.fImage = new Image();
		this.fImage.src="icons/coins.png";
    this.fImage.onload = function(){
      this.fReady = true;
    }
		this.size = new Pair(50, 50);
}
}


class Portal extends Actor {
	constructor(stage, position, velocity, range, size){
    super(stage, position, velocity);
		this.type = "portal";
    this.fReady = true;
    this.fImage = new Image();
		this.fImage.src="icons/portal.svg";
    this.fImage.onload = function(){
      this.fReady = true;
    }
		this.size = new Pair(80, 80);
}
}

class Shield extends Actor {
	constructor(stage, position, velocity, range, size){
    super(stage, position, velocity);
		this.type = "shield";
    this.fReady = true;
    this.fImage = new Image();
		this.fImage.src="icons/shield.svg";
    this.fImage.onload = function(){
      this.fReady = true;
    }
		this.size = new Pair(50, 50);
}
}

class Wall extends Actor {
	constructor(stage, position, velocity, health, size){
    super(stage, position, velocity, health);
		this.type = "wall";
    this.fReady = true;
    this.fImage = new Image();
		this.fImage.src="icons/wall.svg";
    this.fImage.onload = function(){
      this.fReady = true;
    }
		this.size = new Pair(50, 50);
  }

}


class Water extends Actor {
	constructor(stage, position, velocity, size){
    super(stage, position, velocity);
		this.type = "water";
    this.radius = 100;
    this.fReady = true;
    this.fImage = new Image();
		this.fImage.src="icons/water.png";
    this.fImage.onload = function(){
      this.fReady = true;
    }
		this.size = new Pair(200, 200);
  }

}

class Building extends Actor {
	constructor(stage, position, velocity, health, size){
    super(stage, position, velocity, health);
		this.type = "wall";
    this.fReady = true;
    this.fImage = new Image();
		this.fImage.src="icons/wall-side.png";
    this.fImage.onload = function(){
      this.fReady = true;
    }
		this.size = new Pair(41, 188);
  }
  draw(context){
    if(this.fReady == true ){
      context.setTransform(1, 0, 0, 1, this.x, this.y);
      context.drawImage(this.fImage, -this.size.x/2, -this.size.y/2, this.size.x, this.size.y);
      context.setTransform(1, 0, 0, 1, 0, 0);
    }
  }

}

class Circle extends Actor {
	constructor(stage, position, velocity, size) {
    super(stage, position, velocity);
		this.radius = 800;
    this.type = "circle";
    this.radius = 800;
  }
  draw(context){
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    context.lineWidth = 2;
    context.strokeStyle = "#4B5320";
    context.stroke();
	}
}
