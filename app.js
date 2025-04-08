const express = require('express');
const app = express();
const path = require('path');

// Serve static files (like images or scripts if needed)
app.use(express.static(path.join(__dirname, 'public')));

// Serve the HTML page at the root
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Ottawa's Visitor Center</title>
      <style>
        body {
          margin: 0;
          overflow: hidden;
          background-color: black;
          font-family: Arial, sans-serif;
          color: white;
          text-align: center;
        }

        h1 {
          position: absolute;
          top: 20%;
          left: 50%;
          transform: translateX(-50%);
          font-size: 4rem;
          z-index: 10;
        }

        canvas {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 0;
        }
      </style>
    </head>
    <body>
      <h1>Let's Go Ottawa</h1>
      <canvas id="fireworksCanvas"></canvas>

      <script>
        const canvas = document.getElementById("fireworksCanvas");
        const ctx = canvas.getContext("2d");

        // Adjust canvas size to fill the window
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particles = [];

        // Firework constructor
        function Firework(x, y) {
          this.x = x;
          this.y = y;
          this.particles = [];
          this.createParticles();
        }

        Firework.prototype.createParticles = function() {
          let colors = ['#FF0000', '#FFFF00', '#00FF00', '#0000FF', '#FF00FF', '#00FFFF'];
          let numberOfParticles = 100;

          for (let i = 0; i < numberOfParticles; i++) {
            let angle = Math.random() * 2 * Math.PI;
            let speed = Math.random() * 6 + 2;
            let life = Math.random() * 2 + 2;
            let particle = {
              x: this.x,
              y: this.y,
              speedX: Math.cos(angle) * speed,
              speedY: Math.sin(angle) * speed,
              color: colors[Math.floor(Math.random() * colors.length)],
              radius: Math.random() * 3 + 1,
              life: life
            };
            this.particles.push(particle);
          }
        };

        // Update firework particles
        function updateParticles() {
          particles.forEach((particle, index) => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.life -= 0.05;
            particle.radius *= 0.98;

            if (particle.life <= 0 || particle.radius <= 0) {
              particles.splice(index, 1);
            }
          });
        }

        // Draw fireworks particles
        function drawParticles() {
          particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
          });
        }

        // Create random fireworks at random positions
        function createFirework() {
          let x = Math.random() * canvas.width;
          let y = Math.random() * canvas.height / 2; // Start fireworks from top half of the screen
          let firework = new Firework(x, y);
          particles = particles.concat(firework.particles);
        }

        // Game loop
        function animate() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          updateParticles();
          drawParticles();

          requestAnimationFrame(animate);
        }

        // Fireworks every 1.5 seconds
        setInterval(createFirework, 1500);

        animate();
      </script>
    </body>
    </html>
  `);
});

// Set up server on port 4001
const port = 4002;
app.listen(port, () => {
  console.log(`Server running on http://0.0.0.0:${port}`);
});
