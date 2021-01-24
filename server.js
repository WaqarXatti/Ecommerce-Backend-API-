
// excess mongodb file

require('./config/db');

const app = require('express')();
const port = 3000;



const userRouter = require('./api/User');

const prodcutRouter = require('./api/Product');

const warehouseRouter = require('./api/Warehouse');

// for accepting post from data

const bodyParser = require('express').json;
app.use(bodyParser());

app.use('/user' , userRouter)

app.use('/product' , prodcutRouter)

app.use('/warehouse' , warehouseRouter)



app.listen(port , ()  => {
    console.log(`service is running on port ${port}`);
})