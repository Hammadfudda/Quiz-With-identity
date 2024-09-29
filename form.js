import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

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
const storage = getStorage();

document.getElementById("uploadButton").addEventListener("click", async () => {
  let fileInput = document.getElementById("fileInput");
  let user = document.getElementById("name").value;
  let phoneNumber = document.getElementById("phoneNumber").value;
  let age = document.getElementById("age").value;
  let define = document.getElementById("define").value;
  let email = document.getElementById("email").value;
  let code = document.getElementById("code").value;

  if (fileInput.files.length === 0) {
    alert("Please select a file.");
    return;
  }

  if (code === "nedddigital" && user && phoneNumber && age && define && fileInput) {
    try {
      let downloadURL = await uploadFile(fileInput.files[0]);

      localStorage.setItem("phone", JSON.stringify(phoneNumber));
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("age", JSON.stringify(age));
      localStorage.setItem("define", JSON.stringify(define));
      localStorage.setItem("code", JSON.stringify(code));
      localStorage.setItem("email", JSON.stringify(email));

      location.replace("./Quiz.html");
    } catch (error) {
      alert("Upload failed: " + error.message);
    }
  } else {
    alert("Your code is not acceptable or all fields are not filled.");
  }
});

async function uploadFile(file) {
  return new Promise((resolve, reject) => {
    const randomNum = Math.random().toString().slice(2);
    const storageRef = ref(storage, `images/${randomNum}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
       
      },
      (error) => {
        reject(error);
      },
      () => {
       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      localStorage.setItem("image",(downloadURL));
          const displayImage = document.getElementById("displayImage");
          if (displayImage) {
            displayImage.src = downloadURL;
          }
          resolve(downloadURL);
        });
      }
    );
  });
}
