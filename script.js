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
