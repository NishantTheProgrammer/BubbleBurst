const app = new Vue({
    el: '.gameDiv',
    data(){
      return {
          x: 400,
          y: 400,
          angle: 0
      }  
    },
    methods: {
        move(event)
        {
            if(event.key == 'a' || event.key == 'ArrowLeft')
            {
                this.x -= 10;
            }
            else if(event.key == 'd' || event.key == 'ArrowRight')
            {
                this.x += 10;
            }
            else if(event.key == 'w' || event.key == 'ArrowUp')
            {
                this.y -= 10;
            }
            else if(event.key == 's' || event.key == 'ArrowDown')
            {
                this.y += 10;
            }
        },
        rotate(event)
        {
            console.log(event.deltaY);

            if(event.deltaY > 0)
            {
                this.angle += 5;
            }
            else
            {
                this.angle -= 5;
            }
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