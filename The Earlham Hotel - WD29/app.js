// JavaScript source code
//
//const dotenv = require("dotenv")
//dotenv.config()
//const conString = "postgres://postgres:1234@localhost:5432/EarlhamHotel";
//var client = new pg.Client(conString);
//const con = client.connect();
///console.log(con);
//const res = client.query('SELECT * FROM hotelbooking.booking');
const { Client } = require("pg")
const config = require('./Config.js')
const express = require('express');
const json = require("server/reply/json.js");
const app = express();
const port =  3000;
const bodyparser = require('body-parser');
const jsonparser = bodyparser.json();
const fs = require("fs");
const pdfDoc = require("pdfkit");
var nodemailer = require('nodemailer');
const path = require('path');

var roombookingInserted = 0;
var customerInserted=0;
var bookingInserted=0;
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.sendFile('index.html',(err)=>{
        if(err)
        {
            console.log(err);
        }
    })
});
app.get('/booking',(req,res)=>{
    res.sendFile( __dirname + '/public/booking.html',(err)=>{
        if(err)
        {
            console.log(err);
        }
    })
});

//fetch available rooms
app.post('/availablerooms',jsonparser, async (req,res)=>{
    
        try {
            const client = new Client({
                user: config['user'],
                host: config['host'], 
                database: config['database'],
                password: config['password'],
                port: config['port']
            })
            const body = req.body;
            //console.log(req);
            const checkinDate = body.checkin;
            const checkoutDate = body.checkout;
            const preferedRoom = body.preferedRoom;
            const noOfDays = body.noOfDays;
            console.log(noOfDays);
            const noOfAdults = body.noOfAdults;
           // const preferedRoom = body.preferedRoom;
            const con = await client.connect();
            //console.log(body.checkin);
            //console.log(body.checkout);
            //console.log(body.room_preference);
            
            //console.log(con);
            //fetching data from database
            await client.query("SELECT  r_no, r_class from hotelbooking.room WHERE r_no NOT IN (SELECT r_no from hotelbooking.roombooking WHERE checkin = $1 or checkout =$2 ) ",[checkinDate,checkoutDate], (error, result) => {
                //execute the following if error occurs
                if (error) {
                    //console.log("Helllo");
                    console.log(error.stack); // display error message
                }
                //execute the following in case of success
                else {
                    
                    const roomRates = {
                        "std_t":62,
                        "std_d":65,
                        "sup_t":75,
                        "sup_d":77
                    }
                    data = result.rows;
                    console.log(data);
                    count = result.rows.length;
                    let roomsAvailable = {rooms:{

                    }}
                     roomsAvailable['rooms'][preferedRoom] ={
                        'r_no':[],
                        'noOfDays':0,
                        'totalRoomRequired':0,
                        'totalAvailableRooms':0,
                        'baseRate':roomRates[preferedRoom],
                        'is_prefered':1,
                        'checkinDate':checkinDate,
                        'checkoutDate':checkoutDate
                     }
                    for(var room in roomRates)
                    {
                        if(room == preferedRoom)
                        {
                            continue;
                        }
                        else
                        {
                            roomsAvailable['rooms'][room] ={
                                'r_no':[],
                                'noOfDays':0,
                                'totalRoomRequired':0,
                                'totalAvailableRooms':0,
                                'baseRate':roomRates[room],
                                'is_prefered':0,
                                'checkinDate':checkinDate,
                                'checkoutDate':checkoutDate
                        
                             } 
                        }
                    }
                    //console.log(roomsAvailable);
                    //console.log(data[0]);
                    //console.log(count);
                    //console.log(preferedRoom);
                    let roomNos=[];//get all the rooms
                    let roomAltNos = [];
                    //
                    console.log(count);
                    let totalRoomRequired = parseInt(noOfAdults/2);
                    if(noOfAdults%2!=0)
                    {
                        totalRoomRequired = totalRoomRequired + 1;//adding one room for odd number 
                    }
                    /*
                    for(var i=0;i<count;i++)
                    {   console.log(data[i]);
                        if(data[i]['r_class']==preferedRoom)

                        {   //console.log(data[i]['r_class'])
                            //console.log(preferedRoom);
                            //console.log(roomNos);
                            

                            roomNos.push(data[i]['r_no'])
                            
                            
                              
                        }
                    }
                    console.log("here");
                        roomsAvailable['rooms'][preferedRoom]['r_no'] =  roomNos;
                        roomsAvailable['rooms'][preferedRoom]['noOfDays'] =  noOfDays;
                         roomsAvailable['rooms'][preferedRoom]['totalRoomRequired'] =  totalRoomRequired;
                        roomsAvailable['rooms'][preferedRoom]['totalAvailableRooms'] =  roomNos.length;
                        //roomsAvailable['rooms'][preferedRoom]['baseRate'] =  ;
                        console.log(roomNos.length);
                    */
                    //checking if preferred room is available or not
                    /*
                    if(   roomsAvailable['rooms'][preferedRoom]['totalAvailableRooms']==0)
                    {
                        roomsAvailable[preferedRoom] = "Prefered room is not available. Following are the alternative options"
                    }
                    */
                   console.log(data);
                    for(var room in roomRates)
                    {   roomAltNos =[]
                        
                        for(var i=0;i<count;i++)
                        {
                                if (data[i]['r_class']==room)
                                {  
                                roomAltNos.push(data[i]['r_no']);
                                }
                                  
                                

                        }
                        roomsAvailable['rooms'][room]['r_no'] =  roomAltNos;
                        roomsAvailable['rooms'][room]['noOfDays'] =  noOfDays;
                         roomsAvailable['rooms'][room]['totalRoomRequired'] =  totalRoomRequired;
                        roomsAvailable['rooms'][room]['totalAvailableRooms'] =  roomAltNos.length;
                        //roomsAvailable['rooms'][room]['baseRate'] =  roomRates[room];
                     
                    }
                    
                    //console.log(roomsAvailable);

                     client.end()
                     //sessionStorage('roos')
                //console.log(roomsAvailable);
                     res.send(roomsAvailable);
                
                    }
            });
      
            
        } catch (error) {
            console.log(error);
            //res.send("Data fetech");
        }
    
    
    });
    /*
app.post('/showavailablerooms',jsonparser, async (req,res)=>{
    try {
        const client = new Client({
            user: config['user'],
            host: config['host'], 
            database: config['database'],
            password: config['password'],
            port: config['port']
        });
        const con = await client.connect();
        console.log("hello1");
        await client.query("SELECT  * from hotelbooking.rates", (error, result) => {
            //execute the following if error occurs
            if (error) {
                //console.log("Helllo");
                console.log(error.stack); // display error message
            }   
            //execute the following in case of success
            else {
                
                //console.log("Hi");
                data = result.rows;
                count = result.rows.length;
                roomRates = {}
                for(var i=0;i<count;i++)
                    {
                        if(data[i]['r_class']=preferedRoom)
                        {
                            roomsAvailable['rooms'][preferedRoom] =  data[i]['r_no'];
                            break;
                        }
                    }
        }});
    }
    catch (error) {
        console.log(error);
        //res.send("Data fetech");
    }

    
    });
    */
