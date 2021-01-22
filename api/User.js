const { Router } = require('express');
const express = require('express');
const router = express.Router();


const User = require('./../models/User');


// password handler 

const bcrypt =  require('bcrypt');


// signup 

router.post('/signup' , (req , res) => {

    let {name , email ,password , dateofBirth } = req.body;
    name = name.trim();
    email = email.trim();
    password =  password.trim();
    dateofBirth =  dateofBirth.trim();


    if( name == "" ||  email == "" ||  password == "" || dateofBirth == "") {

        res.json({

            status : "FAILED",
            message :"Empty Input Fields !"
        });
        
    } else if (!/^[a-zA-Z ]*$/.test(name)) {
       
        res.json({

            status : "FAILED",
            message :"Invalid Name Enter"
        });

    } 
    else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ .test(email)) {
       
        res.json({

            status : "FAILED",
            message :"Invalid Email Enter"
        });

    } 

    else if (!new Date(dateofBirth).getTime) {
       
        res.json({

            status : "FAILED",
            message :"Invalid date of birth  Enter"
        });

    } 

    else if (password.lenght <8 ) {

        res.json({

            status : "FAILED",
            message :"Password is to short"
        });
    }

    else {

        // checking if User already exists or not 

        User.find({email}).then( result => {

            if(result.lenght) {

                // checking email already exists or not
                res.json({

                    status : "FAILED",
                    message :"User with the provided email already exists"
    
                })
            }

            else {
              // if user email doesnot exists in db then we create a user in db

              // password handling

              const saltRounds = 10;
              bcrypt.hash(password , saltRounds).then( hashedpassord =>
                {

                    const newUser = new User ({

                        name,
                        email,
                        password:hashedpassord,
                        dateofBirth
                    }) ; 

                    newUser.save().then( result => {

                        res.json( {

                            status:"Success",
                            message:"Signup Successsfully",
                            data:result,
                        })
                    }) .catch(err => {

                        res.json( {

                            status:"FAILED",
                            message:"An Error Occure While Saving a User Account Please Contach Admin for more information"
                           
                        })
                    })

                }) .catch((err) => {

                    res.json({

                        status : "FAILED",
                        message :"An Error Occur while hashing a password"
        
                    })

                })

            }

        }) .catch( err => {
            res.json({

                status : "FAILED",
                message :"An error Occur while check the extisting User.."

            })
        })
    }

})



// signin


router.post('/signin' , (req , res) => {

    let { email ,password  } = req.body;
   
    email = email.trim();
    password =  password.trim();
   
    if( email == "" ||  password == "") {

        res.json({

            status: "FAILED",
            message: "Empty Input Fields"


        })
    } else {

        User.find({email}).then (data => {

            // error if we enter length
            if(data) {
            

                // user exists

                const hashedPassord = data[0].password;
                bcrypt.compare(password , hashedPassord). then (result => 
                    {
                     if(result) {


                        res.json({

                            status: "Successfully",
                            message: "Signin Successfully"
                
                        })


                     }
                     else {

                        res.json({

                            status: "FAILED",
                            message: "Invalid password"
                
                        })
       
                     }

                    })

                    .catch ( err => {
                        res.json({

                            status: "FAILED",
                            message: "An error occured while comparing  password"
                
                        })
                    })

            }
            else {

                res.json({

                    status: "FAILED",
                    message: "Invalid Credentials Enter"
        
                })
            }
        })

        .catch(err => {


            res.json({

                status: "FAILED",
                message: "An Error occured while checking for existing User"
    
            })

        })
    }


})


module.exports = router;