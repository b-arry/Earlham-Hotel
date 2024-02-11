

function loadData()
{
    //console.log("Hello");
   //console.log();
   const roomData = JSON.parse(sessionStorage['roomsAvailable'])['rooms'];
   const types = ['secondType','thirdType','fourthType']
   for(var room in roomData)
   {
    if(roomData[room]['is_prefered']==1)
    {
        const Div = document.getElementById('firstType');
        const H2 = document.createElement('h2');
        const img = document.createElement('img');
        const br = document.createElement('br');
        const p = document.createElement('p');
        const label = document.createElement('label');
        const p1 = document.createElement('p');
        const input = document.createElement('input');
        if(room=='std_t')
        {
            H2.textContent = "Standard Twin";
            img.src = "images/StandardTwin.jpg";
            p.textContent = "The Standard Twin room includes two comfy single beds, a work desk for those" + "\n" +"important business trips,and free access to our always fast, unlimited WiFi.";
            
            label.textContent = "Number of Rooms";
            label.setAttribute('for','std_t');
            input.setAttribute('type','number');
            input.setAttribute('name','std_t');
            input.setAttribute('placeholder','0');
            input.id = 'std_t'
            
        }
        else if(room=='std_d')
        {
            H2.textContent = "Standard Deluxe";
            img.src = "images/StandardKing.jpg";
            
            p.textContent = " Has one standard size king bed and a pull out sofa bed with one bathroom and" + "\n" +"a small area with a coffee maker. It comes with a television and cable box.";
            label.textContent = "Number of Rooms";
            label.setAttribute('for','std_d');
            input.setAttribute('type','number');
            input.setAttribute('name','std_d');
            input.setAttribute('placeholder','0');
            input.id = 'std_d'

        }
        else if(room=='sup_t')
        {
            H2.textContent = "Super Twin";
            img.src = "images/DeluxeTwin.jpg";
            p.textContent = "A luxurious room to relax in after your travels. Has two double beds and" + "\n" +"quadraple occupancy. The bathroom is fitted with a rainshower and bathtub.";
            label.textContent = "Number of Rooms";
            label.setAttribute('for','sup_t');
            input.setAttribute('type','number');
            input.setAttribute('name','sup_t');
            input.setAttribute('placeholder','0');
            input.id = 'sup_t'

        }
        else if(room == 'sup_d')
        {
            H2.textContent = "Super Deluxe";
            img.src = "images/DeluxeKing.jpg";
            p.textContent = "Has enormous king-size bed, make a coffee using your personal Nespresso machine, catch up on your shows on the Smart TV with free and unlimited WiFi.";
            label.textContent = "Number of Rooms";
            label.setAttribute('for','sup_d');
            input.setAttribute('type','number');
            input.setAttribute('name','sup_d');
            input.setAttribute('placeholder','0');
            input.id = 'sup_d'
        }

        img.style.height="40%";
    //   img.style.maxHeight="70vh;"
        img.style.width = "40%";
       // img.style.display="block";
        //img.style.margin = "0 auto"
        p.style.width = 0;
        p.style.minWidth ="100%";
        //p.style.textAlign="center";
        input.max = roomData[room]['totalAvailableRooms'];
        input.min = 0;
        input.setAttribute("maxlength","1");
      
        p1.textContent = "Only "+ roomData[room]['totalAvailableRooms'] + " rooms left"; 
        Div.appendChild(H2);
        Div.appendChild(img);
        Div.appendChild(br);
        Div.appendChild(p);
        Div.appendChild(br);
        Div.appendChild(label);
        Div.appendChild(input);
        Div.appendChild(p1);
        console.log("Here1");
        break;

    }

    
   }
   var c =0;
   for(var room in roomData)
   {
    if(roomData[room]['is_prefered']!=1)
    {
        const Div = document.getElementById(types[c]);
        const H2 = document.createElement('h2');
        const img = document.createElement('img');
        const br = document.createElement('br');
        const p = document.createElement('p');
        const p1 = document.createElement('p');
        const label = document.createElement('label');
        const input = document.createElement('input');
        if(room=='std_t')
        {
            H2.textContent = "Standard Twin";
            img.src = "images/StandardTwin.jpg";
            p.textContent = "The Standard Twin room includes two comfy single beds, a work desk for those" + "\n" +"important business trips,and free access to our always fast, unlimited WiFi.";
            
            label.textContent = "Number of Rooms";
            label.setAttribute('for','std_t');
            input.setAttribute('type','number');
            input.setAttribute('name','std_t');
            input.setAttribute('placeholder','0');
            input.id = 'std_t'
        }
        else if(room=='std_d')
        {
            H2.textContent = "Standard Deluxe";
            img.src = "images/StandardKing.jpg";
            
            p.textContent = " Has one standard size king bed and a pull out sofa bed with one bathroom and" + "\n" +"a small area with a coffee maker. It comes with a television and cable box.";
            label.textContent = "Number of Rooms";
            label.setAttribute('for','std_d');
            input.setAttribute('type','number');
            input.setAttribute('name','std_d');
            input.setAttribute('placeholder','0');
            input.id = 'std_d'

        }
        else if(room=='sup_t')
        {
            H2.textContent = "Super Twin";
            img.src = "images/DeluxeTwin.jpg";
            p.textContent = "A luxurious room to relax in after your travels. Has two double beds and" + "\n" +"quadraple occupancy. The bathroom is fitted with a rainshower and bathtub.";
            label.textContent = "Number of Rooms";
            label.setAttribute('for','sup_t');
            input.setAttribute('type','number');
            input.setAttribute('name','sup_t');
            input.setAttribute('placeholder','0');
            input.id = 'sup_t'

        }
        else if(room == 'sup_d')
        {
            H2.textContent = "Super Deluxe";
            img.src = "images/DeluxeKing.jpg";
            p.textContent = "Has enormous king-size bed, make a coffee using your personal Nespresso machine, catch up on your shows on the Smart TV with free and unlimited WiFi.";
            label.textContent = "Number of Rooms";
            label.setAttribute('for','sup_d');
            input.setAttribute('type','number');
            input.setAttribute('name','sup_d');
            input.setAttribute('placeholder','0');
            input.id = 'sup_d'
        }

        img.style.height="40%";
    //   img.style.maxHeight="70vh;"
        img.style.width = "40%";
       // img.style.display="block";
        //img.style.margin = "0 auto"
        p.style.width = 0;
        p.style.minWidth ="100%";
        //p.style.textAlign="center";
        input.max = roomData[room]['totalAvailableRooms'];
        input.min = 0;
        ///input.maxLength = "1";
        input.setAttribute("maxlength","1");
        p1.textContent = "Only "+ roomData[room]['totalAvailableRooms'] + " rooms left"; 
        Div.appendChild(H2);
        Div.appendChild(img);
        Div.appendChild(br);
        Div.appendChild(p);
        Div.appendChild(br);
        Div.appendChild(label);
        Div.appendChild(input);
        Div.appendChild(p1);
        c=c+1;
    }
   }
   



   
   
   
}