//display avaialble rooms
app.get("/showAvailableRooms",jsonparser, async (req,res)=>{
    
   try
    {
        res.sendFile(__dirname +'/public/roomavailibility.html',(err)=>{
            if(err)
            {
                console.log(err);
            }
        })
    }
    catch(error)
    {
        console.log(error);
    }
    
    
    
});

//update booking records
app.post("/updateRecords",jsonparser, async (req,res)=>{
    
    try {
        const client = new Client({
            user: config['user'],
            host: config['host'], 
            database: config['database'],
            password: config['password'],
            port: config['port']
        })
        const body = req.body;
        //console.log(req);
        const name = body.fullName;
        const email = body.email ;
        const address = body.address;
        let cardType = body.cardType;
        const cardexp = body.cardexp;
        const cardeno = body.cardno;
        const totalCostPaid = body.totalCostPaid;
        const finalRooms = body.finalRooms;
        const checkinDate = body.checkinDate;
        const checkoutDate = body.checkoutDate;
       
        //let finalRooms1 = {};
       // console.log(finalRooms['std_t']);
        for(var room in finalRooms)
        {   var i =0;
            while(i<finalRooms[room].length)
            {
                console.log(finalRooms[room][i]);
                i++;
            }
        }
       // const preferedRoom = body.preferedRoom;
       const max = 99999;
       const min = 10000;
       let randomCno =  Math.floor(Math.random() * (max - min + 1) + min);
       let bookingRefRand =  Math.floor(Math.random() * (max - min + 1) + min);
       let isExistCno = 1;
       let isExistBref =1; 
       const con = await client.connect();
    //console.log(isExistCno);
        //console.log(isExistBref);
        client.query("SELECT  c_no from hotelbooking.customer", (error, result) => {
            //execute the following if error occurs
            if (error) {
                //console.log("Helllo");
                console.log(error.stack); // display error message
                const error={
                    'msg':'Something Went Wrong',
                }
                    res.send(error);
            }

            //execute the following in case of success
            else {
               // console.log(result.rows.length);
                //var i =0;
                while(isExistCno!=0)
                {
                    if(randomCno in result.rows.values())
                    {
                        randomCno = Math.floor(Math.random() * (max - min + 1) + min);
                    }
                    else
                    {
                        isExistCno = 0;
                        break;
                    }
                }
            }
        }
        
            
    );
///console.log('te');
    client.query("SELECT  b_ref from hotelbooking.booking ", (error, result) => {
        //execute the following if error occurs
        if (error) {
            //console.log("Helllo");
            console.log(error.stack);
            const error={
                'msg':'Something Went Wrong',
            }
                res.send(error); // display error message
        }
        //execute the following in case of success
        else {
            //console.log(result.rows.length);
            //console.log(result.rows.length);
           // console.log('te1');
            //var i =0;
            //console.log(bookingRefRand in result.rows.values());
            while(isExistBref!=0)
            {   console.log("here3");
                if(bookingRefRand in result.rows.values())
                {
                    bookingRefRand =  Math.floor(Math.random() * (max - min + 1) + min);
                }
                else
                {
                    isExistBref = 0;
                    break
                }
            }
    
        }
});

//console.log(bookingRefRand);
//console.log(randomCno);
/*
client.query("SELECT  b_ref from hotelbooking.booking ", (error, result) => {
    //execute the following if error occurs
    if (error) {
        //console.log("Helllo");
        console.log(error.stack); // display error message
    }
    //execute the following in case of success
    else {
        //console.log(result.rows.length);
        //console.log(result.rows.length);
       // console.log('te1');
        //var i =0;
        //console.log(bookingRefRand in result.rows.values());
        while(isExistBref!=0)
        {
            if(bookingRefRand in result.rows.values())
            {
                bookingRefRand =  Math.floor(Math.random() * (max - min + 1) + min);
            }
            else
            {
                isExistBref = 0;
                break
            }
        }

    }
});


client.query("SELECT  b_ref from hotelbooking.booking ", (error, result) => {
    //execute the following if error occurs
    if (error) {
        //console.log("Helllo");
        console.log(error.stack); // display error message
    }
    //execute the following in case of success
    else {
        //console.log(result.rows.length);
        //console.log(result.rows.length);
       // console.log('te1');
        //var i =0;
        //console.log(bookingRefRand in result.rows.values());
        while(isExistBref!=0)
        {   console.log("here1");
            if(bookingRefRand in result.rows.values())
            {
                bookingRefRand =  Math.floor(Math.random() * (max - min + 1) + min);
            }
            else
            {
                isExistBref = 0;
                break
            }
        }

    }
});
*/


console.log("here");
if(cardType.toLowerCase()=="visa")
{
    cardType='V';
}
else if (cardType.toLowerCase()=="master card" || cardType.toLowerCase()=="mastercard")
{
    cardType ='MC';
}
else
{
    cardType ='A';
}
let ts = Date.now();

let dateObj = new Date(ts);
let date = dateObj.getDate();
let month = dateObj.getMonth() + 1;
let year = dateObj.getFullYear();

// prints date & time in YYYY-MM-DD format
console.log(year + "-" + month + "-" + date);
let statusBooking = {
    'Name' : name,
    'From':checkinDate,
    'To':checkoutDate,
    'Booking-No': bookingRefRand,
    'PricePaid'    : '£'+totalCostPaid,
    'Booked On': date +"-"+month +"-"+year
}
client.query("INSERT INTO hotelbooking.customer(c_no,c_name,c_email,c_address,c_cardtype,c_cardexp,c_cardno) VALUES ($1, $2, $3, $4, $5, $6, $7); ",[randomCno,name,email,address,cardType,cardexp,cardeno],(error, result) => {
    //execute the following if error occurs
    if (error) {
        //console.log("Helllo");
        console.log(error.stack);
        const error={
            'msg':'Something Went Wrong',
        }
        res.send(error); // display error message
    }
    //execute the following in case of success
    else {
        console.log("here2");
        //console.log(result.rows.length);
        //console.log(result.rows.length);
       // console.log('te1');
        //var i =0;
        //console.log(bookingRefRand in result.rows.values());
        customerInserted=1;
        console.log(customerInserted);
        statusBooking['customerInserted']=1;

    }
});



//var bookingInserted=0;

client.query("INSERT INTO hotelbooking.booking(b_ref,c_no,b_cost,b_outstanding) VALUES ($1, $2, $3, $4); ",[bookingRefRand,randomCno,totalCostPaid,0],(error, result) => {
    //execute the following if error occurs
    if (error) {
        //console.log("Helllo");
        const error={
            'msg':'Something Went Wrong',
        }
        res.send(error);
        console.log(error.stack); // display error message
    }
    //execute the following in case of success
    else {
        //console.log(result.rows.length);
        //console.log(result.rows.length);
       // console.log('te1');
        //var i =0;
        //console.log(bookingRefRand in result.rows.values());
        bookingInserted=1;
        console.log(bookingInserted);
        statusBooking['bookingInserted'] = 1;

    }
});



    

for (var i = 0; i < finalRooms[room].length; i++) {
    client.query('INSERT INTO hotelbooking.roombooking (r_no, b_ref,checkin,checkout) VALUES ($1, $2,$3,$4) ', [finalRooms[room][i], bookingRefRand,checkinDate,checkoutDate], (error, results) => {
    if (error) {
        const error={
            'msg':'Something Went Wrong',
        }
            res.send(error);
      
      roombookingInserted =0;
      console.log(error)
    } else {
      console.log("Rows " + JSON.stringify(results.rows));
      roombookingInserted =1;
      statusBooking['roombookingInserted'] = 1;

    }
   });
        
        //console.log(randomCno);
        //console.log(bookingRefRand);
       
       
     
    }
    res.send(statusBooking);
    
}
     catch(error)
     {
         console.log(error);
     }
     
     
     
 });
