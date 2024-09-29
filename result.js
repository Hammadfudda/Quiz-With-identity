   // Import the functions you need from the SDKs you need
   import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
   import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
   import {
    getDatabase,
    ref,
    push,
    set,
    onValue,
  } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

   const firebaseConfig = {
     apiKey: "AIzaSyD6Xe035sTcDjEVqHMvdYtEmxtUGlArMXk",
     authDomain: "neddquiz.firebaseapp.com",
     databaseURL: "https://neddquiz-default-rtdb.firebaseio.com",
     projectId: "neddquiz",
     storageBucket: "neddquiz.appspot.com",
     messagingSenderId: "319841902543",
     appId: "1:319841902543:web:5a765ce0b8918d227abcba",
     measurementId: "G-SMMV3CV1EN"
   };

   // Initialize Firebase
   const app = initializeApp(firebaseConfig);
   const analytics = getAnalytics(app);
   const db = getDatabase();
         
   
 let content = document.querySelector(".content");
let correctAnswer = localStorage.getItem("CorrectAnswer");
let WrongAnswer = localStorage.getItem("WrongAnswer");

let Per =  localStorage.getItem("Per");
let correctAns = document.getElementById("correctAns");
let wrongAns = document.getElementById("wrongAns");
let perc = document.getElementById("perc");
let result = document.querySelector(".result");
correctAns.innerHTML = `${correctAnswer}`;
wrongAns.innerHTML = `${WrongAnswer}`;
perc.innerHTML = `${Math.round(Per)}%`;
          
let user = localStorage.getItem("user");
let phone = localStorage.getItem("phone");
let age = localStorage.getItem("age");
let define = localStorage.getItem("define");
let code = localStorage.getItem("code");
let email = localStorage.getItem("email")
let image = localStorage.getItem("image")
let percentage = Math.round(Per);

    let obj = {
      userName: user,
      phoneNumber: phone,
      age: age,
      code: code,
      percentage: percentage,
      email: email,
      Qualification: define,
      ImageUrl : image
 } ;

    let storedId = localStorage.getItem("id");

    if (!storedId) {
      obj.id = push(ref(db, "obj")).key;
      localStorage.setItem("id", obj.id);
  
      storedId = obj.id;
    }

    let reference = ref(db, `obj/${storedId}`);

    set(reference, obj)
      .then(function () {
        // console.log("Data saved successfully.");
      })
      .catch(function (err) {
        alert(err.message);
      });

 function lastStep() {
    
    if (Per >= 70) {
        result.innerHTML = `Congratulations You Passed`
                result.classList.remove("clr-red");

        result.classList.add("clr-green")

        content.innerHTML +=`<a class=" btn bg-primary text-center text-light rounded me-5" style="height: 50px; width: 100px;" href="./user.html">next</a>`;
          }else{
              content.innerHTML +=`<a class=" btn bg-primary text-center text-light rounded me-5" style="height: 60px; width: 100px;" href="./index.html">Back to home</a>`;
          }
}

lastStep()



