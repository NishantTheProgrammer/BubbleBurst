const fireSound = new Audio('./sounds/fire.mp3');

const app = new Vue({
    el: '.gameDiv',
    data(){
      return {
          x: 200,
          y: 200,
          angle: 0,
          bullets: []
      }  
    },
    created() {
        setInterval(()=>{
            
            const distance = 40;

            this.bullets.forEach(bullet => {
                bullet.x += -Math.sin((Math.PI / 180) * (bullet.angle + 45)) * distance;
                bullet.y += Math.cos((Math.PI / 180) * (bullet.angle + 45)) * distance;
                
                console.log(`X: ${bullet.x} Y: ${bullet.y}`);
            });
        }, 100)
    },
    methods: {
        move(event)
        {
            let amount = 10;
            if((event.key == 'a' || event.key == 'ArrowLeft') && this.x > 0)
            {
                this.x -= amount;
            }
            else if((event.key == 'd' || event.key == 'ArrowRight') && this.x < 1000 - 100)         // -100 width of the player
            {
                this.x += amount;
            }
            else if((event.key == 'w' || event.key == 'ArrowUp') && this.y > 0)
            {
                this.y -= amount;
            }
            else if((event.key == 's' || event.key == 'ArrowDown') && this.y < 600 - 100)           // -100 width of the player
            {
                this.y += amount;
            }
            else if(event.key == " ")
            {
                this.fire();
            }
        },
        rotate(event)
        {
            console.log(event.deltaY);

            if(event.deltaY > 0)
            {
                this.angle += 10;
                if(this.angle > 360)
                {
                    this.angle = 0;
                }
            }
            else
            {
                this.angle -= 10;
                if(this.angle < 0)
                {
                    this.angle = 360;
                }
            }
        },
        fire()
        {
            this.bullets.push({
                x: this.x + (100/2),         // 100 is height of player 15 is height for bullet
                y: this.y + (100/2),
                angle: this.angle               // because our player is already rotated 45 degree
            });


            fireSound.play();

            console.log(this.bullets);
        }
        
    },
    computed: 
    {
        player()
        {
            return {
                left: this.x + 'px',
                top: this.y + 'px',
                transform: `rotate(${this.angle}deg)`
            }
        }
    },
})

// listening to user input
document.addEventListener("keydown", app.move);
document.addEventListener("wheel", app.rotate);