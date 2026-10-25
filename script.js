
// showing the time at the top
function updateClock() {
  document.getElementById("clock").textContent =
    new Date().toLocaleString();
}

updateClock();
setInterval(updateClock, 1000);


// opening and closing my apps
let topWindow = 10;

function openApp(id) {
  let app = document.getElementById(id);
  app.style.display = "block";
  app.style.zIndex = ++topWindow;
}

function closeApp(id) {
  document.getElementById(id).style.display = "none";
}


// moving the windows with my mouse
document.querySelectorAll(".window").forEach(function(app) {

  let bar = app.querySelector(".bar");
  let moving = false;
  let x = 0;
  let y = 0;

  app.addEventListener("pointerdown", function() {
    app.style.zIndex = ++topWindow;
  });

  bar.addEventListener("pointerdown", function(e) {
    if (e.target.tagName === "BUTTON") return;
    if (e.button !== 0) return;

    moving = true;

    let position = app.getBoundingClientRect();

    x = e.clientX - position.left;
    y = e.clientY - position.top;

    app.style.left = position.left + "px";
    app.style.top = position.top + "px";

    bar.setPointerCapture(e.pointerId);
  });

  bar.addEventListener("pointermove", function(e) {
    if (!moving) return;

    let left = e.clientX - x;
    let top = e.clientY - y;

    // making sure the windows don't disappear
    left = Math.max(0, Math.min(left, window.innerWidth - 60));
    top = Math.max(48, Math.min(top, window.innerHeight - 60));

    app.style.left = left + "px";
    app.style.top = top + "px";
  });

  bar.addEventListener("pointerup", function() {
    moving = false;
  });

  bar.addEventListener("pointercancel", function() {
    moving = false;
  });
});


// little pages about me
let pages = [
  {
    title: "My Story",
    text: "Hi, I'm Zemal! I'm a student from Pakistan. I love trying new things and learning different skills. Coding can be confusing sometimes, but I really like the feeling when something finally works after trying again and again."
  },
  {
    title: "My Projects",
    text: "I started with my personal website. Then I made Out of Sync using Godot, which was definitely not easy! After that, I made my Slack bot called ZemalBot. And now I'm making this mini OS. I never thought I would make all these things!"
  },
  {
    title: "My Dreams",
    text: "One of my biggest dreams is to study abroad. I would love to travel, learn different languages, meet new people and explore the world. I also want to keep learning and make my family proud one day."
  },
  {
    title: "Things I Love",
    text: "I love music, travelling, learning Turkish and meeting new people. I also like discovering free courses and new opportunities. There are so many things I want to try and learn!"
  }
];

function journalPage(number) {
  document.getElementById("journalTitle").textContent =
    pages[number].title;

  document.getElementById("journalText").textContent =
    pages[number].text;
}

journalPage(0);


// filtering my projects
function filterProjects(type) {
  let projects = document.querySelectorAll(".project");

  projects.forEach(function(project) {
    if (type === "all" || project.dataset.type === type) {
      project.style.display = "block";
    } else {
      project.style.display = "none";
    }
  });
}


// countries i want to visit
let countries = [
  {
    name: "Türkiye",
    flag: "🇹🇷",
    text: "Türkiye is one of my biggest dreams! I love the Turkish language and culture, and I would really love to study there one day.",
    places: "Places I want to see: Istanbul, Cappadocia and Antalya."
  },
  {
    name: "South Korea",
    flag: "🇰🇷",
    text: "I would love to see South Korea, explore the cities and learn more about its culture.",
    places: "Places I want to see: Seoul, Busan and Jeju."
  },
  {
    name: "Japan",
    flag: "🇯🇵",
    text: "Japan looks so beautiful, especially during cherry blossom season. I would love to explore it!",
    places: "Places I want to see: Tokyo, Kyoto and Osaka."
  },
  {
    name: "Switzerland",
    flag: "🇨🇭",
    text: "I really want to see the mountains, lakes and peaceful villages in Switzerland.",
    places: "Places I want to see: Lucerne, Interlaken and Zurich."
  },
  {
    name: "Italy",
    flag: "🇮🇹",
    text: "I would love to visit Italy one day! I want to explore its beautiful cities, learn about its history and try Italian food.",
    places: "Places I want to see: Rome, Venice and Florence."
  }
];

let currentCountry = 0;


// keeping my wishlist saved after refreshing
let wishlist = [];

try {
  wishlist = JSON.parse(localStorage.getItem("zemalWishlist")) || [];

  if (!Array.isArray(wishlist)) {
    wishlist = [];
  }
} catch (error) {
  wishlist = [];
}

wishlist = wishlist.filter(function(number) {
  return Number.isInteger(number) &&
    number >= 0 && number < countries.length;
});

wishlist = [...new Set(wishlist)];


// showing the country i clicked
function showCountry(number) {
  currentCountry = number;

  let country = countries[number];

  document.getElementById("countryEmoji").textContent =
    country.flag;

  document.getElementById("countryName").textContent =
    country.name;

  document.getElementById("countryText").textContent =
    country.text;

  document.getElementById("countryPlaces").textContent =
    country.places;

  let button = document.getElementById("saveButton");

  button.textContent = wishlist.includes(number)
    ? "Remove from wishlist ♥"
    : "Add to wishlist ♡";
}


// adding or removing countries
function saveCountry() {
  if (wishlist.includes(currentCountry)) {

    wishlist = wishlist.filter(function(number) {
      return number !== currentCountry;
    });

  } else {
    wishlist.push(currentCountry);
  }

  try {
    localStorage.setItem(
      "zemalWishlist",
      JSON.stringify(wishlist)
    );
  } catch (error) {
    console.log("Could not save wishlist");
  }

  showCountry(currentCountry);
  updateWishlist();
}


// showing my saved countries
function updateWishlist() {
  let names = wishlist.map(function(number) {
    return countries[number].flag + " " + countries[number].name;
  });

  document.getElementById("myWishlist").textContent =
    names.length ? names.join("  •  ") : "No places saved yet!";
}

showCountry(0);
updateWishlist();


// little messages on my desktop
let messages = [
  "🌸 Welcome to my little world!",
  "Some days coding is so confusing!",
  "But getting something to work feels amazing!",
  "One day I hope to study in Türkiye 🇹🇷",
  "Still learning, still trying ♡"
];

let messageNumber = 0;

function changeMessage() {
  messageNumber++;

  if (messageNumber === messages.length) {
    messageNumber = 0;
  }

  document.getElementById("myMessage").textContent =
    messages[messageNumber];
}
