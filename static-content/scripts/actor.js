class Actor {
	constructor(stage, position, velocity, health, size){
    this.size = new Pair(100, 100);
		this.stage = stage;
		this.position=position;
		this.intPosition(); 
    this.direction = new Pair(0,0);

		this.velocity = velocity;
		this.health = health;
	}

  reduceHealth() {
    this.health--;
    if (!this.isAlive()){
        this.stage.removeActor(this);
    }
  }


	headTo(position){
		this.velocity.x=(position.x-this.position.x);
		this.velocity.y=(position.y-this.position.y);
		this.velocity.normalize();
	}

  isAlive(){
		if (this.health > 0 || isNaN(this.health)){
			return true;
		}
		return false;
	}

	intPosition(){
		this.x = Math.round(this.position.x);
		this.y = Math.round(this.position.y);
	}

  changeDirection(x, y){
    this.direction.x = x;
    this.direction.y = y;
  }

	step(){
		this.position.x=this.position.x+this.velocity.x;
		this.position.y=this.position.y+this.velocity.y;

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

	draw(context){
    if(this.fReady == true ){
      context.setTransform(1, 0, 0, 1, this.x, this.y);
      context.rotate(Math.atan2(this.direction.y - this.y, this.direction.x - this.x) + Math.PI / 2); 
      context.drawImage(this.fImage, -this.size.x/2, -this.size.y/2, this.size.x, this.size.y);
      context.setTransform(1, 0, 0, 1, 0, 0);
    }
	}
}
