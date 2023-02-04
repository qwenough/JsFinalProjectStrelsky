//routing

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
  if (location == "portfolio") {
    makeSlider();
  }
};

window.addEventListener("hashchange", locationHandler);
locationHandler();

//modal

var modal = document.querySelector(".modal");
var contactButton = document.querySelectorAll(".contact-button");
var closeModal = document.querySelector(".close-modal");
let submitButton = document.querySelector(".submit-button");

let name = document.forms.contactForm[0];
let surname = document.forms.contactForm[1];
let email = document.forms.contactForm[2];
let phone = document.forms.contactForm[3];


contactButton[0].onclick = function () {
  modal.style.display = "block";
  if (!document.cookie == "") {
    name.value = document.cookie.split(",")[0];
    surname.value = document.cookie.split(",")[1];
    email.value = document.cookie.split(",")[2];
    phone.value = document.cookie.split(",")[3];
  }
}

contactButton[1].onclick = function () {
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
    document.querySelector(".call-back").style.display = "flex";
    setTimeout(notificationNone, 2900);
  }
}

function notificationNone() {
  document.querySelector(".call-back").style.display = "none"
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

//receive fake data

getData = async function () {
  let fakeData = await fetch("https://jsonplaceholder.typicode.com/comments").then(function (response) {
    return response.json();
  })
  localStorage.setItem("fakeData", JSON.stringify(fakeData));
}()


//slider

function makeSlider() {
  let fakeDataObject = JSON.parse(window.localStorage.getItem('fakeData'));

  let comments = document.querySelectorAll(".portfolio-comment");
  let commentNames = document.querySelectorAll(".comment-name");
  let commentEmails = document.querySelectorAll(".comment-email");
  let commentBodies = document.querySelectorAll(".comment-body");

  for (let i = 0; i < comments.length; i++) {
    let name = fakeDataObject[i].name.split(' ')[0];
    let surname = fakeDataObject[i].name.split(' ')[1];

    name = name[0].toUpperCase() + name.slice(1);
    surname = surname[0].toUpperCase() + surname.slice(1);

    commentNames[i].innerHTML = name + " " + surname;
    commentEmails[i].innerHTML = fakeDataObject[i].email;
    commentBodies[i].innerHTML = fakeDataObject[i].body;
  }


  let offset = 0;
  document.querySelector(".next-button").addEventListener("click", function () {
    let gap = comments[1].offsetLeft - comments[0].offsetLeft - comments[0].offsetWidth;
    let commentWidth = comments[0].offsetWidth;

    offset += commentWidth + gap;
    if (offset > (commentWidth + gap) * 3) {
      offset = 0;
    }
    document.querySelector(".portfolio-comment-div").style.left = - offset + "px";
  });

  document.querySelector(".prev-button").addEventListener("click", function () {
    let gap = comments[1].offsetLeft - comments[0].offsetLeft - comments[0].offsetWidth;
    let commentWidth = comments[0].offsetWidth;

    offset -= commentWidth + gap;
    if (offset < 0) {
      offset = (commentWidth + gap) * 3;
    }
    document.querySelector(".portfolio-comment-div").style.left = - offset + "px";
  });
}

//burger

let burgerIcon = document.querySelector(".burger-icon"),
  burgerBody = document.querySelector(".burger"),
  burgerList = document.querySelectorAll(".burger li");
    
burgerIcon.onclick = function () { 
  burgerBody.classList.toggle('display-burger');
}

for (i = 0; i < burgerList.length; i++) {
  burgerList[i].onclick = function () {
    burgerBody.classList.toggle('display-burger');
  }
}





