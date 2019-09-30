class Obstacle extends Actor {
	constructor(stage, position, velocity, health, size){
		super(stage, position, velocity, health);
    this.type = "Obstacle";
}
}

class Tree extends Obstacle {
	constructor(stage, position, velocity, health, size){
		super(stage, position, velocity, health);
		this.fReady = true;
    this.subtype = "tree";
		this.fImage = new Image();
		this.fImage.onload = function(){
			this.fReady = true;
		}
		this.fImage.src="icons/tree.png";
    }

}
