const { Router } = require('express');
const express = require('express');
const router = express.Router();


const User = require('./../models/User');


// password handler 

const bcrypt =  require('bcrypt');
const product = require('../models/Product');






// add product 

router.post('/addproduct' , (req , res) => {

    let {productname , productprice  } = req.body;
    productname = productname.trim();
    productprice =  productprice.trim();


    if( productname == "" ||  productprice == "" ) {

        res.json({

            status : "FAILED",
            message :"Empty Input Fields !"
        });
        
    } else if (!/^[a-zA-Z ]*$/.test(productname)) {
       
        res.json({

            status : "FAILED",
            message :"Invalid Name Enter"
        });

    } 
     

    

    else if (productprice.lenght <1 ) {

        res.json({

            status : "FAILED",
            message :" Price is to short"
        });
    }

    else {

        // checking if Product already exists or not 

        product.find({productname}).then( result => {

            if(result.lenght) {

                // checking product  already exists or not
                res.json({

                    status : "FAILED",
                    message :"Product with the provided name already exists"
    
                })
            }

            else {

                      
                    const newProduct = new product ({

                        productname,
                        productprice,
                     
                    }) ; 

                    newProduct.save().then( result => {

                        res.json( {

                            status:"Success",
                            message:"Product add Successsfully",
                            data:result,
                        })
                    }) .catch(err => {

                        res.json( {

                            status:"FAILED",
                            message:"An Error Occure While Saving a User Account Please Contach Admin for more information"
                           
                        })
                    })


                }

        }) .catch( err => {
            res.json({

                status : "FAILED",
                message :"An error Occur while check the extisting Product.."

            })
        })
    }

})



// get all products

router.get('/', (req , res , next) => {
    product.find()
    .then(result => {
        res.status(200).json({
            productData:result
        });
    })
    
  .catch(err =>{
    console.log(err);
    res.status(500).json({
        productData:result
    })
});
})


// delete product

// delete a warehouse from the db
router.delete('/addproduct/:id', function(req, res, next){
    product.findByIdAndRemove({_id: req.params.id}).then(function(ninja){
        res.send(ninja);
    }).catch(next);
})



module.exports = router;