// Declaring variables needed for game
//https://matthewcranford.com/arcade-game-walkthrough-part-6-collisions-win-conditions-and-game-resets/



// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.sprite = 'images/enemy-bug.png';
    this.step = 101;
    this.boundary = this.step * 5;
    this.resetPos = -this.step;
    this.x = x;
    this.y = y + 55; //Centering my roach
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
    //If Roach has not passed the boundary
    if (this.x < this.boundary) {
        this.x += this.speed * dt; //Enemy moves at constant speed
    }
    else {
        // Reset Roach position to start
        this.x = this.resetPos;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

//Hero class
class Hero {
    //Constructor for Hero
    constructor() {
        this.sprite = 'images/char-horn-girl.png';
        this.step = 101; //Width of block
        this.jump = 83; //Height of block
        this.startX = this.step * 2;
        this.startY = (this.jump * 5) - 20;
        this.x = this.startX;
        this.y = this.startY;
        
    }
    // Draws player on canvas at current x and y position
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    update() {
        for (let enemy of allEnemies) {
            if (this.y === enemy.y){
            console.log('Same row!');   
            }
           
        }
    }

    //Handle keyboard keys and update player's position
    /* 
    * @param {string} input - Direction to travel
    */

    handleInput(keyPress) {
        switch(keyPress) {
            case 'left': 
                if (this.x > 0) {
                this.x -= this.step;
                } //Sets movement and left boundary
            break;
            case 'up': 
                if (this.y > this.jump) {
                this.y -= this.jump;
                } //Sets movement and top boundary
            break;
            case 'right':
                if (this.x <this.step * 4) {
                this.x += this.step;
                } //Sets movement and right boundary   
            break;
            case 'down': 
                if (this.y < this.jump * 4) {
                    this.y += this.jump;
                } //Sets movement and bottom boundary
            break;
        }
    }


}



 const player = new Hero();
 const roach1 = new Enemy(-101, 0, 200);
 const roach2 = new Enemy(-101, 83, 300);
 const roach3 = new Enemy((-101 * 2.5), 166, 300);
 //const roach4 = new Enemy((-101 * 2.5), 0 200);

 const allEnemies = [];
 allEnemies.push(roach1, roach2, roach3);
 console.log(allEnemies);






// Reset player to original position



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});







