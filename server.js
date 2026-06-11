const express = require("express");
const path = require("path");
const fetch = require("node-fetch");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(express.static(path.join(__dirname, "dist")));

app.get("/api/player/:name/:tag", async (req, res) => {
  const { name, tag } = req.params;

  const url = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${name}/${tag}`;

  const response = await fetch(url, {
    headers: {
      "X-Riot-Token": process.env.RIOT_API_KEY,
    },
  });

  const data = await response.json();
  res.json(data);
});

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

app.listen(3000, () => console.log("Server running on port 3000"));
