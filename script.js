// 🌟 Splash screen fade-out
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("splash").style.opacity = "0";
    setTimeout(() => {
      document.getElementById("splash").style.display = "none";
    }, 500);
  }, 1500);
});

// 🌿 Load updates from JSONBin
fetch("https://api.jsonbin.io/v3/b/6a590637da38895dfe66e344/latest")
  .then(res => res.json())
  .then(data => {
    let updates = data.record.updates;
    let container = document.getElementById("updates");

    updates.forEach(update => {
      let card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h3>${update.version}</h3>
        <p>Released: ${update.date}</p>
        ${update.image ? `<img src="${update.image}" class="update-img">` : ""}
        ${update.caption ? `<p class="caption">${update.caption}</p>` : ""}
      `;

      container.appendChild(card);
    });
  });
const BIN_ID = "6a591ba1f5f4af5e2998cfa1";
const API_KEY = "$2a$10$mVBkzAUW9xCVKY7NrR3JaunqSheQYsKVdnlNRmHx0ts0eG7TAqj/2";

async function incrementVisit() {
  const url = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

  // 1. Get current count
  const getRes = await fetch(url, {
    headers: {
      "X-Master-Key": API_KEY
    }
  });
  const data = await getRes.json();
  const current = data.record.visits;

  // 2. Update count
  const newCount = current + 1;

  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": API_KEY
    },
    body: JSON.stringify({ visits: newCount })
  });

  // 3. Display it
  const el = document.getElementById("visit-count");
  if (el) el.textContent = newCount;
}

incrementVisit();
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="style.css">
</head>
<body>

<div id="splash">
  <div id="splash-box">
    <h2>Loading Minecraft Version Tracker...</h2>
  </div>
</div>

<button id="stevebot-open">SteveBot</button>

<h1>Minecraft Version Tracker</h1>
<div id="updates"></div>

<p>Total Visits: <span id="visit-count">Loading...</span></p>

<!-- SteveBot Sidebar -->
<div id="stevebot-sidebar">
  <div id="stevebot-header">SteveBot</div>
  <div id="stevebot-messages"></div>
  <input id="stevebot-input" type="text" placeholder="Ask SteveBot something...">
  <button id="stevebot-send">Send</button>
</div>

<script src="script.js"></script>
</body>
</html>
