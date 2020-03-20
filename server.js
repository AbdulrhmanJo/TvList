const express = require('express');
const morgan = require('morgan');


const movies = require('./routes/movies');
const app = express();

app.use(express.json());
app.use(morgan('dev'));

// use moveis route 
app.use('/movies', movies);
 
const PORT = 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`))
