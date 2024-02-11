

/* process the returned data */
function onTextReady(res){
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

/* first callback function */
function onResponse(response){	
	return response.json();
   

   
}

/* wrap up the data */
function createData(checkin, checkout, preferedRoom,noOfAdults, noOfDays) {
    const data = {
        checkin: checkin,
        checkout: checkout,
        preferedRoom: preferedRoom,
        noOfAdults:noOfAdults,
        noOfDays:noOfDays

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
    const checkin = document.querySelector('#checkindate');
    //console.log(checkin.value);
    const checkout = document.querySelector('#checkoutdate');
    const preferedRoom = document.querySelector('#roomselection');
    const noOfAdults = document.querySelector('#adult');
    let date_1 = new Date(checkin.value.trim());
    let date_2 = new Date(checkout.value.trim());
    const noOfDays = Math.ceil((date_2 - date_1) / (1000 * 3600 * 24));
    const data = createData(checkin.value.trim(), checkout.value.trim(), preferedRoom.value.trim(),noOfAdults.value.trim(),noOfDays);
    const fetchOptions = createOptions(data);
    sessionStorage['isEdit'] = 0;
    sessionStorage['isBooking'] = 1;
    //console.log(noOfDays);
    fetch('http://localhost:3000/availablerooms' , fetchOptions)
   .then(onResponse)
   .then(onTextReady)
    
    
  
}
function redirct1()
{
    window.location.href = "/editBooking.html";
}

const form = document.querySelector('#availableform');
form.addEventListener('submit', processSubmit);

const button = document.querySelector('#edit');
button.addEventListener('click',redirct1)

