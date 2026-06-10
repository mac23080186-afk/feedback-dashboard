require("dotenv").config();
const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  }),
});

const db = admin.firestore();
const COLLECTION = "feedback";

const app = express();
app.use(cors());
app.use(express.json());

// POST /api/feedback — save a new entry
app.post("/api/feedback", async (req, res) => {
  try {
    const { name, location, rating, comment } = req.body;
    if (!rating || !comment) {
      return res.status(400).json({ error: "rating and comment are required" });
    }
    const doc = await db.collection(COLLECTION).add({
      name: name || null,
      location: location || null,
      rating,
      comment,
      submittedAt: new Date().toISOString(),
    });
    res.status(201).json({ id: doc.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save feedback" });
  }
});

// GET /api/feedback — retrieve all entries
app.get("/api/feedback", async (req, res) => {
  try {
    const snapshot = await db.collection(COLLECTION).orderBy("submittedAt", "desc").get();
    const entries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(entries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch feedback" });
  }
});

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
}

module.exports = app;
