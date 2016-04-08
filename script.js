$( document ).ready(function() {

    // game object
    var game = {};
    game.width = 550;
    game.height = 600;
    
    // player object
    game.player = {
        x: 150,
        y: 150,
        size: 50,
        speed: 5
    }
    
    // floating stars array
    game.stars = [];

    // buttons array
    game.keys = [];
    $(document).keydown(function(e){
        // how to find out which key
        // alert(e.keyCode);
        game.keys[e.keyCode ? e.keyCode : e.which] = true;
    });
    $(document).keyup(function(e){
        delete game.keys[e.keyCode ? e.keyCode : e.which];
    });

    game.mousex = 0;
    game.mousey = 0;
    // mouse detection
    $(document).mousemove(function(e){
        game.mousex = e.pageX;
        game.mousey = e.pageY;
        console.log("x:" + e.pageX);
        console.log("y:" + e.pageY);
    });

    game.contextBackground = document.getElementById('backgroundCanvas').getContext('2d');
    game.contextPlayer     = document.getElementById('playerCanvas').getContext('2d');
    
    // shim layer with setTimeout fallback
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              window.oRequestAnimationFrame      ||
              window.msRequestAnimationFrame     ||
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
                // running 60 frames per second
              };
    })();

    function addStars(num){
        for(i = 0; i < num; i++){
            game.stars.push({
                x: Math.random() * game.width,
                y: game.height + 10,
                size: Math.random() * 5
            });
        };
    };
    
    // MAYBEMAYBEMABYEMABYE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // finding distance between two points
    function lineDistance( point1, point2 )
    {
      var xs = 0;
      var ys = 0;
 
      xs = point2.x - point1.x;
      xs = xs * xs;
 
      ys = point2.y - point1.y;
      ys = ys * ys;
 
      return Math.sqrt( xs + ys );
    }
    
// MAIN GAME BRAIN
    // deals with game logic
    function update(){
        
        
        // star position
        addStars(1);
        for(i in game.stars){
            if(game.stars[i].y <= -10){
                game.stars.splice(i,1);
            }
            game.stars[i].y--;
        }
        
        if((game.player.x + game.player.size/2) - game.mousex < 0){
            game.player.x += game.player.speed;
        } else if((game.player.x + game.player.size/2) - game.mousex > 0){
            game.player.x -= game.player.speed;
        }
        
        if((game.player.y + game.player.size/2) - game.mousey < 0){
            game.player.y += game.player.speed;
        } else if((game.player.y + game.player.size/2) - game.mousey > 0){
            game.player.y -= game.player.speed;
        }
        
        
        // // player position
//         if(game.keys[37]){
//             // left
//             game.player.x -= 2;
//         } else if(game.keys[39]){
//             // right
//             game.player.x += 2;
//         }
//
//         if(game.keys[38]){
//             // up
//             game.player.y -= 2;
//         } else if(game.keys[40]){
//             // down
//             game.player.y += 2;
//         }
        
    };
    
    // renders to screen
    function render(){
        
        // MAKE SURE TO CLEAR AND SET COLOR FOR EACH ITEM IN BACKGROUNDCONTEXT
        
        
        
        
        // rendering stars
        // SET COLOR FOR EACH OBJECT RENDERED IN CANVAS
        game.contextBackground.clearRect(0,0,game.width,game.height);
        game.contextBackground.fillStyle = '#ffffff';
        for(i in game.stars){
            var star = game.stars[i];
            game.contextBackground.fillRect(star.x, star.y, star.size, star.size);
        }
        
        // rendering player
        game.contextPlayer.clearRect(0,0,game.width,game.height);
        game.contextPlayer.fillStyle = '#ff0000';
        game.contextPlayer.fillRect(game.player.x, game.player.y, game.player.size, game.player.size);
    };

    // looper
    function loop(){
        requestAnimFrame(function(){
            loop();
        });
        update();
        render();
    };
    
    function init(){
        loop();
    };
    
    init();
});