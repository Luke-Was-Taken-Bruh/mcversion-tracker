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
