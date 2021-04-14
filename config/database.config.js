const mongoose = require('mongoose');
const DB_URI = process.env.DB_URI;

mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.info('Database connected'))
.catch(err => process.exit(0))
