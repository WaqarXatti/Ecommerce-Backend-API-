const { Router } = require('express');
const express = require('express');
const router = express.Router();


const User = require('../models/User');


// password handler 

const bcrypt =  require('bcrypt');
const product = require('../models/Warehouse');
const warehouse = require('../models/Warehouse');






// add warehouse

router.post('/addwarehouse' , (req , res) => {

    let {warehousename , warehouselocation  } = req.body;
    warehousename = warehousename.trim();
    warehouselocation =  warehouselocation.trim();


    if( warehousename == "" ||  warehouselocation == "" ) {

        res.json({

            status : "FAILED",
            message :"Empty Input Fields !"
        });
        
    } else if (!/^[a-zA-Z ]*$/.test(warehousename)) {
       
        res.json({

            status : "FAILED",
            message :"Invalid Name Enter"
        });

    } 
     

    

    else if (warehouselocation.lenght <1 ) {

        res.json({

            status : "FAILED",
            message :" warehouse location is to short"
        });
    }

    else {

        // checking if warehouse already exists or not 

        product.find({warehousename}).then( result => {

            if(result.lenght) {

                // checking warehouse  already exists or not
                res.json({

                    status : "FAILED",
                    message :"Warehouse with the provided name already exists"
    
                })
            }

            else {

                      
                    const newWarehouse = new warehouse ({

                        warehousename,
                        warehouselocation,
                     
                    }) ; 

                    newWarehouse.save().then( result => {

                        res.json( {

                            status:"Success",
                            message:"warehouse add Successsfully",
                            data:result,
                        })
                    }) .catch(err => {

                        res.json( {

                            status:"FAILED",
                            message:"An Error Occure While Saving a ware house Please Contach Admin for more information"
                           
                        })
                    })


                }

        }) .catch( err => {
            res.json({

                status : "FAILED",
                message :"An error Occur while check the extisting warehouse.."

            })
        })
    }

})



// get all warehouse

router.get('/', (req , res , next) => {
    warehouse.find()
    .then(result => {
        res.status(200).json({
            warehouseData:result
        });
    })
    
  .catch(err =>{
    console.log(err);
    res.status(500).json({
        warehouseData:result
    })
});
})

// delete a warehouse from the db
router.delete('/addwarehouse/:id', function(req, res, next){
    warehouse.findByIdAndRemove({_id: req.params.id}).then(function(ninja){
        res.send(ninja);
    }).catch(next);
})





module.exports = router;