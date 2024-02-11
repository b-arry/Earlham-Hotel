

/* process the returned data */
function onTextReady(res){
    //console.log(text);
    const data = {
        reciptData:res
    }
    
    sessionStorage['receiptData']= JSON.stringify(data);
    //console.log(sessionStorage['receiptData']);
    //console.log("Hello");
    
    window.location.href = "/showReceipts";
 }
 
 /* first callback function */
 function onResponse(response){	
     return response.json();
    
 
    
 }
 
 /* wrap up the data */
 function createData(fullName, email, address,cardType, cardexp,cardno,totalCostPaid,finalRooms,checkinDate,checkoutDate) {
     const data = {
        fullName: fullName,
        email: email,
        address: address,
        cardType:cardType,
        cardexp:cardexp,
        cardno:cardno,
        totalCostPaid:totalCostPaid,
        finalRooms:finalRooms,
        checkinDate:checkinDate,
        checkoutDate:checkoutDate
     };
     return JSON.stringify(data);
 }

 function createData1(fullName, email, address,cardType, cardexp,cardno,totalCostPaid,finalRooms,checkinDate,checkoutDate){
    const data = {
       fullName: fullName,
       email: email,
       address: address,
       cardType:cardType,
       cardexp:cardexp,
       cardno:cardno,
       totalCostPaid:totalCostPaid,
       finalRooms:finalRooms,
       checkinDate:checkinDate,
       checkoutDate:checkoutDate
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
 
 /* process onSubmit event */
 function processSubmit(e) {
     e.preventDefault();
     const finalRooms = {
        'rooms':
        {

        }
     }
     const fullName = document.querySelector('#fname');
     //console.log(checkin.value);
     const email = document.querySelector('#email');
     const address = document.querySelector('#addr');
     const cardType = document.querySelector('#cardType');
     const cardexp = document.querySelector("#expdt");
     const cardno = document.querySelector("#ccnum");
     const roomData =  JSON.parse(sessionStorage['roomsAvailable'])['rooms'];
     const totalCostPaid = sessionStorage['totalPrice'];
     const roomsSelected = JSON.parse(sessionStorage['roomsSelected']);
     sessionStorage['email']= email.value.trim();
     let checkinDate;
     let checkoutDate;
     //console.log(fullName);
     //console.log(email);
     //console.log(address);
     //console.log(cardType);
     //console.log(cardexp);
     //console.log(cardno);
     //console.log(roomData);
     //console.log(totalCostPaid);
     //console.log(roomsSelected);
     //console.log(roomData);
     //console.log(roomsSelected);
     for(var room in roomsSelected)
     {//console.log(roomData[room]);
   if(roomsSelected[room]>=1)
        {
            finalRooms['rooms'][room] = roomData[room]['r_no'].slice(0,roomsSelected[room])
            checkinDate = roomData[room]['checkinDate'];
            checkoutDate = roomData[room]['checkoutDate'];
        }
    
        }

    
   //console.log(finalRooms);
   const data = createData(fullName.value.trim(), email.value.trim(), address.value.trim(),cardType.value.trim(),cardexp.value.trim(),cardno.value.trim(),totalCostPaid,finalRooms['rooms'],checkinDate,checkoutDate);
   const fetchOptions = createOptions(data);
   //console.log(fetchOptions)
     //console.log(noOfDays);

     /*
     const isEdit = sessionStorage['isEdit']
     if(isEdit == 1)
     {
console.log("helloEdit");
fetch('http://localhost:3000/updateExistingRecords' , fetchOptions)
.then(onResponse)
.then(onTextReady)

     }
     else
     {
        console.log("HelloBooking");
        */
    //console.log(roomsSelected);
    
   fetch('http://localhost:3000/updateRecords' , fetchOptions)
   .then(onResponse)
   .then(onTextReady)
    
     //}
     
     
   
 }
 
 const form = document.querySelector('#paymentForm');
 form.addEventListener('submit', processSubmit);
 
 
 