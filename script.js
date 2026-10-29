
// clock
function updateClock() {
  document.getElementById("clock").textContent = new Date().toLocaleTimeString();
}
updateClock();
setInterval(updateClock, 1000);


// windows
let topWindow = 10;

function openApp(id) {
  let app = document.getElementById(id);
  app.style.display = "block";
  app.style.zIndex = ++topWindow;
}

function closeApp(id) {
  document.getElementById(id).style.display = "none";
}


// dragging windows
document.querySelectorAll(".window").forEach(function(app) {
  let bar = app.querySelector(".bar");
  let x, y, moving = false;

  app.addEventListener("pointerdown", function() {
    app.style.zIndex = ++topWindow;
  });

  bar.addEventListener("pointerdown", function(e) {
    if (e.target.tagName === "BUTTON" || e.button !== 0) return;
    if (window.innerWidth <= 650) return;

    moving = true;
    let pos = app.getBoundingClientRect();
    x = e.clientX - pos.left;
    y = e.clientY - pos.top;

    app.style.left = pos.left + "px";
    app.style.top = pos.top + "px";
    bar.setPointerCapture(e.pointerId);
  });

  bar.addEventListener("pointermove", function(e) {
    if (!moving) return;

    let left = Math.max(0, Math.min(e.clientX - x, innerWidth - 70));
    let top = Math.max(45, Math.min(e.clientY - y, innerHeight - 50));

    app.style.left = left + "px";
    app.style.top = top + "px";
  });

  function stopMoving() {
    moving = false;
  }

  bar.addEventListener("pointerup", stopMoving);
  bar.addEventListener("pointercancel", stopMoving);
  bar.addEventListener("lostpointercapture", stopMoving);
});


// timer
let seconds = 0;
let timerInterval;

function updateTimer() {
  let minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  let secs = String(seconds % 60).padStart(2, "0");
  document.getElementById("timer").textContent = minutes + ":" + secs;
}

function startTimer() {
  let button = document.getElementById("timerBtn");

  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
    button.textContent = "Start";
  } else {
    timerInterval = setInterval(function() {
      seconds++;
      updateTimer();
    }, 1000);
    button.textContent = "Pause";
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  seconds = 0;
  updateTimer();
  document.getElementById("timerBtn").textContent = "Start";
}


// diary
let pages = [
  {
    title: "My Story",
    text: "Hii, I'm Zemal! I'm from Pakistan and I love learning new things. Coding gets confusing sometimes, but I really enjoy it when something finally works."
  },
  {
    title: "My Projects",
    text: "I started with my personal website. Then I made Out of Sync in Godot and ZemalBot for Slack. Now I'm trying to make my own little desktop!"
  },
  {
    title: "My Dreams",
    text: "I would love to study abroad, travel, learn languages and meet new people. There are so many places I want to visit one day."
  },
  {
    title: "Things I Love",
    text: "Music, travelling, Turkish, finding free courses, and trying different projects. I always have something new I want to learn."
  }
];

let currentPage = 0;

function journalPage(number) {
  currentPage = number;
  document.getElementById("journalTitle").textContent = pages[number].title;
  document.getElementById("journalText").textContent = pages[number].text;
  document.getElementById("pageNumber").textContent = (number + 1) + " / 4";
}

function changePage(direction) {
  journalPage((currentPage + direction + pages.length) % pages.length);
}

journalPage(0);


// my CDs
let projects = [
  {
    title: "My Personal Website",
    text: "The first website I made using HTML and CSS. I wanted somewhere to introduce myself.",
    learned: "I learned how to change layouts and upload my website using GitHub Pages.",
    link: "https://zemaldars01-png.github.io/zemal-personal-site/"
  },
  {
    title: "Out of Sync",
    text: "My first game made with Godot. I had trouble with timers, doors and collisions.",
    learned: "I learned to test things one by one because fixing one bug sometimes caused another.",
    link: ""
  },
  {
    title: "ZemalBot",
    text: "A Slack bot that can say hello, tell jokes and give cat facts.",
    learned: "I learned how bot commands work and enjoyed testing the responses.",
    link: "https://github.com/zemaldars01-png/zemal-slack-bot"
  }
];

let currentProject = 0;

