$( document ).ready(function() {

    // game object
    var game = {};
    game.width = 800;
    game.height = 600;
    
    // player object
    game.player = {
        x: 150,
        y: 150,
        size: 50,
        vspeed: 5,
        hspeed: 5,
        rot: 0
    }
    
    game.npc = {
        x: 250,
        y: 250,
        size: 20,
        col: 0
    }
    
    
    game.mouse = {
        x: game.player.x + game.player.size/2,
        y: game.player.y + game.player.size/2
    }
    
    // mouse detection
    $(document).mousemove(function(e){
        game.mouse.x = e.pageX;
        game.mouse.y = e.pageY;
        game.player.rot = Math.atan2(game.mouse.y - (game.player.y + game.player.size/2), game.mouse.x - (game.player.x + game.player.size/2));
        console.log(game.player.rot);
        // console.log("x:" + e.pageX);
        // console.log("y:" + e.pageY);
    });
    
    
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

    game.contextBackground = document.getElementById('backgroundCanvas').getContext('2d');
    game.contextPlayer     = document.getElementById('playerCanvas').getContext('2d');
    game.contextNpc        = document.getElementById('npcCanvas').getContext('2d');
    
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
 
      // return Math.sqrt( xs + ys );
      console.log(Math.sqrt( xs + ys ));
    }
    
// MAIN GAME BRAIN
    // deals with game logic
    function update(){
        // FIGURING OUT SLOPE BETWEEN PLAYER AND MOUSE
        x1 = game.player.x + game.player.size/2;
        x2 = game.mouse.x;
        
        y1 = game.player.y + game.player.size/2;
        y2 = game.mouse.y;
        
        vs = (y2 - y1)/17;
        // changing the size of the fraction changes acceleration. higher number, slower moving
        hs = (x2 - x1)/17;

        // MOVES THE PLAYER BASED ON SLOPE TO MOUSE
        game.player.x += hs/2;
        game.player.y += vs/2;
        
        
        
        
        
        // star position
        // addStars(1);
//         for(i in game.stars){
//             if(game.stars[i].y <= -10){
//                 game.stars.splice(i,1);
//             }
//             game.stars[i].y--;
//         }
        
        
        
        
        // player position
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
        
        // KEEPING THE PLAYER ON THE SCREEN
        if(game.player.x > (game.width - game.player.size)){
            game.player.x = game.width - game.player.size;
        } else if (game.player.x < 0){
            game.player.x = 0;
        };
        
        if(game.player.y > (game.height - game.player.size)){
            game.player.y = game.height - game.player.size;
        } else if (game.player.y < 0){
            game.player.y = 0;
        }
        
        if(collision(game.player, game.npc)){
            game.npc.col = 1;
        } else {
            game.npc.col = 0;
        };
    };
    
    // renders to screen
    function render(){
        
        // MAKE SURE TO CLEAR AND SET COLOR FOR EACH ITEM IN BACKGROUNDCONTEXT
        game.contextNpc.clearRect(0,0,game.width,game.height);
        if(game.npc.col == 0){
            game.contextNpc.fillStyle = '#149dca';
        } else {
            game.contextNpc.fillStyle = '#ffff00';
        }
        game.contextNpc.fillRect(game.npc.x, game.npc.y, game.npc.size, game.npc.size);
        
        
        
        // rendering stars
        // SET COLOR FOR EACH OBJECT RENDERED IN CANVAS
        // game.contextBackground.clearRect(0,0,game.width,game.height);
        // game.contextBackground.fillStyle = '#ffffff';
//         for(i in game.stars){
//             var star = game.stars[i];
//             game.contextBackground.fillRect(star.x, star.y, star.size, star.size);
//         }
        
        // rendering player
        game.contextPlayer.clearRect(0,0,game.width,game.height);
        
        // SAVES ORIGINAL ORIENTATION OF CANVAS
        game.contextPlayer.save();
        
        // MOVES THE CONTEXT TO THE CENTER OF THE PLAYER OBJECT
        game.contextPlayer.translate(game.player.x + game.player.size/2, game.player.y + game.player.size/2);
        
        // SETS THE ROTATION IN RADIANS
           // -1.5
    //     -3       0
    //         1.5
        
        // ACTUALLY DOES THE ROTATION
        game.contextPlayer.rotate(game.player.rot);
        
        // DRAWS THE PLAYER OBJECT RELATIVE TO THE NEW CANVAS ORIENTATION
        game.contextPlayer.fillStyle = '#ff0000';
        game.contextPlayer.fillRect((game.player.size/2)*-1, (game.player.size/2)*-1, game.player.size, game.player.size);
        game.contextPlayer.fillStyle = '#ffff00';
        game.contextPlayer.fillRect(game.player.size/2 -5, -2.5, 5, 5);
        
        // RESTORES ORIGINAL CANVAS ORIENTATION
        game.contextPlayer.restore();
        // DRAWING LINE BETWEEN PLAYER AND MOUSE
        // game.contextPlayer.beginPath();
//         game.contextPlayer.moveTo(game.player.x, game.player.y);
//         game.contextPlayer.lineTo(game.mouse.x, game.mouse.y)
//         game.contextPlayer.stroke();
    };
    
    // collision detection
    function collision(first, second){
        return !(first.x > second.x + second.size ||
            first.x + first.size < second.x ||
            first.y > second.y + second.size ||
            first.y + first.size < second.y);
    }
    
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