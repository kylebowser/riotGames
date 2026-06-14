import { loadHeaderFooter, getParam } from "./utils.mjs";
import PlayerDetails from "./playerDetails.mjs";
import ExternalServices from "./ExternalServices.mjs";
import Rank from "./rank.mjs";
import MatchDetails from "./matchDetails.mjs";

loadHeaderFooter();

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.querySelector("#summoner-name").value;

    console.log("Form submitted with:", name); // Debugging log

    const dataSource = new ExternalServices();
    const playerDetails = new PlayerDetails(dataSource, name);
    playerDetails.init();
    const rank = new Rank(dataSource, name);
    rank.init();
    const matchDetails = new MatchDetails(dataSource, name);
    matchDetails.init();
    // const matchDetails = new MatchDetails(dataSource, name);
    // matchDetails.init();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  //const form = document.querySelector(".linker");
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("linker")) {
      e.preventDefault();
      const name = e.target.textContent.trim();

      console.log("Form submitted with:", name); // Debugging log

      document.querySelector(".player-info").innerHTML = "";
      document.querySelector(".rank").innerHTML = "";
      document.querySelector(".match").innerHTML = "";

      const dataSource = new ExternalServices();
      const playerDetails = new PlayerDetails(dataSource, name);
      playerDetails.init();
      const rank = new Rank(dataSource, name);
      rank.init();
      const matchDetails = new MatchDetails(dataSource, name);
      matchDetails.init();
      // const matchDetails = new MatchDetails(dataSource, name);
      // matchDetails.init();
    }
  });
});

// const dataSource = new ExternalServices();
// const playerDetails = new PlayerDetails(dataSource, name);
// loadHeaderFooter();
// playerDetails.init();
// const rank = new Rank(dataSource, name);
// rank.init();
