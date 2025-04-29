import express from "express";
import cors from "cors";
import initializeDatabase from "./db";
const app = express();
const port = process.env.PORT || 3000;

/**
 * Welcome to the Fullstack Challenge for the Server!
 *
 * This is a basic express server.
 * You can customize and organize it to your needs.
 * Good luck!
 */
const db = initializeDatabase();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const rows = db.prepare("SELECT * FROM organizations").all();
  res.json({ message: "Welcome to the server! 🎉 Here are all the orgs", rows });
});
app.get("/accounts", (req, res) => {
  const rows = db.prepare("SELECT * FROM accounts").all();
  res.json({ message: "Accounts! 🎉", rows });
});
app.get("/deals/:orgid", (req, res) => {
  const orgId = req.params.orgid;
  console.log(orgId, "This is the org Id that was sent in...")
  try {
    const rows = db.prepare(`
      SELECT
        d.id AS deal_id,
        d.name AS deal_name,
        d.start_date,
        d.end_date,
        d.value,
        d.status,
        d.created_at AS deal_created_at,
        d.updated_at AS deal_updated_at,
        a.id AS account_id,
        a.name AS account_name
      FROM deals d
      JOIN accounts a ON d.account_id = a.id
      WHERE a.organization_id = ?;
    `).all(orgId);

    res.json({ message: `Deals for Organization ID: ${orgId} 🎉`, rows });
  } catch (error: any) {
    console.error("Error fetching deals by organization ID:", error.message);
    res.status(500).json({ error: "Failed to fetch deals" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
