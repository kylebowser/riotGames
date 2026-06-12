const express = require("express");
const path = require("path");
const fetch = require("node-fetch");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use((req, res, next) => {
  console.log("Incoming:", req.method, req.url);
  next();
});

app.use(express.static(path.join(__dirname, "dist")));

app.get("/api/player/rank/:puuid", async (req, res) => {
  const { puuid } = req.params;
  console.log("Received PUUID:", puuid); // Debugging log
  const url2 = `https://na1.api.riotgames.com/lol/league/v4/entries/by-puuid/${puuid}`;

  const response = await fetch(url2, {
    headers: {
      "X-Riot-Token": process.env.RIOT_API_KEY,
    },
  });

  const data = await response.json();
  res.json(data);
});

app.get("/api/player/match/:puuid", async (req, res) => {
  const { puuid } = req.params;
  console.log("Received PUUID:", puuid); // Debugging log
  const url = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=2`;

  const response = await fetch(url, {
    headers: {
      "X-Riot-Token": process.env.RIOT_API_KEY,
    },
  });
  const data = await response.json();
  res.json(data);
});

app.get("/api/match/:matchId", async (req, res) => {
  const { matchId } = req.params;
  console.log("Received Match ID:", matchId); // Debugging log
  const url = `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}`;

  const response = await fetch(url, {
    headers: {
      "X-Riot-Token": process.env.RIOT_API_KEY,
    },
  });
  const data = await response.json();
  res.json(data);
});

app.get("/api/player/:name/:tag", async (req, res) => {
  const { name, tag } = req.params;
  console.log("Received name and tag:", name, tag); // Debugging log
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
