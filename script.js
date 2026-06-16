
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    const btn = document.getElementById("darkModeBtn");

    if(document.body.classList.contains("dark-mode")){
        btn.innerHTML = "☀️ Light Mode";
    } else {
        btn.innerHTML = "🌙 Dark Mode";
    }
}


let cart=[];
let prices = {
    "Dosa":60,"Idly":60,"Pongal":70,"Poori":80,"Noodles":120,"Fried Rice":140,"Momos":110,"Pasta":150,
    "Margherita Pizza":199,"Veg Pizza":249,"Cheese Burst Pizza":299,"Veg Burger":129,"Chicken Burger":159,
    "Cheese Burger":179,"Chicken 65":220,"Tandoori Chicken":320,"Grilled Chicken":350,"Biryani":250,
    "Non-veg Meals":200,"Veg Meals":149,"Coca cola":40,"Mango Juice":70,"Coffee":50,"Tea":60,"Fresh juice":59,
    "Milshakes":99,"Brownie":149,"Cake":120,"Gulab Jamun":80,"Ice creams":90
};

/* CART */
function add(item){
  cart.push(item);
  render();
  updateTotal();
}
function updateTotal(){
  totalAmount = 0;
  cart.forEach(item => {
    totalAmount += prices[item] || 0;
  });
  console.log("Total Bill:" ,totalAmount);
}

function render(){
  let list=document.getElementById("list");
  list.innerHTML="";
  cart.forEach(i=>{
    let li=document.createElement("li");
    li.innerText=i;
    list.appendChild(li);
  });
}

function toggleCart(){
  document.getElementById("cart").classList.toggle("active");
}

/*Search*/
function searchFood(){
    let input = document.getElementById("searchInput").value.toLowerCase();
    let cards =document.getElementsByClassName("card");
    for( let i = 0;i<cards.length;i++){
        let foodName = cards[i].getElementsByTagName("h3")[0].innerText.toLowerCase();
        if(foodName.includes(input)){
            cards[i].style.display="block";
        }
        else{
            cards[i].style.display="none";
        }
    }
}

/* LOGIN */
function openLogin(){
  document.getElementById("login").style.display="block";
}

function login(){
  let u=document.getElementById("user").value;
  let p=document.getElementById("pass").value;

  if(u===""||p===""){
    alert("Fill login details!");
    return;
  }

  document.getElementById("login").style.display="none";
  showAlert("Login Successful!");
  launchConfetti();
}

/* ORDER */
function openOrder(){
  if(cart.length===0){
    alert("Cart empty!");
    return;
  }
  document.getElementById("orderForm").style.display="block";
}

/* PAYMENT VALIDATION */
function openPayment(){

  let n=document.getElementById("name").value.trim();
  let p=document.getElementById("phone").value.trim();
  let a=document.getElementById("address").value.trim();
  let c=document.getElementById("coupon").value.trim().toUpperCase();
  let e=document.getElementById("error");

  if(n===""||p===""||a===""){
    e.innerText="⚠ Fill all fields!";
    return;
  }

  if(!/^[0-9]{10}$/.test(p)){
    e.innerText="⚠ Invalid phone number!";
    return;
  }
  e.innerText = "";
  finalAmount = totalAmount;
  totalDiscount = 0;
  if(cart.length === 0){
    showAlert("Cart is empty!");
    return;
  }
  if(c === "FOOD50"){
     totalDiscount = 50;
     finalAmount = totalAmount - (totalAmount * 0.5);
  }
  else if (c !== ""){
     showAlert("Invalid Coupon Code! proceeding wilth full amount");
  }
  document.getElementById("orderForm").style.display="none";
  document.getElementById("pay").style.display="block";
 // let msg = totalDiscount > 0 ? "Coupon applied: "+ totalDiscount + "% OFF" : "No Discount applied" ;
  document.getElementById("discountText").innerText = "Final Amount: Rs." + totalAmount +"\n Paying amount: Rs." + finalAmount;
  launchConfetti();
}


/* SUCCESS */
function confirmOrder(){
  document.getElementById("pay").style.display="none";
  document.getElementById("success").style.display="flex";
  document.querySelector(".success-box").innerHTML = `<h2> Payment Successful!</h2><p>Order confirmed </p>
  <h3>Paid Amount: Rs.${finalAmount}</h3><button onclick ="closeSuccess()">OK</buttton>`;
  launchConfetti();
  showBike();

  //document.getElementById("pay").style.display="none";
 // document.getElementById("success").style.display="flex";

  cart=[];
  render();
}

function closeSuccess(){
  document.getElementById("success").style.display="none";
}

/*Customer Reviews*/

function addReview() {
    let name = document.getElementById("userName").value;
    let rating = document.getElementById("rating").value;
    let review = document.getElementById("reviewText").value;

    if(name === "" || review === "") {
        alert("Please fill all fields!");
        return;
    }

    let reviewCard = document.createElement("div");
    reviewCard.className = "review-card";

    reviewCard.innerHTML = `
        <h3>${name}</h3>
        <p>${rating}</p>
        <p>${review}</p>
    `;

    document.getElementById("reviewList").prepend(reviewCard);

    showAlert("Thank you for your review!");
    launchConfetti();

    document.getElementById("userName").value = "";
    document.getElementById("reviewText").value = "";
}
/* TRACKING */
function addMsg(t){
  let box=document.getElementById("messages");
  let d=document.createElement("div");
  d.className="msg";
  d.innerText=t;
  box.appendChild(d);
}

async function startTracking(){

  document.getElementById("messages").innerHTML="";
  showAlert("Tracking Started");
  launchConfetti();
  addMsg("Order placed ✔");
  await new Promise(r=>setTimeout(r,2000));
  addMsg("Preparing food 👨‍🍳");
  await new Promise(r=>setTimeout(r,3000));
  addMsg("Out for delivery 🛵");
  await new Promise(r=>setTimeout(r,3000));
  addMsg("Delivered 🎉");

  showAlert("🎉 Food Delivered Successfully!\n\nThank you for your order.");
  launchConfetti();
  showBike();
   
}


/* Confetti */
function launchConfetti(){

    const canvas = document.getElementById("confettiCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let pieces = [];
    let colors = [
        "#ff0000","#00ff00","#0000ff",
        "#ffff00","#ff00ff","#00ffff",
        "#ff8800"
    ];

    for(let i=0;i<150;i++){
        pieces.push({
            x:Math.random()*canvas.width,
            y:Math.random()*canvas.height-canvas.height,
            size:Math.random()*8+4,
            speed:Math.random()*5+2,
            color:colors[Math.floor(Math.random()*colors.length)]
        });
    }

    let animation;

    function draw(){

        ctx.clearRect(0,0,canvas.width,canvas.height);

        pieces.forEach(p=>{

            p.y += p.speed;

            ctx.fillStyle = p.color;
            ctx.fillRect(p.x,p.y,p.size,p.size);

        });

        animation = requestAnimationFrame(draw);
    }

    draw();

    setTimeout(()=>{
        cancelAnimationFrame(animation);
        ctx.clearRect(0,0,canvas.width,canvas.height);
    },3000);
}

/* Bike Animation */
function showBike(){

    const bike = document.getElementById("bike");

    bike.classList.add("moveBike");

    setTimeout(()=>{
        bike.classList.remove("moveBike");
    },5000);
}

function showAlert(message){
  document.getElementById("alertText").innerText = message;
  document.getElementById("customAlert").style.display = "block";
}
function closeAlert(){
  document.getElementById("customAlert").style.display = "none";
}



