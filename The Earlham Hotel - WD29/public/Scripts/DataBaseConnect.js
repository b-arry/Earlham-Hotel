// JavaScript source code
const { Client } = require("pg")
//const dotenv = require("dotenv")
//dotenv.config()
//const conString = "postgres://postgres:1234@localhost:5432/EarlhamHotel";
//var client = new pg.Client(conString);
//const con = client.connect();
///console.log(con);
//const res = client.query('SELECT * FROM hotelbooking.booking');

const config = require('./Config.js');
const connectDb = async () => {
    try {
        const client = new Client({
            user: config['user'],
            host: config['host'], 
            database: config['database'],
            password: config['password'],
            port: config['port']
        })

        const con = await client.connect();
        //console.log(con);
        const q = 'SELECT * FROM hotelbooking.booking limit 10';
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
               
                console.log(data[0]['b_ref']);
                 client.end()
            }
        });
  
        
    } catch (error) {
        console.log(error)
    }
}


connectDb()


/*
 * 
 * Inside an async function, you can use the await keyword before a call to a function that returns a promise. This makes the code wait at that point until the promise is settled, at which point the fulfilled value of the promise is treated as a return value, or the rejected value is throwm
 */