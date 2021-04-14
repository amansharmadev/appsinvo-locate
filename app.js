require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const PORT = process.env.PORT;

const app = express();
require('./config/database.config');

app.use(morgan('tiny'));
app.use(express.json());
app.use(require('./routes'));


app.listen(PORT, () => console.info(`Server started at http://localhost:${PORT}`));