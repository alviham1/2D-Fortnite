function randint(n) { return Math.round(Math.random()*n); }
function rand(n) { return Math.random()*n; }
function isOdd(n) {
  return Math.abs(n % 2) == 1;
}
class Stage {
	constructor(fg, bg, mini){
    this.fg_ctx = fg.getContext('2d');
    this.bg_ctx = bg.getContext('2d');
    this.canvas = bg;
		this.canvasfg = fg;
		this.map = mini;
		this.map_ctx = mini.getContext('2d');
    this.context = this.bg_ctx;

    this.mouse = new Pair(0,0);

		this.actors=[];
		this.player=null; 
    this.circle=null;
    this.water=null;


		this.width=this.canvas.width;
		this.height=this.canvas.height;

		this.wallclicked = false;
		this.healthclicked = false;
    this.useshield = false;

		var Trees=7;
    var Zombies=1;
    var purpleMonsters=1;
		var weaponOne=1;
		var weaponTwo=1;
		var Ammos=1;
		var Healthbox = 1;
		var Shields = 1;
    var Portals = 1;
    var Circles = 1;
    var Buildings = 3;
    var Waters = 1;
    var MiniZombie = 2;
    var Coins = 1;

    var pos = new Pair(Math.floor(this.width/2), Math.floor(this.height/2));
    var vel = new Pair(0, 0);
    this.addPlayer(new Player(this, pos, vel, 10, 19));


		while(Trees>0 || Zombies>0 || purpleMonsters>0 || weaponOne>0 || Ammos>0 || Healthbox>0 || Shields>0 || Portals>0 || Circles>0 || Buildings>0 || Waters>0 || MiniZombie>0){
	   	var x=Math.floor((Math.random()*this.width));
			var y=Math.floor((Math.random()*this.height));
      var position = new Pair(x,y);
      const size = new Pair(100, 100);


      if (Waters>0){
        var water = new Water(this, this.getEmptyPosition(position, size), new Pair(0, 0), 100);
        this.addActor(water);
        this.water = water;
        Waters--;
      }

      if (Coins>0){
        var coin = new Coin(this, this.getEmptyPosition(position, size), new Pair(0, 0), 100);
        this.addActor(coin);
        Coins--;
      }

      if (Circles>0){
        var circle = new Circle(this, new Pair(this.width/2, this.height/2), new Pair(0, 0), 1600);
        this.addActor(circle);
        this.circle = circle;
        Circles--;
      }

      if (Trees>0){
        var tree = new Tree(this, this.getEmptyPosition(position, size), new Pair(0, 0), 10, 100);
        this.addActor(tree);
        Trees--;
      }

      if (MiniZombie>0){
        var zombo = new Mini(this, this.getEmptyPosition(position, size), new Pair(0.2, 0.2), 5, 50);
        this.addActor(zombo);
        MiniZombie--;
      }

      if (Zombies>0){
        var zombie = new Zombie(this, this.getEmptyPosition(position, size), new Pair(0.2, 0.2), 10, 100);
        this.addActor(zombie);
        Zombies--;
      }
      if (purpleMonsters>0){
        var purplemonster = new Purple(this, this.getEmptyPosition(position, size), new Pair(4, 4), 10, 100);
        this.addActor(purplemonster);
        purpleMonsters--;
      }
			if (weaponOne>0){
        var weapon = new WeaponOne(this, this.getEmptyPosition(position, size), new Pair(0, 0), 100);
        this.addActor(weapon);
        weaponOne--;
      }

			if (weaponTwo>0){
        var weapon = new WeaponTwo(this, this.getEmptyPosition(position, size), new Pair(0, 0), 100);
        this.addActor(weapon);
        weaponTwo--;
      }

			if (Ammos>0){
				var ammo = new Ammo(this, this.getEmptyPosition(position, size), new Pair(0, 0), 100);
				this.addActor(ammo);
				Ammos--;
			}

      if (Portals>0){
				var portal = new Portal(this, this.getEmptyPosition(position, size), new Pair(0, 0), 100);
				this.addActor(portal);
				Portals--;
			}

			if (Shields>0){
				var shield = new Shield(this, this.getEmptyPosition(position, size), new Pair(0, 0), 100);
				this.addActor(shield);
				Shields--;
			}

      if (Buildings == 3){
        var build = new Building(this, new Pair(981, 196), new Pair(0, 0), 10, 200);
        this.addActor(build);
        Buildings--;
      } else if (Buildings == 2){
        var build = new Building(this, new Pair(1168, 196), new Pair(0, 0), 10, 200);
        this.addActor(build);
        Buildings--;
      } else if (Buildings == 1){
        var build = new Building(this, new Pair(1074.6, 121), new Pair(0, 0), 10, 200);
        build.fImage.src = "icons/wall-top.png";
        build.size = new Pair(301,41);
        this.addActor(build);
        Buildings--;
      }

			if (Healthbox>0){
				var healthbox = new HealthBox(this, this.getEmptyPosition(position, size), new Pair(0, 0), 100);
				this.addActor(healthbox);
				Healthbox--;
			}
		}
	}