//display receipts page
 app.get('/showReceipts',jsonparser, async (req,res)=>{

    try
     {
         res.sendFile(__dirname +'/public/showReceipts.html',(err)=>{
             if(err)
             {
                 console.log(err);
             }
         })
     }
     catch(error)
     {
         console.log(error);
     }
     
     
     
 });
//sendreceipt via mail
 app.post("/downloadReceipt",jsonparser, async (req,res)=>{
try
{

        const body = req.body;
        //console.log(req);
        const name = body.fullName;
        const BookingNo = body.BookingNo ;
        const From = body.From;
        const To = body.To;
        const currentDate = body.currentDate;
        const PricePaid = body.PricePaid;
        const email = body.email;
//const PDFGenerator = require('pdfkit')
//const fs = require('fs')
//console.log(name);
//console.log(BookingNo);
//console.log(From);
//console.log(To);
//console.log(currentDate);
//console.log(PricePaid);

const receipt ={
     booking:
     {
        "Name" : name,
        "Booking No":BookingNo,
        "Checkin Date":From,
        "Checkout Date":To,
        "Date Of Booking":currentDate,
        "Amount Paid":PricePaid,
        "email":email
     }
}

// instantiate the library
let doc = new pdfDoc({ margin: 50 });

doc.image(__dirname +'/public/images/logo.png', 50, 45, { width: 50 })
.fillColor('#444444')
.fontSize(20)
.text('The EarlhamPark Hotel', 50, 100)
.fontSize(10)
.moveDown();
//generateFooter(doc); // Invoke `generateFooter` function.

const booking = receipt.booking;

	doc.text(`Customer Name: ${booking['Name']}`, 50, 200)
		.text(`Booking Number: ${booking['Booking No']}`, 50, 215)
		.text(`Check-In Date: ${booking['Checkin Date']}`, 50, 230)
        .text(`Check-Out Date: ${booking['Checkin Date']}`, 50, 245)
        .text(`Date Of Booking: ${booking['Date Of Booking']}`, 50, 260)
        .text(`Amount Paid: ${booking['Amount Paid']}`, 50, 275)
		.moveDown();

	doc.end();
	doc.pipe(fs.createWriteStream(__dirname +'/public/Receipts/'+BookingNo+'.pdf'));
// pipe to a writable stream which would save the result into the same directory
//theOutput.pipe(fs.createWriteStream(+_dirname +'/public/Receipts/ '+BookingNo+'.pdf'))

// add in a local image and set it to be 250px by 250px
//var data =fs.readFileSync(__dirname +'/public/Receipts/ '+BookingNo+'.pdf');
//console.log(data);
//res.contentType("application/pdf");
//res.send(__dirname +'/public/Receipts/ '+BookingNo+'.pdf');
console.log(email);
console.log(booking);
var transporter = nodemailer.createTransport({
    
   
    service: 'gmail',
    auth: {
      user: 'theearlhamhotel493@gmail.com',
      pass: 'jbdodkcqlciiwisj'
    },
    tls: {
        rejectUnauthorized: false
      }
  });
  
  var mailOptions = {
    from: 'theearlhamhotel493@gmail.com',
    to: email,
    subject: 'Sending Email using Node.js',
    text: 'That was easy!',
    attachments: [
        {
            filename: BookingNo+'.pdf', // <= Here: made sure file name match
            path: path.join(__dirname, '/public/Receipts/'+BookingNo+'.pdf'),                                           
            contentType: 'application/pdf'
        }]
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

res.download(`${__dirname}/public/Receipts/${BookingNo}.pdf`,BookingNo+'.pdf');
  
}
catch
{
    console.log(error);
}
}
 );
//check if reord exist or for editing
app.post("/showeditRooms",jsonparser, async (req,res)=>
{
try {

    const client = new Client({
        user: config['user'],
        host: config['host'], 
        database: config['database'],
        password: config['password'],
        port: config['port']
    })

    const con = await client.connect();
    const body = req.body;
       
        const Bno = body.Bno;
        const email = body.email ;
        var resJson = {
            'Bno':Bno,
            'email':email,
            'msg':'',
            'cno':'',
            'checkin':'',
            'checkout':'',
        }
    await  client.query("SELECT  c_no from hotelbooking.booking where b_ref=$1",[Bno], (error, result) => {
        //execute the following if error occurs
        if (error) {
            //console.log("Helllo");
            console.log(error.stack);
            const error={
                'msg':'Something Went Wrong',
            }
                res.send(error); // display error message
        }
        //execute the following in case of success
        else {
            //console.log(result.rows.length);
            //console.log(result.rows.length);
           // console.log('te1');
            //var i =0;
            //console.log(bookingRefRand in result.rows.values());
           if(result.rows.length==0)
           {
        resJson['msg'] ="Record Does Not Exist!"
            res.send(resJson);
           }
           else
           {
            var c_no = result.rows[0]['c_no'];
            resJson['cno'] = c_no;
          client.query("SELECT c_email from hotelbooking.customer where c_no=$1",[c_no], (error1, result1) => {
                //execute the following if error occurs
                if (error1) {
                    //console.log("Helllo");
                    console.log(error1.stack);
                    const error={
                        'msg':'Something Went Wrong',
                    }
                        res.send(error); // display error message
                }
                //execute the following in case of success
                else {
                    console.log("here2");
                    if(result1.rows.length==0)
                    {
                        resJson['msg'] ="Record Does Not Exist!"
                        //res.send(resJson);
                        res.send(resJson);
                    }
                    else
                    {   
                        client.query("SELECT checkin,checkout from hotelbooking.roombooking where b_ref=$1",[Bno], (error2, result2) => {
                            //execute the following if error occurs
                            if (error2) {
                                //console.log("Helllo");
                                console.log(error1.stack);
                                const error={
                                    'msg':'Something Went Wrong',
                                }
                                    res.send(error); // display error message
                            }
                            else
                            {
                        
                                if(result2.rows.length==0)
                                {
                                    resJson['msg'] ="Record Does Not Exist!"
                        //res.send(resJson);
                            res.send(resJson);
                                }
                                else
                                {   
                                    console.log(result2.rows[0]);
                                    const checkin = result2.rows[0]['checkin'];
                                    const checkInMonth = checkin.getMonth()+1;
                                    const checkInDate = checkin.getDate();
                                    const checkInYear = checkin.getFullYear();
                                    const checkout = result2.rows[0]['checkout'];
                                    console.log(checkin);
                                    const checkoutMonth = checkout.getMonth()+1;
                                    const checkoutDate = checkout.getDate();
                                    const checkoutYear = checkout.getFullYear();
                                    resJson['checkin'] = checkInYear + "-"+checkInMonth+"-"+checkInDate ;
                                    resJson['checkout'] = checkoutYear + "-"+checkoutMonth+"-"+checkoutDate;
                                    //console.log(checkin.getDate()+"-"+checkinMonth+"-"+checkin.getFullYear());
                                    //console.log(result2.rows[0]['checkout']);
                                    
                        resJson['msg'] ="Record Exist!"
                        console.log(resJson);
                        res.send(resJson);
                                }
                        //console.log(resJson);
                    
                            }
                        }
           ); }
                    }
           });
            
           }
           //res.send(resJson);
    
        }
});




} catch (error) {
    console.log(error);
}
});
//end of check if records exists or not

//update email
app.put("/updateEmail",jsonparser,async (req,res)=>
{
try
{
    const client = new Client({
        user: config['user'],
        host: config['host'], 
        database: config['database'],
        password: config['password'],
        port: config['port']
    })
    const con = await client.connect();
    const body = req.body;
    const newEmail = body.newEmail;
    const cno  = body.cno; 
    const resJson ={
        "msg":""
    }
    await  client.query("update hotelbooking.customer SET c_email=$1 where c_no=$2",[newEmail,cno], (error1, result) => {
        //execute the following if error occurs
        if (error1) {
            //console.log("Helllo");
            console.log(error1.stack);
            const error={
                'msg':'Something Went Wrong',
            }
                res.send(error); // display error message
        }
        //execute the following in case of success
        else {
            resJson["msg"] = "Succefully Updated the Email!";
            res.send(resJson);
        }
    });


}
catch(error)
{
    console.log(error);
}

});


app.post("/sendotp",jsonparser, async (req,res)=>
{
try {
    const body = req.body;
    const email = body.email;
    const resJson = {
        'otp':0
    }
    const max = 9999;
    const min = 1000;
    let otp =  Math.floor(Math.random() * (max - min + 1) + min);
    resJson['otp'] = otp;
    var transporter = nodemailer.createTransport({
    
   
        service: 'gmail',
        auth: {
          user: 'theearlhamhotel493@gmail.com',
          pass: 'jbdodkcqlciiwisj'
        },
        tls: {
            rejectUnauthorized: false
          }
      });
      
      var mailOptions = {
        from: 'theearlhamhotel493@gmail.com',
        to: email,
        subject: 'OTP For Verification',
        text: 'Please enter this OTP '+otp,
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });    
    res.send(resJson);
}
catch(error){
    console.log(error);
}
});

app.listen(port,()=>{
    console.log(`My first app ${port}`)
});
/*

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
*/

/*
 * 
 * Inside an async function, you can use the await keyword before a call to a function that returns a promise. This makes the code wait at that point until the promise is settled, at which point the fulfilled value of the promise is treated as a return value, or the rejected value is throwm
 */