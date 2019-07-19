const connection = require('../config/connection');

require('dotenv').config();
const axios = require('axios');
const express = require('express');
const router = express.Router();

// var users = require("../models/user.js");
// var favs = require("../models/fav.js");
// var user_favs = require(../models/user_favs.js);


// ================================= BASIC CRUD =================================

// // Create all our routes and set up logic within those routes where required.
// router.get("/", function(req, res) {
//   cat.all(function(data) {
//     var hbsObject = {
//       cats: data
//     };
//     console.log(hbsObject);
//     res.render("index", hbsObject);
//   });
// });

// router.post("/api/cats", function(req, res) {
//   cat.create([
//     "name", "sleepy"
//   ], [
//     req.body.name, req.body.sleepy
//   ], function(result) {
//     // Send back the ID of the new quote
//     res.json({ id: result.insertId });
//   });
// });

// router.put("/api/cats/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   console.log("condition", condition);

//   cat.update({
//     sleepy: req.body.sleepy
//   }, condition, function(result) {
//     if (result.changedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });

// router.delete("/api/cats/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   cat.delete(condition, function(result) {
//     if (result.affectedRows == 0) {
//       // If no rows were changed, then the ID must not exist, so 404
//       return res.status(404).end();
//     } else {
//       res.status(200).end();
//     }
//   });
// });
// ==============================================================================



    // router.post("/places", function (req, res) {
    //     let placeQuery = req.body;
    //     let latitude = placeQuery['location[latitude]'];
    //     let longitude = placeQuery['location[longitude]'];
    //     axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=" + process.env.GPLACES + "&location=" + latitude + ',' + longitude + "&radius=1500&type=university"
    //     ).then(function (response) {
    //         res.json(response.data);
    //     }).catch(function (error) {
    //         console.log(error);
    //     })
    // });

    router.post("/api/places", function (req, res) {
        let placeQuery = req.body;
        let latitude = placeQuery['location[latitude]'];
        let longitude = placeQuery['location[longitude]'];
        axios.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=" + process.env.GPLACES + "&location=" + latitude + ',' + longitude + "&radius=1500&type=university"
        ).then(function (response) {
            res.json(response.data);
        }).catch(function (error) {
            console.log(error);
        })
    });

    router.get("/api/apprenticeship/:place", function (req, res) {
        let place = req.params.place; //ex: Seattle,WA (city and state or just state)
        axios.get("https://api.careeronestop.org/v1/apprenticeshipfinder/" + process.env.COSID + "/" + place + "/25", { headers: { Authorization: "Bearer " + process.env.COSTOKEN } })
            .then(function (response) {
                res.json(response.data);
            }).catch(function (err) {
                console.log(err);
                res.end()
            })
    })

    router.get("/api/certification/:field", function (req, res) {
        let field = req.params.field; //ex: doctors
        console.log("looook HERE", "https://api.careeronestop.org/v1/certificationfinder/" + process.env.COSID + "/" + field, { headers: { Authorization: "Bearer " + process.env.COSTOKEN } });
        axios.get("https://api.careeronestop.org/v1/certificationfinder/" + process.env.COSID + "/" + field + "/0/0/0/0/0/0/0/0/0/10", { headers: { Authorization: "Bearer " + process.env.COSTOKEN } })
            .then(function (response) {
                res.json(response.data);
            })
            .catch(function (err) {
                console.log(err);
            })
    })

    router.get("/api/licenses/:field/:location", function (req, res) {
        let field = req.params.field; //ex: doctors
        let location = req.params.location; //ex: WA (NOT city and state)
        axios.get('https://api.careeronestop.org/v1/license/' + process.env.COSID + '/' + field + '/' + location + '/0/0/0/5?searchMode=literal', { headers: { Authorization: "Bearer " + process.env.COSTOKEN } })
            .then(function (response) {
                res.json(response.data);
            })
            .catch(function (error) {
                console.log(error)
            })
    })

    // router.get("/api/apprenticeship/sponsers/:field/:place", function (req, res) {
    //   let field = req.params.field;
    //   let place = req.params.place;
    //   console.log("https://api.careeronestop.org/v1/apprenticeshipfinder/" + process.env.COSID + "/" + field + "/" + place + "/100")
    //   axios.get("https://api.careeronestop.org/v1/apprenticeshipfinder/" + process.env.COSID + "/" + field + "/" + place + "/100", { headers: { Authorization: "Bearer " + process.env.COSTOKEN } })
    //     .then(function (response) {
    //       res.json(response.data);
    //     }).catch(function(err) {
    //       console.log(err);
    //     })
    // })

    router.post("/api/college", function (req, res) {
        var city = req.body.city;
        var dept = req.body.dept;
        console.log(req.body.city);
        console.log(req.body.dept);

        axios.get("https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=" + process.env.college + "&latest.academics.program.bachelors.computer=1&school.city=" + city + "&_fields=id,school.name,id,school.zip,school.school_url,school.accreditor,latest.admissions.admission_rate.overall"
        ).then(function (response) {


            return res.json(response.data.results);
        }).catch(function (error) {
            console.log(error);
        })
    });

// function checkAuthentication(req, res, next) {
//   const isAuthenticate = req.isAuthenticated();
//   if (isAuthenticate) {
//     return next();
//   }

//   res.status(401).json({
//     message: 'Not authorized',
//     statusCode: 401
//   });
// }

// router.get('/user', checkAuthentication, (req, res) => {
//   connection.query('SELECT * FROM User WHERE id = ?', [req.user.id], (error, data) => {
//     if (error) {
//       return res.status(500).json({
//         message: 'Internal Error',
//         statusCode: 500
//       });
//     }

//     const user = data[0];
//     delete user.password;
//     return res.status(200).json(user);
//   });
// });

module.exports = router;