  getEmptyPosition(position, size){
    for (var i = 0; i < this.actors.length; i++) {
      if (this.collides(position, size, this.actors[i].position, this.actors[i].size)){
        position=new Pair(Math.floor((Math.random()*this.width)), Math.floor((Math.random()*this.height)));
        i = -1;
      }
    }
    return position;
  }

  addWeaponAmmo(type){
		var x=Math.floor((Math.random()*this.width));
		var y=Math.floor((Math.random()*this.height));
		var position = new Pair(x,y);
		const size = new Pair(100, 100);
		if(type == "weaponOne"){
			var weapon = new WeaponOne(this, this.getEmptyPosition(position, size), new Pair(0, 0), 100);
			this.addActor(weapon);
		}else if(type == "weaponTwo"){
			var weapon = new WeaponTwo(this, this.getEmptyPosition(position, size), new Pair(0, 0), 100);
			this.addActor(weapon);
		}else if(type == "ammo") {
			var ammo = new Ammo(this, this.getEmptyPosition(position, size), new Pair(0, 0), 100);
			this.addActor(ammo);
		}
	}

	healPlayer(){
		if(this.healthclicked == true && this.player.healbox > 0){
      var HealSound = new Audio();
      HealSound.src = "sounds/medkit.mp3";
      HealSound.play();

			this.player.health = 10;
			console.log("player healed");
			this.player.healbox--;
		}
		this.healthclicked = false;
	}

  addCat(){
    var x=Math.floor((Math.random()*this.width));
    var y=Math.floor((Math.random()*this.height));
    var position = new Pair(x,y);
    var pet = new Cat(this, this.getEmptyPosition(position, new Pair(50, 50)), new Pair(0.2, 0.2), 100);
    this.addActor(pet);
  }

	wallPlace(x, y){
			if (this.wallclicked == true && this.player.walls>0){
				var pos = new Pair(x, y);
        var wall = new Wall(this, pos, new Pair(0, 0), 5, 100);

        var BuildSound = new Audio();
        BuildSound.src = "sounds/Build.mp3";
        BuildSound.play().then(this.addActor(wall));

				this.player.walls--;
			}
			this.wallclicked = false;
	}

shieldKeep(){
	if (this.useshield == true && this.player.shields>0){
		if(this.player.weapon == null){
			this.player.fImage.src="icons/player-shield.png";
      this.radius = 60;
		} else if (this.player.weapon.type == "weaponTwo"){
			this.player.fImage.src="icons/SplayerScar2.png";
      this.radius = 70;
		} else if (this.player.weapon.type == "weaponOne"){
			this.player.fImage.src="icons/SplayerScar1.png";
      this.radius = 70;
		}
		this.player.shields--;
	}
}

shieldUse(){
			this.shieldKeep();

}
  
shieldDown(){
			this.useshield = false;
			if(this.player.weapon == null){
				this.player.fImage.src="icons/player-regular.png";
        this.radius = 60;
			} else if (this.player.weapon.type == "weaponTwo"){
				this.player.fImage.src="icons/playerScar2.png";
        this.radius = 70;
			} else if (this.player.weapon.type == "weaponOne"){
				this.player.fImage.src="icons/playerScar1.png";
        this.radius = 70;
			}
			console.log("shield is down");
}

	addPlayer(player){
		this.addActor(player);
		this.player=player;
	}

	removePlayer(){
		this.removeActor(this.player);
		this.player=null;
	}

	getActor(x, y){
		for(var i=0;i<this.actors.length;i++){
			if(this.actors[i].x==x && this.actors[i].y==y){
				return this.actors[i];
			}
		}
		return null;
	}

	addActor(actor){
		this.actors.push(actor);
	}

	removeActor(actor){
		var index=this.actors.indexOf(actor);
		if(index!=-1){
			this.actors.splice(index,1);
		}
	}

	controlHealth(){
		document.getElementById("healthbar").src = "icons/health-"+this.player.health+".png";
	}

	ammoCount(){
		var currWeapon = this.player.weapon;
    if (this.player.weapon){
      if (currWeapon.type == "weaponOne"){
        document.getElementById("wonecount").innerHTML = currWeapon.ammo;
      } else if(currWeapon.type == "weaponTwo"){
        document.getElementById("wtwocount").innerHTML = currWeapon.ammo;
      }
    }

	}
	monsterCount(){
		var purple = 0;
		var zombie = 0;
    var mini = 0;
		for (var i = 0; i < this.actors.length; i++) {
			if (this.actors[i].subtype === "green"){
				zombie += 1;
			} else if  (this.actors[i].subtype === "purple"){
				purple += 1;
			}  else if  (this.actors[i].subtype === "mini"){
        mini += 1;
      }
		}
		document.getElementById("purplecount").innerHTML = purple;
		document.getElementById("zombiecount").innerHTML = zombie;
    document.getElementById("minicount").innerHTML = mini;

	}

