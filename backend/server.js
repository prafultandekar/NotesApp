const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes'); // ✅ Import auth routes
const noteRoutes = require('./routes/noteRoutes')
 
const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cors());

// ✅ Routes
app.use('/api/auth', authRoutes);

app.use('/api/notes',noteRoutes)

// ✅ MongoDB connection
mongoose.connect(
  'mongodb+srv://prafultandekar10:ZZ39otdhpIUUToPK@cluster0.0kg9sdr.mongodb.net/notesapp?retryWrites=true&w=majority&appName=Cluster0',
  // {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // }
)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Error:', err));

// ✅ Server listener
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
