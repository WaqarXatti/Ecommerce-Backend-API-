
// excess mongodb file

require('./config/db');

const app = require('express')();
const port = 3000;



const userRouter = require('./api/User');

// for accepting post from data

const bodyParser = require('express').json;
app.use(bodyParser());

app.use('/user' , userRouter)

app.listen(port , ()  => {
    console.log(`service is running on port ${port}`);
})