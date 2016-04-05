$( document ).ready(function() {

    // game object
    var game = {};

    game.contextBackground = document.getElementById('backgroundCanvas').getContext('2d');
    game.contextPlayer     = document.getElementById('playerCanvas').getContext('2d');
    
    game.contextBackground.fillStyle = "green";
    game.contextBackground.fillRect(100,100,50,50);
    
    game.contextPlayer.fillStyle = "red";
    game.contextPlayer.fillRect(130,130,25,25);

    
    
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

    

    // deals with game logic
    function update(){
        
    };
    
    // renders to screen
    function render(){
        
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