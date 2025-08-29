
   function toggleMenu() {
    document.querySelector(".profileiconmenu").classList.toggle("active");
  }

function searchVegetable() {
  let input = document.getElementById("searchBar").value.toLowerCase();
  let articles = document.querySelectorAll(".products article");

  articles.forEach(article => {
    let name = article.querySelector("h3").innerText.toLowerCase();
    if (name.includes(input)) {
      article.style.display = "block";
    } else {
      article.style.display = "none";
    }
  });
}

let billItems = []; 
let billItems2 = []; // stores vegetables and kg values
function addToBill(inputId, vegName, amt) {
    let kgValue = document.getElementById(inputId).value;

    if (kgValue.trim() === "" || isNaN(kgValue) || kgValue <= 0) {
        alert("Enter amount in kg");
    } else {
        let quantity = parseFloat(kgValue); // convert to number
        let vegamount = amt * quantity; 
        billItems.push({ name: vegName, kg: quantity, a: vegamount });
        billItems2.push({ name: vegName, kg: quantity, a: vegamount }); 
        alert(vegName + " (" + quantity + " kg) " + "Rs." + vegamount + " added to bill");
        localStorage.setItem("lastBill", JSON.stringify(billItems2));
    }
    
}


function viewBill() {
    if (billItems.length === 0) {
        alert("Your bill is empty!");
        return;
    }

    // Calculate total
    let totalAmount = billItems.reduce((sum, item) => sum + item.a, 0);

    // Create popup
    let billWindow = window.open("", "BillWindow", "width=400,height=500,resizable=yes,scrollbars=yes");

    billWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Your Bill</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                    background: #f9f9f9;
                }
                h2 {
                    text-align: center;
                    color: #2c3e50;
                }
                .bill-container {
                    background: white;
                    padding: 15px;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    max-width: 350px;
                    margin: auto;
                }
                ul {
                    list-style: none;
                    padding: 0;
                }
                li {
                    background: #ecf0f1;
                    margin: 8px 0;
                    padding: 10px;
                    border-radius: 5px;
                    display: flex;
                    justify-content: space-between;
                }
                .veg-name { font-weight: bold; color: #34495e; }
                .kg-value { color: #27ae60; }
                .veg-amt { color: #c0392b; }
                .buttons {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 15px;
                }
                button {
                    padding: 8px 12px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 14px;
                }
                .edit-btn { background: #f39c12; color: white; }
                .clear-btn { background: #e74c3c; color: white; }
                .order-btn {background: #39ff49ff; color: white;}
                .total {
                    margin-top: 15px;
                    font-size: 18px;
                    font-weight: bold;
                    text-align: right;
                    color: #2c3e50;
                }
         
                @media (max-width: 768px) {
                      html, body {
                               
                               height: 100%;   
                              overflow-y: hidden;     /* Scroll if too tall */
                              padding: 15px;
                              max-width: 100%;
                        }
                        .bill-container {
                        overflow-y: hidden;
                        height: 80%;
                        width: auto;
                        }
                        .bill-container button {
                         width: auto;            /* full width buttons in mobile */
                          margin: 5px 0;
                             }
}
            </style>
        </head>
        <body>
            <div class="bill-container">
                <h2>Your Bill</h2>
                <ul id="bill-list">
                    ${billItems.map((item, index) => 
                        `<li>
                            <span class="veg-name">${item.name}</span> 
                            <span class="kg-value">${item.kg} kg</span>
                            <span class="veg-amt">Rs.${item.a}</span>
                        </li>`
                    ).join('')}
                </ul>
                <div class="total">Total: Rs.${totalAmount}</div>
                <div class="buttons">
                    <button class="edit-btn" onclick="window.opener.editBill();window.close();">Edit Bill</button>
                    <button class="clear-btn" onclick="window.opener.clearBill(); window.close();">Clear Bill</button>
                    <button class="order-btn" onclick="window.opener.orderBill();window.close();">Order Bill</button>
                </div>
            </div>
        </body>
        </html>
    `);
}



function vieworderbill() {
     let savedbill = localStorage.getItem("lastBill"); 

    if (!savedbill) {
        alert("Your bill is empty!");
        return;
    }

    let billItems = JSON.parse(savedbill); 

    // Calculate total
    let totalAmount = billItems.reduce((sum, item) => sum + item.a, 0);

    // Create popup
    let orderWindow = window.open("", "orderWindow", "width=400,height=500,resizable=yes,scrollbars=yes");

    orderWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Your Bill</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                    background: #f9f9f9;
                }
                h2 {
                    text-align: center;
                    color: #2c3e50;
                }
                .bill-container {
                    background: white;
                    padding: 15px;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    max-width: 350px;
                    margin: auto;
                }
                ul {
                    list-style: none;
                    padding: 0;
                }
                li {
                    background: #ecf0f1;
                    margin: 8px 0;
                    padding: 10px;
                    border-radius: 5px;
                    display: flex;
                    justify-content: space-between;
                }
                .veg-name { font-weight: bold; color: #34495e; }
                .kg-value { color: #27ae60; }
                .veg-amt { color: #c0392b; }
                .buttons {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 15px;
                }
                button {
                    padding: 8px 12px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 14px;
                }
                .total {
                    margin-top: 15px;
                    font-size: 18px;
                    font-weight: bold;
                    text-align: right;
                    color: #2c3e50;
                }
             
                @media (max-width: 768px) {
                      html, body {
                               
                               height: 100%;   
                              overflow-y: hidden;     /* Scroll if too tall */
                              padding: 15px;
                              max-width: 100%;
                        }
                        .bill-container {
                        overflow-y: hidden;
                        height: 80%;
                        width: auto;
                        }
                        .bill-container button {
                         width: auto;            /* full width buttons in mobile */
                          margin: 5px 0;
                             }
}
}

            </style>
        </head>
        <body>
            <div class="bill-container">
                <h2>Your Bill</h2>
                <ul id="bill-list">
                    ${billItems.map((item, index) => 
                        `<li>
                            <span class="veg-name">${item.name}</span> 
                            <span class="kg-value">${item.kg} kg</span>
                            <span class="veg-amt">Rs.${item.a}</span>
                        </li>`
                    ).join('')}
                </ul>
                <div class="total">Total: Rs.${totalAmount}</div>
               
            </div>
        </body>
        </html>
    `);
}
// Function to clear bill
function clearBill() {
    billItems = [];
    
    alert("Your bill is deleted! Order for a new Bill");
    
}

// Function to edit bill (you can extend this to re-open bill input fields)
function editBill() {
    alert("You can only clear bill and then order again.");

    
}

function orderBill() {
  
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const loginNav = document.getElementById("loginNav");
    const loginSuccessNav = document.getElementById("loginSuccessNav");

  if (isLoggedIn) {
       let now = new Date();
      let dateTime = now.toLocaleString();
       
     alert("Thank you for choosing KS Vegetables. Your order is confirmed at " + dateTime);
     localStorage.setItem("orderTime", dateTime);
     
       

  
  } else {
    alert("Please login first!");
    document.getElementById("loginPopup").style.display = "block";
    document.getElementById("loginFrame").src = "login.html";  // load login page
    
} 
}



    function vieworder() {
       

        // Display it inside <h2>
        document.getElementById("orderTime").innerText = "Order Placed On: " + dateTime;

    }


// login ----------------------------------------------------------
function openLogin() {
   
  document.getElementById("loginPopup").style.display = "block";
  document.getElementById("loginFrame").src = "login.html";  // load login page
}

function closeLogin() {
  document.getElementById("loginPopup").style.display = "none";
  document.getElementById("loginFrame").src = ""; // clear frame
}


// Call this function after successful login
function setLogin() {
  localStorage.setItem("isLoggedIn", "true");
  showLoginStatus();
}

// Call this function when logging out
function logout() {
  localStorage.removeItem("isLoggedIn");
  showLoginStatus();
  window.location.href="index.html";
}


// Function to update nav UI
function showLoginStatus() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const loginNav = document.getElementById("loginNav");
  const loginSuccessNav = document.getElementById("loginSuccessNav");
  const loginSuccessicon = document.getElementById("loginSuccessicon");
  const loginicon = document.getElementById("loginicon");
  const profileMenu = document.getElementById("profileMenu");
  const loginham = document.getElementById("loginham");
  const loginsuccessham = document.getElementById("loginsuccessham");

  if (isLoggedIn) {
    loginNav.style.display = "none";
    loginSuccessNav.style.display = "inline-block";
    loginSuccessicon.style.display="flex";
    document.getElementById("profileMenu").style.display = isLoggedIn ? "inline-block" : "none";
    loginsuccessham.style.display="block";
  } else {
    loginNav.style.display = "inline-block";
    loginSuccessNav.style.display = "none";
    loginicon.style.display="flex";
     document.getElementById("profileMenu").style.display = isLoggedIn ? "inline-block" : "none";
     loginham.style.display="block";
  }
}

function checkloginprofile() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if(isLoggedIn) {
        window.location.href="profile.html";
    }
    else {
        alert("Please login first!");
    }
}
// user icon functions

// Toggle dropdown when clicking user icon
document.addEventListener("DOMContentLoaded", () => {
  const profileMenu = document.querySelector(".profile-menu");
  const profileIcon = document.querySelector(".profile-icon");

  profileIcon.addEventListener("click", () => {
    profileMenu.classList.toggle("show");
  });

  // Close dropdown if clicked outside
  document.addEventListener("click", (e) => {
    if (!profileMenu.contains(e.target)) {
      profileMenu.classList.remove("show");
    }
  });
});

// Simulated login function
function loginSuccess() {
  document.getElementById("loginNav").style.display = "none";
  document.getElementById("profileMenu").style.display = "block";
  localStorage.setItem("isLoggedIn", "true");
}

// Logout
function logout() {
  localStorage.removeItem("isLoggedIn");
  document.getElementById("profileMenu").style.display = "none";
  document.getElementById("loginNav").style.display = "block";
  window.location.href = "index.html";
}

// On page load, check login state
window.onload = function () {
  if (localStorage.getItem("isLoggedIn")) {
    document.getElementById("loginNav").style.display = "none";
    document.getElementById("profileMenu").style.display = "block";
  }
};



// Run on every page load
document.addEventListener("DOMContentLoaded", showLoginStatus);