const p1 = document.createElement('p');
const p2 = document.createElement('p');
const p3 = document.createElement('p');
const p4 = document.createElement('p');
const price = document.getElementById('price');
const minRooms = document.getElementById('min_room');
const continueToPay = document.getElementById('select');
const mealsCheckbox = document.getElementById('Meals');
const drinksCheckbox = document.getElementById('Drinks');
let mealsCost = 0;
let drinksCost = 0;
let totalRoomsSelected =0;
let priceperRoom1 = 0;
let priceperRoom2 = 0;
let priceperRoom3 = 0;
let priceperRoom4 = 0;
let roomSelect = {
    'std_t':0,
    'std_d':0,
    'sup_d':0,
    'sup_t':0
}
//const br1 = document.createElement('br');

document.addEventListener("DOMContentLoaded", loadData);


document.addEventListener("input",function(e){
    var totalPrice =0;
    var totalRooms=0;
    let roomData = JSON.parse(sessionStorage['roomsAvailable'])['rooms'];
    
   
    if(e.target && e.target.id== 'std_t'){
        
          //do something
          
          p1.textContent = "";
                
          if(e.target.value>e.target.max)
          {
            e.target.value = e.target.max;
          }
          if(e.target.value<e.target.min)
          {
            e.target.value = e.target.min;
          }
          if(e.target.value.length>1)
          {
             e.target.value =0;
          }
          console.log(e.target.value);
         priceperRoom1 = e.target.value*roomData['std_t']['baseRate']*roomData['std_t']['noOfDays'];
         console.log(roomData['std_t']['noOfDays'])
         p1.textContent = "Price = £"+priceperRoom1;
         e.target.parentNode.insertBefore(p1,e.target.nextSibling);
          roomSelect['std_t'] = e.target.value;
         
          }  
          
     
     else if(e.target && e.target.id== 'std_d'){
        //do something
        p2.textContent = "";
        if(e.target.value>e.target.max)
        {
          e.target.value = e.target.max;
        }
        if(e.target.value<e.target.min)
          {
            e.target.value = e.target.min;
          }
      
        if(e.target.value.length>1)
        {
           e.target.value =0;
        }
        //console.log(e.target.value);
        priceperRoom2 = e.target.value*roomData['std_d']['baseRate']*roomData['std_d']['noOfDays'];
        p2.textContent = "Price = £"+priceperRoom2;
        e.target.parentNode.insertBefore(p2,e.target.nextSibling);
        roomSelect['std_d'] = e.target.value;
       
   }
  else if(e.target && e.target.id== 'sup_t'){
    //do something
    if(e.target.value>e.target.max)
    {
      e.target.value = e.target.max;
    }
    if(e.target.value<e.target.min)
          {
            e.target.value = e.target.min;
          }
          if(e.target.value.length>1)
          {
             e.target.value =0;
          }
    //console.log(e.target.value);
    priceperRoom3 = e.target.value*roomData['sup_t']['baseRate']*roomData['sup_t']['noOfDays'];
    p3.textContent = "Price = £"+priceperRoom3;
        e.target.parentNode.insertBefore(p3,e.target.nextSibling);
        roomSelect['sup_t'] = e.target.value;
      
   
}
else if(e.target && e.target.id== 'sup_d'){
    //do something
    if(e.target.value>e.target.max)
    {
      e.target.value = e.target.max;
    }
    if(e.target.value<e.target.min)
          {
            e.target.value = e.target.min;
          }
          if(e.target.value.length>1)
          {
             e.target.value =0;
          }
    //console.log(e.target.value);
    priceperRoom4 = e.target.value*roomData['sup_d']['baseRate']*roomData['sup_d']['noOfDays'];
    p4.textContent = "Price = £"+priceperRoom4;
    e.target.parentNode.insertBefore(p4,e.target.nextSibling);
    roomSelect['sup_d'] = e.target.value;
    
}
else if(e.target && e.target.value=="Meals")
{
if(e.target.checked)
{
    mealsCost = totalRoomsSelected*10*roomData['sup_d']['noOfDays'];
}
else
{
    mealsCost = 0;
}
}

else if(e.target && e.target.value=="Drinks")
{
    if(e.target.checked)
{
    drinksCost = totalRoomsSelected*5*roomData['sup_d']['noOfDays'];
}
else
{
    drinksCost = 0;
}
}
    
sessionStorage['roomsSelected'] = JSON.stringify(roomSelect);
totalRoomsSelected = parseInt(roomSelect['std_t']) + parseInt(roomSelect['std_d'])  + parseInt(roomSelect['sup_t']) + parseInt(roomSelect['sup_d']); 
totalPrice = priceperRoom1 + priceperRoom2 + priceperRoom3 +priceperRoom4 + drinksCost + mealsCost;
price.textContent = "Total Price= £"+ totalPrice;
minRooms.textContent ="Minimum number of rooms required= "+ roomData['std_t']['totalRoomRequired'];
sessionStorage['totalPrice'] = totalPrice;
//console.log(sessionStorage['roomsSelected']);
if(totalRoomsSelected>=roomData['std_t']['totalRoomRequired'])
{
    continueToPay.disabled= false;
}
else
{
    continueToPay.disabled= true;
}
//console.log(totalRoomsSelected);
//console.log(roomData);


    });


continueToPay.addEventListener('click',function(e){
    window.location.href = "/payment.html";
});
