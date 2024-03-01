const knex = require("../knexfile");
const db = require("knex")(knex.development);

exports.add_user = async (req, res) => {
  try {
    const { uid, name, email } = req.body;

    if (!uid || !email) {
      return res.status(400).json({ error: "Missing UID or email" });
    }

    const existingUser = await db("users").where({ email }).first();
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    await db("users").insert({
      uid,
      name,
      email,
    });

    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
