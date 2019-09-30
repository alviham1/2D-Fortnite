stage=null;
view = null;
interval=null;
mouseMoved = false;

var keyW = false; var keyA = false;
var keyS = false; var keyD = false;
var keyE = false;
var id;
function setupGame(){
  var fg = document.getElementById('game-layer');
  var bg = document.getElementById('background-layer');
	var mini = document.getElementById('mini');
	stage=new Stage(fg, bg, mini);

	// https://javascript.info/keyboard-events
  document.addEventListener("keydown", onKeyDown, false);
  document.addEventListener("keyup", onKeyUp, false);
  document.addEventListener("mousemove",mouseEvent);
  document.addEventListener("mouseup",mouseUp);
  document.addEventListener("mousedown",mouseDown);
}



function startGame(){
	id =  window.requestAnimationFrame(function(){ stage.step(), moveByKey(), stage.draw(), stage.updateBars();
		if (!stage.player.isAlive()) {
        keyW = false; keyA = false;
        keyS = false; keyD = false;
				var answer = confirm("Player died. Do you wanna start a new game?");
				if (answer) {
				   setupGame();
				}
				else {
				   pauseGame();
					 console.log("OK BYE!");
					 window.location = "end.html";
				}
		};
    id = window.requestAnimationFrame(startGame);
    })
}


function pauseGame(){
  window.cancelAnimationFrame(id);
}

function moveByKey(){
  dx = 0, dy = 0;
  if (keyD == true) {
    dx += 8;
  }
  if (keyS == true) {
    dy += 8;
  }
  if (keyA == true) {
    dx-= 8;
  }
  if (keyW == true) {
    dy-= 8;
  }
  stage.player.move(dx, dy);
}

function onKeyDown(event) {
  var keyCode = event.keyCode;
  switch (keyCode) {
    case 69: //e
      keyE = true;

      var collisionActor = stage.collisionCheck(stage.player, stage.player.position, stage.player.size);
      if (collisionActor){
        var type = collisionActor.type;
      }

      if (collisionActor){
        if (type == "weaponOne"){
          stage.player.size = new Pair(100, 150);
          stage.player.weapon =  new WeaponOne(stage, stage.player.position, new Pair(0, 0), 100);
          if(stage.useshield == true){
            stage.player.fImage.src="icons/SplayerScar1.png";

          } else{
            stage.player.fImage.src="icons/playerScar1.png";

          }
          stage.player.radius = 70;

          var GunCockSound = new Audio();
          GunCockSound.src = "sounds/Gun_Cocking.mp3";
          GunCockSound.play();

					for (var i = 0; i < stage.actors.length; i++) {
						if (stage.actors[i].type == "weaponOne"){
							stage.removeActor(stage.actors[i]);
              stage.addWeaponAmmo("weaponOne");
						}
					}
        } else if (type == "weaponTwo"){
          stage.player.size = new Pair(100, 150);
          stage.player.weapon =  new WeaponTwo(stage, stage.player.position, new Pair(0, 0), 100);
          if(stage.useshield == true){
            stage.player.fImage.src="icons/SplayerScar2.png";

          } else{
            stage.player.fImage.src="icons/playerScar2.png";

          }
          stage.player.radius = 70;

          var EjectAndReloadSound = new Audio();
          EjectAndReloadSound.src = "sounds/reload.mp3";
          EjectAndReloadSound.play();

					for (var i = 0; i < stage.actors.length; i++) {
						if (stage.actors[i].type === "weaponTwo"){
							stage.removeActor(stage.actors[i]);
              stage.addWeaponAmmo("weaponTwo");

						}
					}
        } else if (type == "ammo" && stage.player.weapon != null){
					 //console.log("picked up ammo");
           stage.player.weapon.ammo += 5;
           if (stage.player.weapon.type == "weaponOne"){
             var GunCockSound = new Audio();
             GunCockSound.src = "sounds/Gun_Cocking.mp3";
             GunCockSound.play();

           } else if (stage.player.weapon.type == "weaponTwo"){
             var EjectAndReloadSound = new Audio();
             EjectAndReloadSound.src = "sounds/reload.mp3";
             EjectAndReloadSound.play();
           }

					 for (var i = 0; i < stage.actors.length; i++) {
						 if (stage.actors[i].type === "ammo" && collisionActor.position === stage.actors[i].position){
							 stage.removeActor(stage.actors[i]);
							 stage.addWeaponAmmo("ammo");
						 }
 					}
        }else if (type == "healbox") {
					for (var i = 0; i < stage.actors.length; i++) {
						if (stage.actors[i].type === "healbox" && collisionActor.position === stage.actors[i].position){
							stage.player.healbox += 1;
							stage.removeActor(stage.actors[i]);
							//stage.addWeaponAmmo("healbox");
						}
				 }
       } else if (type == "shield") {
					for (var i = 0; i < stage.actors.length; i++) {
						if (stage.actors[i].type === "shield" && collisionActor.position === stage.actors[i].position){
							stage.player.shields += 1;
							stage.removeActor(stage.actors[i]);
							//stage.addWeaponAmmo("healbox");
						}
				 }
       } else if (type == "coin") {
 					for (var i = 0; i < stage.actors.length; i++) {
 						if (stage.actors[i].type === "coin" && collisionActor.position === stage.actors[i].position){
 							stage.player.gold += 1;
 							stage.removeActor(stage.actors[i]);
 							//stage.addWeaponAmmo("healbox");
 						}
 				 }
 				}
      }
      break;
    case 68: //d
      keyD = true;
      break;
    case 83: //s
      keyS = true;
      break;
    case 65: //a
      keyA = true;
      break;
    case 87: //w
      keyW = true;
      break;
  }
}

