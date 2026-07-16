// Your JSONBin info
const BIN_ID = "6a590637da38895dfe66e344";
const API_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;
const LATEST_URL = `${API_URL}/latest`;

// If your bin is PUBLIC, you do NOT need an API key.
// If your bin is PRIVATE, JSONBin will reject the request unless you add your key.
const API_KEY = ""; // leave empty for public bins

document.getElementById("updateForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const version = document.getElementById("version").value;
  const caption = document.getElementById("caption").value;
  const image = document.getElementById("image").value;

  document.getElementById("status").innerText = "Adding update...";

  try {
    // 1. Get current updates
    const saveRes = await fetch("https://api.jsonbin.io/v3/b/6a590637da38895dfe66e344", {
      headers: {
        "X-Master-Key": API_KEY
      }
    });

    const data = await saveRes.json();
    let updates = data.record.updates || [];

    // 2. Add new update
    const newUpdate = {
      version: version,
      caption: caption,
      image: image,
      date: new Date().toLocaleDateString()
    };

    updates.push(newUpdate);

    // 3. Save back to JSONBin
    const saveRes = await fetch(LATEST_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": API_KEY
      },
      body: JSON.stringify({ updates })
    });

    if (!saveRes.ok) {
      throw new Error("Failed to save update.");
    }

    document.getElementById("status").innerText = "Update added successfully!";
    document.getElementById("updateForm").reset();

  } catch (err) {
    console.error(err);
    document.getElementById("status").innerText = "Error adding update.";
  }
});
function loadUpdates() {
    fetch("https://api.jsonbin.io/v3/b/6a590637da38895dfe66e344/latest")
        .then(res => res.json())
        .then(data => {
            const updates = data.record.updates;
            const list = document.getElementById("updatesList");
            list.innerHTML = "";

            updates.forEach((update, index) => {
                const item = document.createElement("div");
                item.innerHTML = `
                    <div style="border:1px solid #ccc; padding:10px; margin:10px 0;">
                        <p><strong>Caption:</strong> ${update.caption}</p>
                        <p><strong>Date:</strong> ${update.date}</p>
                        <img src="${update.image}" style="max-width:200px; display:block; margin:10px 0;">
                        <button onclick="editUpdate(${index})">Edit</button>
                    </div>
                `;
                list.appendChild(item);
            });
        });
}

loadUpdates();
const ADMIN_PIN = "2801"; // change this to your PIN

// Hide entire admin content until unlocked
document.getElementById("adminContent").style.display = "none";

document.getElementById("pinSubmit").addEventListener("click", () => {
  const entered = document.getElementById("pinInput").value;

  if (entered === ADMIN_PIN) {
    document.getElementById("pinStatus").innerText = "Unlocked!";
    document.getElementById("adminContent").style.display = "block";
    document.getElementById("adminPinLock").style.display = "none";
  } else {
    document.getElementById("pinStatus").innerText = "Incorrect PIN.";
  }
});
