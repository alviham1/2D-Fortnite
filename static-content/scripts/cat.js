class Cat extends Actor {
	constructor(stage, position, velocity, range, size){
    super(stage, position, velocity);
		this.type = "cat";
    this.fReady = true;
    this.fImage = new Image();
		this.fImage.src="icons/cat.png";
    this.fImage.onload = function(){
      this.fReady = true;
    }
		this.size = new Pair(50, 50);
 }

 step(){

   var dx=this.position.x+3*this.velocity.x;
   var dy=this.position.y+3*this.velocity.y;
   var newPos = new Pair(dx,dy);
   var collisionActor = this.stage.collisionCheck(this, newPos, this.size);
   if (collisionActor){
     var type = collisionActor.type;
   }

   if (collisionActor){
     if (type == "bullet" || type == "weaponOne" || type == "weaponTwo" || type == "ammo" || type == "healbox" || type == "shield" || type == "portal" || type == "water" || type == "circle" || type == "coin"){
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
   // bounce off the walls
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