function onKeyUp(event) {
  var keyCode = event.keyCode;

  switch (keyCode) {
    case 69: //e
      keyE = false;
      break;
    case 68: //d
      keyD = false;
      break;
    case 83: //s
      keyS = false;
      break;
    case 65: //a
      keyA = false;
      break;
    case 87: //w
      keyW = false;
      break;
  }
}

function mouseEvent(e) {  // get the mouse coordinates relative to the canvas top left
  var bounds = stage.canvas.getBoundingClientRect();
  stage.mouse.x = e.pageX - bounds.left;
  stage.mouse.y = e.pageY - bounds.top;

  // get mouse canvas coordinate correcting for page scroll
  stage.mouse.x = stage.mouse.x - scrollX;
  stage.mouse.y = stage.mouse.y - scrollY;
  stage.player.changeDirection(stage.mouse.x ,stage.mouse.y);
}

function wallClicked() {
	stage.wallclicked = true;
	console.log("Player clicked a wall");
}

function shieldClicked() {
	stage.useshield = true;
  stage.shieldUse();
	console.log("Player clicked a shield");
}

function shieldOff() {
  setTimeout(stage.shieldDown(), 10000);
}

function beginCircle(){
  stage.reduceCircle();
}

function buyPet(){
  if (stage.player.gold >= 5){
    stage.addCat();
    stage.player.gold -= 5;
  } else {
    console.log("not enough money");
  }
}

function healthClicked() {
  stage.healthclicked = true;
  stage.healPlayer();
  stage.healthclicked = false;
	console.log("Player clicked a heal icon");
}

function noGun() {
  stage.dropGun();
}

function displayInfo() {
    var box = document.getElementById('Settings');
    var icon = document.getElementById("info");


    var span = document.getElementsByClassName("close")[0];

    icon.onclick = function() {
    box.style.display = "block";
    }

    span.onclick = function() {
    box.style.display = "none";
    }

    window.onclick = function(event) {
    if (event.target == box) {
      box.style.display = "none";
    }
    }
}


function extendDir(x1, y1, x2, y2){
  var magnitude=Math.sqrt(Math.pow((x2-x1),2) + Math.pow((y2-y1),2));
  var unitSlopeX = (x2-x1) / magnitude;
  var unitSlopeY = (y2-y1) / magnitude;

  var x = x1 + unitSlopeX * 900;
  var y = y1 + unitSlopeY * 900;
  return [x, y];
}

function mouseDown(e) {

	if(stage.wallclicked == true){
		stage.wallPlace(stage.mouse.x, stage.mouse.y);
		stage.wallclicked = false;
	} else {
  if (stage.player.weapon) {
    if (stage.player.weapon.ammo > 0){
      if (stage.player.weapon.type == "weaponOne"){
        if(stage.useshield == true){
          stage.player.fImage.src="icons/SplayerFire1.png";
          stage.player.radius = 70;
        } else{
          stage.player.fImage.src="icons/playerFire1.png";
          stage.player.radius = 70;
        }
      } else if (stage.player.weapon.type == "weaponTwo"){
        if(stage.useshield == true){
          stage.player.fImage.src="icons/SplayerFire2.png";
          stage.player.radius = 70;
        } else{
          stage.player.fImage.src="icons/playerFire2.png";
          stage.player.radius = 70;
        }
      }


      var velocity = new Pair(15, 15);
      var position = new Pair(stage.player.position.x,stage.player.position.y);
      var range = 300;
      var size = new Pair(45, 100);
      var b = new Bullet(stage, position, velocity, 0, range, size);
      var mousePos = new Pair(stage.mouse.x, stage.mouse.y);

      var l = extendDir(position.x, position.y, mousePos.x, mousePos.y);
      b.changeDirection(l[0], l[1]);
      b.headTo(mousePos);
      stage.player.weapon.shoot(b);
      //stage.addActor(b);
    } else{ //Out of Ammo
       var emptyGunSound = new Audio();
		   emptyGunSound.src = "sounds/gunEmpty.wav";
		   emptyGunSound.play();
    }
  }
 }
}

function mouseUp(e) {
  if (stage.player.weapon){
    var shellDropSound = new Audio();
		shellDropSound.src = "sounds/shellFalls.mp3";
		shellDropSound.play();
    if (stage.player.weapon.type == "weaponOne"){
      if(stage.useshield == true){
        stage.player.fImage.src="icons/SplayerScar1.png";
        stage.player.radius = 70;
      } else{
        stage.player.fImage.src="icons/playerScar1.png";
        stage.player.radius = 70;
      }
    } else if (stage.player.weapon.type == "weaponTwo"){
      if(stage.useshield == true){
        stage.player.fImage.src="icons/SplayerScar2.png";
        stage.player.radius = 70;
      } else{
        stage.player.fImage.src="icons/playerScar2.png";
        stage.player.radius = 70;
      }

    }
  }
}
