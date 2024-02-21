const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 4000;
const mongoose = require('mongoose');
require('dotenv').config();
const UserRoutes = require('./Routes/UserRoutes')

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/auth', UserRoutes);


// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log('MongoDB connected!');
}).catch((err) => console.log(err)  );






// app.get('/', (req, res) => {
//     res.send('chat home page');
// });


app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}!`);
});