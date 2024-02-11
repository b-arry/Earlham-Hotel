const Bno = document.getElementById('Bno');
const email = document.getElementById('email');
var requestType = 0;
var  inputValue ='';
const btn = document.getElementById("editbtn");
let editData = {
    data:{
        'Bno':0,
        'email':"",
        'requestType':0,
        'inputValue':"",
        'checkin':'',
        'checkout':'',
        'cno':'',
    }
}
function onTextReady1(res)
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
function createData1(email) {
    const data = {
       email:email

    };
    return JSON.stringify(data);
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

function onTextReady(res){
    console.log(res.msg);
    
    const h3=document.getElementById("error");
    editData["data"]['checkin'] =     res.checkin;
    editData["data"]['checkout'] =     res.checkout;
    editData["data"]['cno'] =     res.cno;
    editData["data"]['requestType'] = requestType;
    editData["data"]['Bno'] = Bno.value.trim();
    editData["data"]['email'] = email.value.trim();
    editData['data']['inputValue'] = inputValue;
    sessionStorage['isEdit'] = 1;
    sessionStorage['isBooking'] = 0;
    
    if(res.msg === "Record Exist!" && requestType!=3)
    {
        //console.log("here1");
        h3.textContent ="";
        const checkin = res.checkin;
        const checkout =res.checkout;
        const preferedRoom = 'std_t';
        const noOfAdults = inputValue
        let date_1 = new Date(checkin.trim());
        let date_2 = new Date(checkout.trim());
        //console.log(res.checkin);
        //console.log(res.checkout);
        const noOfDays = Math.ceil((date_2 - date_1) / (1000 * 3600 * 24));
        console.log(noOfDays);
        //const data = createData1(checkin.trim(), checkout.trim(), preferedRoom.trim(),noOfAdults,noOfDays);
        const data = createData1(email.value.trim());
        const fetchOptions = createOptions(data);
       
        editData["data"]['inputValue'] =     inputValue;
        sessionStorage['editData']= JSON.stringify(editData);

        
        console.log(sessionStorage['isEdit'] );
        fetch('http://localhost:3000/sendotp' , fetchOptions)
        .then(onResponse)
        .then(onTextReady1)
     

    }
    else if(res.msg === "Record Exist!" && requestType==3)
    {
        editData["data"]['Bno'] = Bno.value.trim();
        editData["data"]['email'] = email.value.trim();
        editData["data"]['requestType'] = requestType;
       sessionStorage['editData']=JSON.stringify( editData);
       const data = createData1(email.value.trim());
        const fetchOptions = createOptions(data);
      
       fetch('http://localhost:3000/sendotp' , fetchOptions)
       .then(onResponse)
       .then(onTextReady1)
    
    }
    else
    {
        
        h3.textContent = "Record Does Not Exist! Please check your Booking No or email!";
        h3.style.color = "Red";
    }
   
    console.log(JSON.parse(sessionStorage['editData']));
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
     //console.log(sessionStorage['roomsAvailable']);
     //console.log("Hello");
     
     window.location.href = "/showAvailableRooms";
     */
 }
 
 /* first callback function */
 function onResponse(response){	
     return response.json();
    
 
    
 }
 
 /* wrap up the data */
 function createData(Bno, email) {
     const data = {
         Bno: Bno,
         email: email
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

function processSubmit(e)
{
    e.preventDefault();
    const Bno = document.getElementById('Bno');
    const email = document.getElementById('email');
    const data = createData(Bno.value.trim(), email.value.trim());
    const fetchOptions = createOptions(data);
    
    console.log("here");
    
    fetch('http://localhost:3000/showeditRooms' , fetchOptions)
   .then(onResponse)
   .then(onTextReady)

}
function editInputText(e)
{
    inputValue = e.target.value;
}

function addInputText(e)
{
    console.log(e.target.value);
    const changeLabel = document.getElementById("changed");
    const changeInput = document.getElementById("changedInput");
    if(e.target.value=="Rooms")
    {
        changeLabel.textContent = "No of Adults";
        changeInput.type = "number";
        changeInput.min = 0;
        changeInput.required= true;
        btn.disabled = false;
        requestType = 1;

    }
    else if(e.target.value=="Email")
    {
        changeLabel.textContent = "Enter New Email";
        changeInput.type = "email";
        changeInput.required= true;
        btn.disabled = false;
        requestType = 2;

    }
    else if(e.target.value=="cancel")
    {
        btn.disabled = false;
        changeLabel.textContent = "";
        changeInput.type = "hidden";
        requestType = 3;
    }
    else if(e.target.value=="Please Select")
    {
        btn.disabled = true;
        changeLabel.textContent = "";
        changeInput.type = "hidden";
        //requestType = 3;
    }
    console.log(requestType);

}





const form = document.querySelector('#availableform');
form.addEventListener('submit', processSubmit);



const inputList = document.getElementById("selectDetail");
inputList.addEventListener('change',addInputText);


const inputText = document.getElementById("changedInput");
inputText.addEventListener('input',editInputText);
