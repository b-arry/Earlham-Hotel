
function onTextReady(res)
{
    /*
    const data = {
        rooms:res.rooms
    }
    
    const fetchData = {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    sessionStorage['roomsAvailable']= JSON.stringify(data);
    console.log(JSON.parse(sessionStorage['roomsAvailable']));
    */
   //console.log(res.otp);
   sessionStorage['otp']= res.otp;
   window.location.href = '/otp.html';
}
function onTextReady1(res){
    // console.log();
      const data = {
         rooms:res.rooms
     }
     
     const fetchData = {
         method: 'POST',
         headers:{
             'Accept': 'application/json',
             'Content-Type': 'application/json'
         },
         body: JSON.stringify(data)
     }
     sessionStorage['roomsAvailable']= JSON.stringify(data);
     //console.log(sessionStorage['roomsAvailable']);
     //console.log("Hello");
     
     window.location.href = "/showAvailableRooms";
     
 }
 function onTextReady2(res)
 {
    console.log(res);
 }
 
function onResponse(response)
{
    return response.json();
}

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

//update mail record
function createOptions1(data){
    const fetchOptions ={
        method: 'PUT',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: data
    }
    
    return fetchOptions;
}



function createData(email) {
    const data = {
       email:email

    };
    return JSON.stringify(data);
}
//for adding new Room to existing record
function createData1(checkin, checkout, preferedRoom,noOfAdults, noOfDays) {
    const data = {
        checkin: checkin,
        checkout: checkout,
        preferedRoom: preferedRoom,
        noOfAdults:noOfAdults,
        noOfDays:noOfDays

    };
    return JSON.stringify(data);
}

//for update Email
function createData2(newEmail,cno) {
    const data = {
        newEmail: newEmail,
        cno: cno,
       
    };
    return JSON.stringify(data);
}


//invoke sendotp again
function resendOTP(e)
{   
    const editData = JSON.parse(sessionStorage['editData']);
    console.log(editData["data"]['email']);
    const email =    editData["data"]['email'];

    const data = createData(email.trim());
    const fetchOptions = createOptions(data);
    
    fetch('http://localhost:3000/sendotp' , fetchOptions)
    .then(onResponse)
    .then(onTextReady)
}


function processSubmit(e)
{
    e.preventDefault();
    const correctOtp = sessionStorage['otp'];
    const otpInput = document.getElementById('otp');
    const enteredOtpValue = otpInput.value;
    const errorh4 = document.getElementById('error');
    const editData = JSON.parse(sessionStorage['editData']);
    console.log(sessionStorage['isEdit']);
    console.log(editData['data']['cno']);
    if(correctOtp ==enteredOtpValue )
    {
        errorh4.textContent = "";
       if(sessionStorage['isEdit']==1)
       {
        if(editData["data"]['requestType']==1)
        {
            const checkin = editData['data']['checkin'];
            const checkout = editData['data']['checkout'];
            const preferedRoom = 'std_t';
            const noOfAdults = editData['data']['inputValue'];
            let date_1 = new Date(checkin.trim());
        let date_2 = new Date(checkout.trim());
        const noOfDays = Math.ceil((date_2 - date_1) / (1000 * 3600 * 24));
        const data = createData1(checkin.trim(), checkout.trim(), preferedRoom.trim(),noOfAdults,noOfDays); 
        const fetchOptions = createOptions(data);
        console.log(fetchOptions);
        fetch('http://localhost:3000/availablerooms' , fetchOptions)
    .then(onResponse)
    .then(onTextReady1)
       }
       else if(editData["data"]['requestType']==2)
       {
        const newEmail = editData['data']['inputValue'];
        const data = createData2(newEmail.trim(),editData["data"]['cno'] ); 
        const fetchOptions = createOptions1(data);
        console.log(fetchOptions);
        fetch('http://localhost:3000/updateEmail' , fetchOptions)
        .then(onResponse)
        .then(onTextReady2)
       }
       else if(editData["data"]['requestType']==3)
       {
        
       }
    }

        //console.log("otp Correct");
    }
    else
    {
        errorh4.textContent = "Invalid OTP";
        errorh4.style.color = "red";
        //sessionStorage['isEdit'] = 0;
    }
}


const form = document.querySelector('#otpform');
form.addEventListener('submit', processSubmit);


const resend = document.getElementById('resend');
resend.addEventListener('click',resendOTP);