	wallsCount(){
		var wallsnum = this.player.walls;
		document.getElementById("wallcount").innerHTML = wallsnum;
	}

  scoreCount(){
		var score = this.player.score;
		document.getElementById("scorecount").innerHTML = score;
	}

	healthCount(){
		var healbox = this.player.healbox;
		document.getElementById("healthcount").innerHTML = healbox;
	}

  goldCount(){
    var gold = this.player.gold;
    document.getElementById("goldcount").innerHTML = gold;
  }

	shieldCount(){
		var shield = this.player.shields;
		document.getElementById("shieldcount").innerHTML = shield;
	}

	updateBars(){
		this.monsterCount();
		this.controlHealth();
		this.ammoCount();
		this.wallsCount();
		this.healthCount();
		this.shieldCount();
    this.goldCount();
    this.scoreCount();
	}

  inCircle(){
    return this.player.radius + this.circle.radius >= Math.sqrt((this.player.position.x - this.circle.position.x)**2 + (this.player.position.y - this.circle.position.y)**2);
  }

  inWater(){
    return this.player.radius + this.water.radius-10 >= Math.sqrt((this.player.position.x - this.water.position.x)**2 + (this.player.position.y - this.water.position.y)**2);
  }


  reduceCircle(){
    if (this.circle.radius > 490){
        this.circle.radius -= 1.5;
    }
  }

dropGun(){
  this.player.weapon = null;
  if (this.useshield){
    this.player.fImage.src = "icons/player-shield.png"
    this.player.size = new Pair(120, 120);
  } else {
    this.player.fImage.src = "icons/player-regular.png"
    this.player.size = new Pair(120, 120);
  }
}

  collisionCheck(actor, position, size) {
    var result = false;
    for (var i = 0; i < this.actors.length; i++) {
      if (this.trivial(actor, this.actors[i])) continue; //trivial case, actor==actor or player collide bullet
      if (this.collides(position, size, this.actors[i].position, this.actors[i].size)){
        if (actor.type ==  "bullet"){
          actor.hit(this.actors[i]);
        }

        if (i < this.actors.length){
          return this.actors[i];
        }

      }
    }
    return null;
  }

  collides(posA, sizeA, posB, sizeB)
  {
    if (posA.x <= posB.x + sizeB.x/2 &&
        posA.x + sizeA.x/2 >= posB.x &&
        posA.y <= posB.y + sizeB.y/2 &&
        posA.y + sizeA.y/2 >= posB.y) return true;
  }

  trivial(actorA, actorB){
    if ((actorA === actorB) ||
        ((actorA.type == "bullet") && (actorB.type == "player"))||
        ((actorA.type == "player") && (actorB.type == "bullet"))||
        ((actorA.type == "bullet") && (actorB.type == "bullet"))) return true;
    return false;
  }

	step(){
		for(var i=0;i<this.actors.length;i++){
			this.actors[i].step();
		}
	}

  draw(){
    this.player.intPosition();
    let x = this.player.position.x;
    let y = this.player.position.y;
    let xt = -x+this.width/2;
    let yt = -y+this.height/2;

    this.fg_ctx.resetTransform();
    this.fg_ctx.clearRect(0, 0, this.width, this.height);
    this.bg_ctx.resetTransform();
    this.bg_ctx.clearRect(0, 0, this.width, this.height);

    for(var i=0;i<this.actors.length;i++){
      if (this.actors[i].type == "Obstacle" || this.actors[i].type == "weaponOne" || this.actors[i].type == "weaponTwo" || this.actors[i].type == "ammo" || this.actors[i].type == "wall" ||
			this.actors[i].type =="healbox" || this.actors[i].type =="shield" || this.actors[i].type =="portal" || this.actors[i].type =="water" || this.actors[i].type =="circle" || this.actors[i].type =="coin"
      || this.actors[i].type =="cat"){
        this.actors[i].draw(this.bg_ctx);
      } else {
        this.actors[i].draw(this.fg_ctx);
      }
		}

		var bckg = new Image();
		bckg.src = "icons/bg.png";
		this.map_ctx.drawImage(bckg, 0, 0, 250,150);
		this.map_ctx.drawImage(this.canvasfg, 0, 0, 250, 150);
    this.drawCrossHair(this.mouse.x,this.mouse.y,"black");
  }

  drawCrossHair(x,y,color){
    this.fg_ctx.strokeStyle = color;
    this.fg_ctx.beginPath();
    this.fg_ctx.moveTo(x - 10, y);
    this.fg_ctx.lineTo(x + 10, y);
    this.fg_ctx.moveTo(x, y - 10);
    this.fg_ctx.lineTo(x, y + 10);
    this.fg_ctx.stroke();
  }
}