function showProject(number) {
  currentProject = number;
  let project = projects[number];

  document.getElementById("cdNumber").textContent = "CD " + (number + 1) + " / 3";
  document.getElementById("projectTitle").textContent = project.title;
  document.getElementById("projectText").textContent = project.text;
  document.getElementById("projectLearned").textContent = "What I learned: " + project.learned;

  let link = document.getElementById("projectLink");
  link.href = project.link;
  link.style.display = project.link ? "inline" : "none";
}

function changeProject(direction) {
  showProject((currentProject + direction + projects.length) % projects.length);
}

showProject(0);


// countries
let countries = [
  {
    name: "Türkiye", flag: "🇹🇷",
    text: "I'm learning Turkish and would love to study there one day.",
    places: "Istanbul, Cappadocia, Antalya"
  },
  {
    name: "South Korea", flag: "🇰🇷",
    text: "I want to explore the cities and learn more about the culture.",
    places: "Seoul, Busan, Jeju"
  },
  {
    name: "Japan", flag: "🇯🇵",
    text: "I would love to visit Japan during cherry blossom season.",
    places: "Tokyo, Kyoto, Osaka"
  },
  {
    name: "Switzerland", flag: "🇨🇭",
    text: "I want to see the mountains, lakes and beautiful villages.",
    places: "Lucerne, Interlaken, Zurich"
  },
  {
    name: "Italy", flag: "🇮🇹",
    text: "I'd love to see the old cities, explore and try Italian food.",
    places: "Rome, Venice, Florence"
  }
];

let currentCountry = 0;
let wishlist = [];

try {
  wishlist = JSON.parse(localStorage.getItem("zemalWishlist")) || [];
  if (!Array.isArray(wishlist)) wishlist = [];
} catch (error) {
  wishlist = [];
}

wishlist = [...new Set(wishlist.filter(function(n) {
  return Number.isInteger(n) && n >= 0 && n < countries.length;
}))];

function showCountry(number) {
  currentCountry = number;
  let country = countries[number];

  document.getElementById("countryFlag").textContent = country.flag;
  document.getElementById("countryName").textContent = country.name;
  document.getElementById("countryText").textContent = country.text;
  document.getElementById("countryPlaces").textContent = country.places;
  document.getElementById("countryNumber").textContent = (number + 1) + " / 5";
  document.getElementById("saveButton").textContent =
    wishlist.includes(number) ? "♥ Remove" : "♡ Save";
}

function changeCountry(direction) {
  showCountry((currentCountry + direction + countries.length) % countries.length);
}

function saveCountry() {
  if (wishlist.includes(currentCountry)) {
    wishlist = wishlist.filter(function(n) {
      return n !== currentCountry;
    });
  } else {
    wishlist.push(currentCountry);
  }

  try {
    localStorage.setItem("zemalWishlist", JSON.stringify(wishlist));
  } catch (error) {
    console.log("Could not save wishlist");
  }

  showCountry(currentCountry);
  updateWishlist();
}

function updateWishlist() {
  let names = wishlist.map(function(n) {
    return countries[n].flag + " " + countries[n].name;
  });

  document.getElementById("myWishlist").textContent =
    names.length ? names.join(", ") : "Nothing saved yet!";
}

showCountry(0);
updateWishlist();


// search apps
function searchApp() {
  let search = document.getElementById("search").value.toLowerCase();

  if (search.includes("diary") || search.includes("journal")) {
    openApp("journal");
  } else if (search.includes("cd") || search.includes("project")) {
    openApp("projects");
  } else if (search.includes("place") || search.includes("travel")) {
    openApp("travel");
  } else if (search.includes("hello") || search.includes("welcome")) {
    openApp("welcome");
  } else {
    alert("Try searching diary, CDs, places or hello!");
  }
}

document.getElementById("search").addEventListener("keydown", function(e) {
  if (e.key === "Enter") searchApp();
});


// cat and ghost
let catMessages = ["meow!", "purrr", "hello!", "let me sleep"];
let ghostMessages = ["boo!", "hi!", "hehe", "you found me"];
let catCount = 0;
let ghostCount = 0;

function petCat() {
  document.getElementById("catText").textContent =
    catMessages[catCount % catMessages.length];
  catCount++;
}

function talkGhost() {
  document.getElementById("ghostText").textContent =
    ghostMessages[ghostCount % ghostMessages.length];
  ghostCount++;
}
