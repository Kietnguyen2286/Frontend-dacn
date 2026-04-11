const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

console.log('🚀 Initializing Express server...');
console.log(`📁 Current directory: ${__dirname}`);
console.log(`📦 Build path: ${path.join(__dirname, 'build')}`);

// Serve static files from build directory
app.use(express.static(path.join(__dirname, 'build')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'api-ok', timestamp: new Date().toISOString() });
});

// Handle all other requests by serving index.html (for client-side routing)
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, 'build', 'index.html');
  console.log(`📄 Serving index.html from: ${indexPath}`);
  res.sendFile(indexPath);
});

// Error handling
app.use((err, req, res, next) => {
  console.error('❌ Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`✅ Frontend server running on port ${PORT}`);
  console.log(`📍 App available at http://localhost:${PORT}`);
  console.log(`🔗 Health: http://localhost:${PORT}/health`);
});
