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
  let location = window.location.hash.replace("#", "");
  if (location.length === 0) {
    location = "/";
  }
  const route = routes[location] || routes["404"];
  const html = await fetch(route.template).then((response) => response.text());
  document.querySelector("main").innerHTML = html;
  document.title = route.title;
  if (location === "portfolio") {
    makeSlider();
  }
};

window.addEventListener("hashchange", locationHandler);
locationHandler();

//modal

let modal = document.querySelector(".modal"),
  contactButton = document.querySelectorAll(".contact-button"),
  closeModal = document.querySelector(".close-modal"),
  submitButton = document.querySelector(".submit-button"),
  newsButton = document.querySelector(".continue");

let name = document.forms.contactForm[0],
  surname = document.forms.contactForm[1],
  email = document.forms.contactForm[2],
  phone = document.forms.contactForm[3];

let forms = document.forms[0];

for (let i = 0; i < contactButton.length; i++) {
  contactButton[i].onclick = function () {
    modal.style.display = "block";
    if (document.cookie !== "") {
      for (let i = 0; i < forms.length; i++) {
        forms[i].value = document.cookie.split(";")[i].trim().split("=")[1];
      }
    }
  }
}

closeModal.onclick = function () {
  modal.style.display = "none";
}

submitButton.onclick = function () {
  let status = true;

  testForm(name, testName);
  testForm(surname, testName);
  testForm(email, testEmail);
  testForm(phone, testPhone);

  function testForm(formName, testFormFunc) {
    if (!testFormFunc(formName.value)) {
      status = false;
      formName.classList.add("wrong-input");
    } else {
      formName.classList.remove("wrong-input");
    }
  }

  if (status) {
    if (document.cookie !== "") {
      cookieManage("name", -1);
      cookieManage("surname", -1);
      cookieManage("email", -1);
      cookieManage("phone", -1);
    }
    modal.style.display = "none";
    cookieManage("name", 10000);
    cookieManage("surname", 10000);
    cookieManage("email", 10000);
    cookieManage("phone", 10000);

    document.querySelector(".call-back").style.display = "flex";
    setTimeout(notificationNone, 2900);
  }
}

newsButton.onclick = function () { 
  let emailInput = document.querySelector(".stay-in-loop-email input");
  if (testEmail(emailInput.value)) {
    document.querySelector(".news").style.display = "flex";
    emailInput.value = "";
    emailInput.classList.remove("wrong-email");
    setTimeout(notificationNewsNone, 2900);
  }
  else {
    emailInput.classList.add("wrong-email");
  }
}

function cookieManage(formName, age) {
  document.cookie = `${formName}=${eval(formName).value}; max-age=${age}`;
}

function notificationNone() {
  document.querySelector(".call-back").style.display = "none";
}

function notificationNewsNone() {
  document.querySelector(".news").style.display = "none";
}

window.onclick = function (event) {
  if (event.target === modal) {
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

  let gap,
    commentWidth,
    comments = document.querySelectorAll(".portfolio-comment"),
    commentNames = document.querySelectorAll(".comment-name"),
    commentEmails = document.querySelectorAll(".comment-email"),
    commentBodies = document.querySelectorAll(".comment-body");

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
    CalcSliderGap();
    offset += commentWidth + gap;
    if (offset > (commentWidth + gap) * 3) {
      offset = 0;
    }
    CalcSliderOffset();
  });

  document.querySelector(".prev-button").addEventListener("click", function () {
    CalcSliderGap();
    offset -= commentWidth + gap;
    if (offset < 0) {
      offset = (commentWidth + gap) * 3;
    }
    CalcSliderOffset();
  });

  function CalcSliderGap() {
    gap = comments[1].offsetLeft - comments[0].offsetLeft - comments[0].offsetWidth;
    commentWidth = comments[0].offsetWidth;
    return { gap, commentWidth };
  }

  function CalcSliderOffset() {
    document.querySelector(".portfolio-comment-div").style.left = - offset + "px";
  }
}

//burger

let burgerIcon = document.querySelector(".burger-icon"),
  burgerBody = document.querySelector(".burger"),
  burgerList = document.querySelectorAll(".burger li");
    
burgerIcon.onclick = function () { 
  burgerBody.classList.toggle('display-burger');
}

for (let i = 0; i < burgerList.length; i++) {
  burgerList[i].onclick = function () {
    burgerBody.classList.toggle('display-burger');
  }
}





