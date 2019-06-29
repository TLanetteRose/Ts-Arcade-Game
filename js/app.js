// Thank you
//https://matthewcranford.com/arcade-game-walkthrough-part-6-collisions-win-conditions-and-game-resets/

//Declare modal variables 
const modal = document.querySelector(".game_start");
const overlay = document.querySelector(".overlay");
const btn = document.querySelector(".btn_start");
const modalEnd = document.querySelector(".game_over");
const btnReplay = document.querySelector(".btn_replay");




//Start Game

btn.onclick = function startGame(){
    modal.classList.add("hide");
    overlay.classList.add("hide");
}

//Resets the game
function resetGame(){
    window.location.reload(true);
}

//End Game
btnReplay.onclick = function endGame(){
    modalEnd.style.display = "none";
    resetGame();
}


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
        this.startY = (this.jump * 4) + 55;
        this.x = this.startX;
        this.y = this.startY;
        this.victory = false;
        
    }
    // Draws player on canvas at current x and y position
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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
    update(){
        //Check Collision
        for(let enemy of allEnemies){
            //Compare player and enemy x and y
            if (this.y === enemy.y && (enemy.x + 70 >= this.x && enemy.x - 70 <= this.x)) {
                this.reset();
            }
        }
        //Check for win
        if(this.y === 55){
            this.victory = true;
            modalEnd.style.display = "block"
        }
    }



    //Reset Hero
    reset() {
        // Set x and y to starting x and y
        this.y = this.startY;
        this.x = this.startX;
    }
        
}







 const player = new Hero();
 const allEnemies = [
    new Enemy(-101, 0, 200),
    new Enemy(-101, 83, 300),
    new Enemy((-101 * 2.5), 166, 300),
    new Enemy((-101 * 2.5), 0, 200)
    ];
    
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







