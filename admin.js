// Your JSONBin info
const BIN_ID = "6a581c12da38895dfe639966";
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
    const getRes = await fetch(LATEST_URL, {
      headers: {
        "X-Master-Key": API_KEY
      }
    });

    const data = await getRes.json();
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
    const saveRes = await fetch(API_URL, {
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
