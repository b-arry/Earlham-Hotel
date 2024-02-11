console.log(JSON.parse(sessionStorage['receiptData']));


function onTextReady(res){
    console.log(res);
    var link1 = document.createElement('a');
    link1.href = `/public/Receipts/${res}`;
    link1.download =  res;
    
    link1.dispatchEvent(new MouseEvent('click'));
    console.log("hello");
    /*
    const data = {
        reciptData:res
    }
    
    sessionStorage['receiptData']= JSON.stringify(data);
    //console.log(sessionStorage['roomsAvailable']);
    //console.log("Hello");
    
    window.location.href = "/showReceipts";
    */
 }
 
 /* first callback function */
 function onResponse(response){	
     return response.text();
    
 
    
 }
 
 /* wrap up the data */
 function createData(fullName, BookingNo, From,To,PricePaid,currentDate,email) {
     const data = {
        fullName: fullName,
        BookingNo: BookingNo,
        From: From,
        To:To,
        PricePaid:PricePaid,
        currentDate:currentDate,
        email:email
     };
     return JSON.stringify(data);
 }
 
 /* create send meta data */
 function createOptions(data){
     const fetchOptions ={
         method: 'POST',
         headers:{
             'Accept': 'application/json',
             'Content-Type': 'application/json'
         },
         body: data
     }
     
     return fetchOptions;
 }
 
function loadData()
{
    const receiptData = JSON.parse(sessionStorage['receiptData']);
    const fullName = receiptData['reciptData']['Name'];
    const BookingNo = receiptData['reciptData']['Booking-No'];
    const From = receiptData['reciptData']['From'];
    const To = receiptData['reciptData']['To'];
    const currentDate = receiptData['reciptData']['Booked On'];
    const PricePaid = receiptData['reciptData']['PricePaid'];
    const name= document.getElementById('name');
    const bno= document.getElementById('bno');
    const checkin= document.getElementById('checkin');
    const checkout= document.getElementById('checkout');
    const amt= document.getElementById('amt');
    const bdate = document.getElementById('bdate');
    name.textContent =  fullName;
    bno.textContent = BookingNo;
    checkin.textContent = From;
    checkout.textContent = To;
    amt.textContent = PricePaid;
    bdate.textContent = currentDate;

}
function downloadReceipt()
{
    console.log("here");
   // console.log(sessionStorage['receiptData']);
    const receiptData = JSON.parse(sessionStorage['receiptData']);
    const fullName = receiptData['reciptData']['Name'];
    const BookingNo = receiptData['reciptData']['Booking-No'];
    const From = receiptData['reciptData']['From'];
    const To = receiptData['reciptData']['To'];
    const currentDate = receiptData['reciptData']['Booked On'];
    const PricePaid = receiptData['reciptData']['PricePaid'];
    const email = sessionStorage['email'];
   
    console.log(receiptData['Name']);

    

    const data = createData(fullName, BookingNo, From,To,PricePaid,currentDate,email);
    console.log(data);
    const fetchOptions = createOptions(data);
    //console.log(fetchOptions)
      //console.log(noOfDays);
     fetch('http://localhost:3000/downloadReceipt' , fetchOptions)
     .then(onResponse)
     .then(onTextReady)
}

document.addEventListener("DOMContentLoaded", loadData);
//console.log(JSON.parse(sessionStorage['email']));
const button = document.getElementById('download');
button.addEventListener('click',downloadReceipt);
console.log(JSON.parse(sessionStorage['roomsSelected']));
console.log(JSON.parse(sessionStorage['roomsAvailable'])['rooms']);

