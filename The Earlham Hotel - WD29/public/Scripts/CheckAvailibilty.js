// JavaScript source code

//const { Client } = require("pg");
//const dotenv = require("dotenv")
//dotenv.config()
//const conString = "postgres://postgres:1234@localhost:5432/EarlhamHotel";
//var client = new pg.Client(conString);
//const con = client.connect();
///console.log(con);
//const res = client.query('SELECT * FROM hotelbooking.booking');
//import * as pg from 'pg'
const { Client } = require('pg');
const config = require('./Config.js');
const check = async () => {
    try {
        const client = new Client({
            user: config['user'],
            host: config['host'], 
            database: config['database'],
            password: config['password'],
            port: config['port']
        })

        const con = await client.connect();
        const checkinDate = document.getElementById('checkin-date').value
        const checkoutDate = document.getElementById('checkout-date').value
        const preferedRoom = document.getElementById('room-selection').value
        //console.log(con);
        const q = " SELECT  r_no, r_class from hotelbooking.room WHERE r_no NOT IN (SELECT r_no from hotelbooking.roombooking WHERE checkin = '"+checkinDate+"' and checkout = '"+checkoutDate+"') WHERE r_class = '"+preferedRoom+"')";
        await client.query(q, (err, res) => {
            //execute the following if error occurs
            if (err) {
                //console.log("Helllo");
                console.log(err.stack); // display error message
            }
            //execute the following in case of success
            else {
                data = res.rows;
                count = res.rows.length;
               
                console.log(data);
                console.log(count);

                 client.end()
            }
        });
  
        
    } catch (error) {
        console.log(error)
    }
}


/*
const check = async () => {


    console.log("hellp");
}
*/
document.getElementById('check').addEventListener("click", check);



/*
 * 
 * Inside an async function, you can use the await keyword before a call to a function that returns a promise. This makes the code wait at that point until the promise is settled, at which point the fulfilled value of the promise is treated as a return value, or the rejected value is throwm
 */