const express = require('express');
const app = express();
const port = 3000;

// Serve static files (in case you want to add any CSS or JS in future)
app.use(express.static('public'));

// Serve the HTML content directly from the server
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome Mahmoud</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: black;
          color: white;
          font-family: Arial, sans-serif;
          text-align: center;
        }
        h1 {
          font-size: 3em;
        }
      </style>
    </head>
    <body>
      <h1>Welcome Mahmoud</h1>

      <!-- Include fireworks.js -->
      <script src="https://cdn.jsdelivr.net/npm/fireworks-js/dist/index.bundle.min.js"></script>
      <script>
        // Initialize Fireworks.js
        const fireworks = new Fireworks.default();
        fireworks.start();
      </script>
    </body>
    </html>
  `);
});

// Start the server and listen on port 3000 (exposing it to all network interfaces)
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running at http://0.0.0.0:${port}`);
});

