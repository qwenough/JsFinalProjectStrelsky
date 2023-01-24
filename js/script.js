const routes = {
  404: {
    template: "/pages/404.html",
    title: "404",
  },
  "/": {
    template: "/pages/home.html",
    title: "Home",
  },
  "about": {
    template: "/pages/about.html",
    title: "About",
  },
  "portfolio": {
    template: "/pages/portfolio.html",
    title: "Portfolio",
  }
};

const locationHandler = async () => {
  var location = window.location.hash.replace("#", "");
  if (location.length == 0) {
    location = "/";
  }
  const route = routes[location] || routes["404"];
  const html = await fetch(route.template).then((response) => response.text());
  document.querySelector("main").innerHTML = html;
  document.title = route.title;
};

window.addEventListener("hashchange", locationHandler);
locationHandler();


var modal = document.querySelector(".modal");
var contactButton = document.getElementById("contact-button");
var closeModal = document.querySelector(".close-modal");
let submitButton = document.querySelector(".submit-button");

let name = document.forms.contactForm[0];
let surname = document.forms.contactForm[1];
let email = document.forms.contactForm[2];
let phone = document.forms.contactForm[3];


contactButton.onclick = function () {
  modal.style.display = "block";
  if (!document.cookie == "") {
    name.value = document.cookie.split(",")[0];
    surname.value = document.cookie.split(",")[1];
    email.value = document.cookie.split(",")[2];
    phone.value = document.cookie.split(",")[3];
  }

}

closeModal.onclick = function () {
  modal.style.display = "none";
}

submitButton.onclick = function () {
  let status = true;


  if (!testName(name.value)) {
    status = false;
    name.classList.add("wrong-input");
  } else {
    name.classList.remove("wrong-input");
  }

  if (!testName(surname.value)) {
    status = false;
    surname.classList.add("wrong-input");
  } else {
    surname.classList.remove("wrong-input");
  }

  if (!testEmail(email.value)) {
    status = false;
    email.classList.add("wrong-input");
  } else {
    email.classList.remove("wrong-input");
  }

  if (!testPhone(phone.value)) {
    status = false;
    phone.classList.add("wrong-input");
  } else {
    phone.classList.remove("wrong-input");
  }

  if (status) {
    modal.style.display = "none";
    document.cookie = `${name.value},${surname.value},${email.value},${phone.value}; max-age=10000`;
  }
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function testPhone(phoneNumber) {
  return /^\+\d{10,15}$/.test(phoneNumber);
}

function testEmail(email) {
  return /^[A-Za-z]+.[A-Za-z0-9]+@[\w\.]{2,11}\.[A-Za-z]{2,11}$/.test(email);
}

function testName(name) {
  return /^[A-Za-z]{2,30}$/.test(name);
}

