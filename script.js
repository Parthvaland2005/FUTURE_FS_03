(function(){
    emailjs.init("hhEa9uBrETMRJVNlm"); 
})();

const form = document.getElementById("bookingForm");
const success = document.getElementById("success");
const table = document.getElementById("bookingTable");

form.addEventListener("submit", function(e){
    e.preventDefault();

    let name = form.elements[0].value;
    let phone = form.elements[1].value;
    let service = form.elements[2].value;
    let date = form.elements[3].value;

    let data = {name, phone, service, date};

    
    emailjs.send("service_rcsf3i8", "template_udxcrov", data)
    .then(function(){
        success.innerHTML = "✅ Appointment Booked Successfully!";
    }, function(error){
        console.error("EMAIL ERROR:", error);
        success.innerHTML = "❌ Email failed!";
    });

    
    let bookings = JSON.parse(localStorage.getItem("salonBookings")) || [];
    bookings.push(data);
    localStorage.setItem("salonBookings", JSON.stringify(bookings));

    loadBookings();
    form.reset();
});

function loadBookings(){
    let bookings = JSON.parse(localStorage.getItem("salonBookings")) || [];
    table.innerHTML = `<tr><th>Name</th><th>Phone</th><th>Service</th><th>Date</th></tr>`;
    bookings.forEach(b=>{
        let row = table.insertRow();
        row.insertCell(0).innerText = b.name;
        row.insertCell(1).innerText = b.phone;
        row.insertCell(2).innerText = b.service;
        row.insertCell(3).innerText = b.date;
    });
}

function openAdmin(){
    let pass = prompt("Enter Admin Password");
    if(pass === "1234"){
        document.getElementById("admin").style.display="block";
        loadBookings();
    } else {
        alert("Wrong Password");
    }
}