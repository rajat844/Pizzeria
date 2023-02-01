let express = require('express');
let mongodb = require('mongodb');
let cors = require('cors');
bodyParser = require("body-parser");
let server = express();
server.use(cors());
let mongoclient = mongodb.MongoClient;
let uri = "mongodb://127.0.0.1:27017/";
let dbName = "1DECMEAN";
server.use(bodyParser.json());

server.get('/getingredientsdata', (req, res) => {
    console.log("GET INGREDIENTS DATA SERVER !!!!!\n\n");
    mongoclient.connect(uri, (error, conn) => {
        if (error) {
            console.log("Some Error, Connection To MongoDB Database Failed");
            console.log("ERROR = ", error);
        }
        else {
            console.log("Connection to Database Successful");
            let db = conn.db(dbName);
            db.collection('ingredients').find().toArray((err, empsdata) => {
                if (err) {
                    console.log("Some Error, Employees Data Could not be Fetched....");
                    res.json({ message: "Some Problem, Data Could not be retrieved" });

                    console.log("ERROR = ", err);
                }
                else {
                    console.log("ingredients Data Saved Successfully......");
                    res.json(empsdata);
                }
                res.end();
                conn.close();
            });
        }
    });

});

server.get('/getpizzasdata', (req, res) => {
    console.log("GET PIZZA DATA SERVER !!!!!\n\n");
    mongoclient.connect(uri, (error, conn) => {
        if (error) {
            console.log("Some Error, Connection To MongoDB Database Failed");
            console.log("ERROR = ", error);
        }
        else {
            console.log("Connection to Database Successful");
            let db = conn.db(dbName);
            db.collection('pizza').find().toArray((err, empsdata) => {
                if (err) {
                    console.log("Some Error, Employees Data Could not be Fetched....");
                    res.json({ message: "Some Problem, Data Could not be retrieved" });

                    console.log("ERROR = ", err);
                }
                else {
                    console.log("Employee Data Saved Successfully......");
                    res.json(empsdata);
                }
                res.end();
                conn.close();
            });
        }
    });

});

server.post('/getuserdata', (req, res) => {
    console.log("GET USER DATA SERVER !!!!!\n\n");
    let emp = req.body;
    console.log(emp);
    console.log("User Data !!!");
    mongoclient.connect(uri, (error, conn) => {
        if (error) {
            console.log("Some Error, Connection To MongoDB Database Failed");
            console.log("ERROR = ", error);
        }
        else {
            console.log("Connection to Database Successful");
            let db = conn.db(dbName);
            db.collection('user').find({ "uname": emp.uname }).toArray((err, empsdata) => {
                if (err) {
                    console.log("Some Error, Employees Data Could not be Fetched....");
                    res.json({ message: "Some Problem, Data Could not be retrieved" });

                    console.log("ERROR = ", err);
                }
                else {
                    console.log("User Data Fetched Successfully......");
                    if (empsdata.length != 0) {
                        console.log(empsdata);
                        console.log("User Already Exist!!!");
                        res.json({ "message": "User Already Exist!!!" });
                    }
                    else {
                        console.log("No User Found!!!");
                        res.json({ "message": "No User Found!!!" });
                    }
                }
                res.end();
                conn.close();
            });
        }
    });

});


server.post('/getcartpizza', (req, res) => {
    console.log("GET CART PIZZA DATA SERVER !!!!!\n\n");
    let cart = req.body;
    console.log(cart);
    mongoclient.connect(uri, (error, conn) => {
        if (error) {
            console.log("Some Error, Connection To MongoDB Database Failed");
            console.log("ERROR = ", error);
        }
        else {
            console.log("Connection to Database Successful");
            let db = conn.db(dbName);
            db.collection('cart').find({ "username": cart.username, "pizzaid": cart.pizzaid }).toArray((err, empsdata) => {
                if (err) {
                    console.log("Some Error, Cart Data Could not be Fetched....");
                    res.json({ message: "Some Problem, Data Could not be retrieved" });

                    console.log("ERROR = ", err);
                }
                else {
                    console.log("Cart Data Fetched Successfully......");
                    if (empsdata.length != 0) {
                        console.log(empsdata);
                        res.json({ "message": "Cart Already Exist!!!" });
                        console.log("Pizza Already Exist in Cart!!! ");

                    }
                    else {
                        res.json({ "message": "No Pizza Found!!!" });
                        console.log("Pizza Not  Found!!!");

                    }
                }
                res.end();
                conn.close();
            });
        }
    });

});

server.post('/login', async (req, res) => {
    console.log("LOGIN SERVER !!!!!\n\n");
    let emp = req.body;
    console.log(emp);
    console.log("User Data !!!");
    mongoclient.connect(uri, (error, conn) => {
        if (error) {
            console.log("Some Error, Connection To MongoDB Database Failed");
            console.log("ERROR = ", error);
        }
        else {
            console.log("Connection to Database Successful");

            let db = conn.db(dbName);
            db.collection('user').find({ "uname": emp.uname, "upassword": emp.upassword }).toArray((err, empsdata) => {
                if (err) {
                    console.log("Some Error, Employees Data Could not be Fetched....");
                    res.json({ message: "Some Problem, Data Could not be retrieved" });

                    console.log("ERROR = ", err);
                }
                else {
                    console.log("User Data Fetched Successfully......");
                    if (empsdata.length != 0) {
                        console.log(empsdata);
                        console.log("User Already Exist!!!");
                        res.json({ "message": "User Already Exist!!!" });
                    }
                    else {
                        console.log("No User Found!!!");
                        res.json({ "message": "No User Found!!!" });
                    }
                }
                res.end();
                conn.close();
            });
        }
    });

});





