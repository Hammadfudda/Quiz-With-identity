document.getElementById("fileInput").addEventListener("change", function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imgURL = e.target.result;
      localStorage.setItem("img", imgURL);
      const img = document.createElement("img");
      img.src = localStorage.getItem("img");
      const preview = document.getElementById("preview");
      preview.innerHTML = "";
      preview.appendChild(img);
    };
    reader.readAsDataURL(file);

    let user = document.getElementById("userName");
    let getUser = localStorage.getItem("user");
    let setItem = JSON.parse(getUser)
    user.innerHTML = `${setItem}`;

    let idUser = document.getElementById("id");
    let id = localStorage.getItem("id");
    idUser.innerHTML = `${id}`;
  } else {
    document.getElementById("preview").innerHTML = "<i class='fa-solid fa-camera'></i>";
  }
});

document.getElementById("downloadBtn").addEventListener("click", function () {
  html2canvas(document.getElementById("card"), {
    onrendered: function (canvas) {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "card.png";
      link.click();
    }
  });
});
