const mongoose = require ('mongoose');
require('dotenv').config();

// to connect 

mongoose
.connect(process.env.MONGODB_URI ,{
    useNewUrlParser: true , 
        useUnifiedTopology : true ,
    })
    .then(() => {
            console.log("DB Connected");
        })
        .catch((err) => console.log(err));
