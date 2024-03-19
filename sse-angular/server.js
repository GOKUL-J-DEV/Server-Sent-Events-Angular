const express = require('express');
const app = express();

// Serve static files from the public directory
app.use(express.static('public'));

// Route for SSE endpoint
app.get('/events', (req, res) => {
  // Set content type to text/event-stream
  res.setHeader('Content-Type', 'text/event-stream');
  // Set Cache-Control to no-cache
  res.setHeader('Cache-Control', 'no-cache');
  // Set Connection to keep-alive
  res.setHeader('Connection', 'keep-alive');

  // Send a message every 3 seconds
  const intervalId = setInterval(() => {
    // Send an event
    res.write(`data: ${JSON.stringify({ message: 'Hello from server!' })}\n\n`);
  }, 3000);

  // When the client closes the connection, stop sending messages
  req.on('close', () => {
    clearInterval(intervalId);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});