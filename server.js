const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const BUILD_DIR = path.join(__dirname, 'build');

console.log('🚀 Initializing Express server...');
console.log(`📁 Current directory: ${__dirname}`);
console.log(`📦 Build path: ${BUILD_DIR}`);
console.log(`✅ Build directory exists: ${fs.existsSync(BUILD_DIR)}`);

// Check if index.html exists
const indexPath = path.join(BUILD_DIR, 'index.html');
if (!fs.existsSync(indexPath)) {
  console.warn(`⚠️  WARNING: index.html not found at ${indexPath}`);
  console.warn(`📂 Build directory contents: ${fs.existsSync(BUILD_DIR) ? fs.readdirSync(BUILD_DIR).join(', ') : 'BUILD DIR NOT FOUND'}`);
}

// Serve static files from build directory
app.use(express.static(BUILD_DIR, {
  index: false, // Disable default index.html serving, we handle it ourselves
  etag: false
}));

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
  if (!fs.existsSync(indexPath)) {
    console.error(`❌ ERROR: index.html not found at ${indexPath}`);
    return res.status(404).json({ 
      error: 'Frontend build not found. Please ensure npm run build completed successfully.',
      details: {
        buildDir: BUILD_DIR,
        buildDirExists: fs.existsSync(BUILD_DIR),
        indexPath: indexPath
      }
    });
  }
  
  console.log(`📄 Serving index.html for route: ${req.path}`);
  res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate');
  res.sendFile(indexPath);
});

// Error handling
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message,
    path: req.path
  });
});

app.listen(PORT, () => {
  console.log(`✅ Frontend server running on port ${PORT}`);
  console.log(`📍 App available at http://localhost:${PORT}`);
  console.log(`🔗 Health: http://localhost:${PORT}/health`);
});
