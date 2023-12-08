const app = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0x1099bb,
});

document.body.appendChild(app.view);

let gameStarted = false;
let circlesCleaned = 0;
let gameOver = false;

// Counter text
const counterText = new PIXI.Text(`Circles Cleaned: ${circlesCleaned}`, {
    fontSize: 20,
    fill: 0xFFFFFF,
});
counterText.x = 10;
counterText.y = 10;
app.stage.addChild(counterText);

// Game over screen
const gameOverText = new PIXI.Text('Game Over\n\nPress R to Retry', {
    fontSize: 60,
    fill: 0xFFFFFF,
    align: 'center',
});
gameOverText.anchor.set(0.5);
gameOverText.x = app.screen.width / 2;
gameOverText.y = app.screen.height / 2;
gameOverText.visible = false;
app.stage.addChild(gameOverText);

// Start screen
const startText = new PIXI.Text('Welcome to the Game!\n\nClick or press any key to start', {
    fontSize: 30,
    fill: 0xFFFFFF,
    align: 'center',
});
startText.anchor.set(0.5);
startText.x = app.screen.width / 2;
startText.y = app.screen.height / 2;
app.stage.addChild(startText);

const player = new PIXI.Sprite.from('path/to/your/player/image.png');
player.anchor.set(0.5);
player.x = app.screen.width / 2;
player.y = app.screen.height / 2;
player.interactive = true;
app.stage.addChild(player);

const circles = [];

function createCircle() {
    if (!gameOver) {
        const circle = new PIXI.Graphics();
        circle.beginFill(0x000000);
        circle.drawCircle(0, 0, 5); // Initial radius
        circle.endFill();

        circle.x = Math.random() * app.screen.width;
        circle.y = Math.random() * app.screen.height;

        // Add additional properties for growth and shrink
        circle.growing = true;
        circle.shrinking = false;
        circle.maxSize = 10; // Maximum size before stopping growth
        circle.minSize = 5; // Minimum size before removal
        circle.growthRate = 0.2;
        circle.shrinkRate = 0.1;

        circle.interactive = true;

        // Handle player interaction
        circle.on('pointerover', () => {
            circle.growing = false;
            circle.shrinking = true;
        });

        circle.on('pointerout', () => {
            circle.growing = true;
            circle.shrinking = false;
        });

        app.stage.addChild(circle);
        circles.push(circle);
    }
}

// Create a new circle every 1 second
setInterval(() => {
    if (gameStarted) {
        createCircle();
    }
}, 1000);

app.ticker.add(() => {
    // Update existing circles
    circles.forEach(circle => {
        if (circle.growing && circle.scale.x < circle.maxSize) {
            circle.scale.x += circle.growthRate;
            circle.scale.y += circle.growthRate;
        }

        if (circle.shrinking && circle.scale.x > circle.minSize) {
            circle.scale.x -= circle.shrinkRate;
            circle.scale.y -= circle.shrinkRate;
        } else if (circle.shrinking) {
            // Remove the circle once it's small enough
            app.stage.removeChild(circle);
            circles.splice(circles.indexOf(circle), 1);

            // Update counter
            circlesCleaned += 1;
            counterText.text = `Circles Cleaned: ${circlesCleaned}`;

            // Check for game over condition
            if (circlesCleaned >= 10) {
                gameOver = true;
                gameOverText.text = `Game Over\nCircles Cleaned: ${circlesCleaned}\n\nPress R to Retry`;
                gameOverText.visible = true;
            }
        }
    });

    // Your game logic goes here
    if (!gameOver) {
        // Handle player movement
        player.on('pointermove', (event) => {
            player.x = event.data.global.x;
            player.y = event.data.global.y;
        });
    } else {
        // Retry on 'R' key press
        if (app.keyboard.isKeyDown('KeyR')) {
            // Reset game state
            circles.forEach(circle => app.stage.removeChild(circle));
            circles.length = 0;
            circlesCleaned = 0;
            counterText.text = `Circles Cleaned: ${circlesCleaned}`;
            gameOver = false;
            gameOverText.visible = false;
            startText.visible = true;
            gameStarted = false;
        }
    }
});

// Event listener for starting the game
app.view.addEventListener('click', startGame);
window.addEventListener('keydown', startGame);

function startGame() {
    if (!gameStarted) {
        startText.visible = false;
        gameStarted = true;
    }
}