server.post('/signup', (req, res) => {
    console.log("SIGN UP SERVER !!!!!\n\n");
    emp = req.body;
    console.log(emp);
    mongoclient.connect(uri, (error, conn) => {
        if (error) {
            console.log("Some Error, Connection Denied!!");
            console.log(error);
        }
        else {
            console.log("Connected!!!!!!");
            let db = conn.db(dbName);
            db.collection("user").insertOne({
                "uname": emp.uname,
                "uemail": emp.uemail,
                "upassword": emp.upassword,
                "upnum": parseInt(emp.upnum),
                "ufname": emp.ufname
            }, (err, ress) => {
                if (err) {
                    console.log("Unable to Insert");
                    console.log(err);
                    res.json({ "message": "Unable to Insert!!!" });
                }
                else {

                    console.log("Inserted Succesfully!!!!");
                    res.json({ "message": "Inserted Succesfully!!!!" });

                }
                conn.close();
                res.end();

            });

        }


    });


});



server.post('/putcartdata', (req, res) => {
    console.log("INSERTING CART DATA SERVER !!!!!\n\n");
    emp = req.body;
    console.log(emp);
    mongoclient.connect(uri, (error, conn) => {
        if (error) {
            console.log("Some Error, Connection Denied!!");
            console.log(error);
        }
        else {
            console.log("Connected!!!!!!");
            let db = conn.db(dbName);
            db.collection("cart").insertOne(emp, (err, ress) => {
                if (err) {
                    console.log("Unable to Insert Cart");
                    console.log(err);
                    res.json({ "message": "Unable to Insert Cart!!!" });
                }
                else {

                    console.log("Inserted CArt Data Succesfully!!!!");
                    res.json({ "message": "Inserted Cart Succesfully!!!!" });
                }
                conn.close();
                res.end();

            });

        }
    });
});




server.post('/updatecartdata', (req, res) => {
    console.log("UPDATE CART DATA  SERVER !!!!!\n\n");
    emp = req.body;
    console.log(emp);
    mongoclient.connect(uri, (error, conn) => {
        if (error) {
            console.log("Some Error, Connection To MongoDB Database Failed");
            console.log("ERROR = ", error);
        }
        else {
            console.log("Connection to Database Successful");
            let db = conn.db(dbName);
            db.collection('cart').updateOne({ username: emp.username, pizzaid: emp.pizzaid }, { $set: { qty: emp.qty } }, (err, cartdata) => {
                if (err) {
                    console.log("Some Error, Cart Data Could not be Upadted....");
                    res.json({ message: "Cart data not updated!!" });

                    console.log("ERROR = ", err);
                }
                else {
                    console.log("Cart Data  Upadted....");
                    res.json({ message: "Cart data updated!!" });
                }
                res.end();
                conn.close();
            }); 
        }
    });


});




server.get('/getusercartdata', (req, res) => {
    console.log("GET USER CART DATA SERVER !!!!!\n\n");
    emp = req.query;
    console.log(emp);
    mongoclient.connect(uri, (error, conn) => {
        if (error) {
            console.log("Some Error, Connection To MongoDB Database Failed");
            console.log("ERROR = ", error);
        }
        else {
            console.log("Connection to Database Successful");
            let db = conn.db(dbName);
            db.collection('cart').find(emp).toArray((err, cartdata) => {
                if (err) {
                    console.log("Some Error, Employees Data Could not be Fetched....");
                    res.json({ message: "Some Problem, Data Could not be retrieved" });
                    console.log("ERROR = ", err);
                }
                else {
                    console.log("User Cart Data Fetched Successfully......");
                    console.log(cartdata);
                    res.json(cartdata);
                }
                res.end();
                conn.close();
            });
        }
    });

});



server.post('/removecartdata', (req, res) => {
    console.log("REMOVE CART DATA SERVER !!!!!\n\n");
    emp = req.body;
    console.log(emp);
    mongoclient.connect(uri, (error, conn) => {
        if (error) {
            console.log("Some Error, Connection To MongoDB Database Failed");
            console.log("ERROR = ", error);
        }
        else {
            console.log("Connection to Database Successful");
            let db = conn.db(dbName);
            db.collection('cart').deleteMany(emp, (err, cartdata) => {
                if (err) {
                    console.log("Some Error, Cart Data Could not Removed....");
                    res.json({ message: "Cart data not removed!!" });

                    console.log("ERROR = ", err);
                }
                else {
                    console.log("Cart Data  Removed....");
                    res.json({ message: "Cart data removed!!" });
                }
                res.end();
                conn.close();
            });
        }
    });

});


server.get('/checkout', (req, res) => {
    console.log("CHECKOUT CART DATA SERVER !!!!!\n\n");
    mongoclient.connect(uri, (error, conn) => {
        if (error) {
            console.log("Some Error, Connection To MongoDB Database Failed");
            console.log("ERROR = ", error);
        }
        else {
            console.log("Connection to Database Successful");
            let db = conn.db(dbName);
            db.collection('cart').deleteMany({}, (err, cartdata) => {
                if (err) {
                    console.log("Some Error, Cart Data Could not Removed....");
                    res.json({ message: "Cart data not Checkouted!!" });

                    console.log("ERROR = ", err);
                }
                else {
                    console.log("Cart Data  Removed....");
                    res.json({ message: "Cart data Checkouted!!" });
                }
                res.end();
                conn.close();
            });
        }
    });

});

server.listen(3100, () => {
    console.log("Express Server Running on Port No 3100....");
});
