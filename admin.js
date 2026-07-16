// ===============================
// JSONBin Setup
// ===============================
const BIN_ID = "6a590637da38895dfe66e344";
const API_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;
const LATEST_URL = `${API_URL}/latest`;

// Leave API_KEY empty if your bin is PUBLIC
const API_KEY = ""; 


// ===============================
// Add Update
// ===============================
document.getElementById("updateForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const version = document.getElementById("version").value;
  const caption = document.getElementById("caption").value;
  const image = document.getElementById("image").value;

  document.getElementById("status").innerText = "Adding update...";

  try {
    // 1. Load existing updates
    const loadRes = await fetch(API_URL, {
      headers: { "X-Master-Key": API_KEY }
    });

    const data = await loadRes.json();
    let updates = data.record.updates || [];

    // 2. Add new update
    const newUpdate = {
      version,
      caption,
      image,
      date: new Date().toLocaleDateString()
    };

    updates.push(newUpdate);

    // 3. Save back to JSONBin
    const saveRes = await fetch(API_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": API_KEY
      },
      body: JSON.stringify({ updates })
    });

    if (!saveRes.ok) throw new Error("Failed to save update.");

    document.getElementById("status").innerText = "Update added successfully!";
    document.getElementById("updateForm").reset();

    loadUpdates(); // refresh list

  } catch (err) {
    console.error(err);
    document.getElementById("status").innerText = "Error adding update.";
  }
});


// ===============================
// Load Updates
// ===============================
function loadUpdates() {
  fetch(LATEST_URL)
    .then(res => res.json())
    .then(data => {
      const updates = data.record.updates || [];
      const list = document.getElementById("updatesList");
      list.innerHTML = "";

      updates.forEach((update, index) => {
        const item = document.createElement("div");
        item.innerHTML = `
          <div style="border:1px solid #ccc; padding:10px; margin:10px 0;">
            <p><strong>Version:</strong> ${update.version}</p>
            <p><strong>Caption:</strong> ${update.caption}</p>
            <p><strong>Date:</strong> ${update.date}</p>
            <img src="${update.image}" style="max-width:200px; display:block; margin:10px 0;">
          </div>
        `;
        list.appendChild(item);
      });
    });
}


// ===============================
// PIN System
// ===============================
const ADMIN_PIN = "2801";

// Hide admin content until unlocked
document.getElementById("adminContent").style.display = "none";

document.getElementById("pinSubmit").addEventListener("click", () => {
  const entered = document.getElementById("pinInput").value;

  if (entered === ADMIN_PIN) {
    document.getElementById("pinStatus").innerText = "Unlocked!";
    document.getElementById("adminContent").style.display = "block";
    document.getElementById("adminPinLock").style.display = "none";
    loadUpdates();
  } else {
    document.getElementById("pinStatus").innerText = "Incorrect PIN.";
  }
});
