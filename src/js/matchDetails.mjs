import ExternalServices from "./ExternalServices.mjs";

const dataSource = new ExternalServices();

export default class MatchDetails {
  constructor(dataSource, name) {
    this.dataSource = dataSource;
    this.name = name;
  }

  async init() {
    this.matchInfoContainer = document.querySelector(".match");
    this.matchInfoContainer.innerHTML = ``;
    const getId = await this.dataSource.getId(this.name);
    this.puuid = getId.puuid;
    console.log(this.puuid);
    console.log("HEREERERER1");
    const matchList = await this.dataSource.getMatchList(this.puuid);
    console.log("HEREERERER2");
    console.log("Match list raw:", matchList[0]);
    //const matchId = matchList[0];
    for (const matchId of matchList) {
      const matchData = await this.dataSource.getMatchDetails(matchId);
      console.log("Match data raw:", matchData);
      this.matchData = matchData;
      this.renderMatchDetails();
    }
  }
  renderMatchDetails() {
    //const matchInfoContainer = document.querySelector(".match");
    for (const summoner of this.matchData.info.participants) {
      if (summoner.puuid === this.puuid) {
        const iconUrl = `https://ddragon.leagueoflegends.com/cdn/16.12.1/img/profileicon/${summoner.profileIcon}.png`;
        document.querySelector(".profile-icon").src = iconUrl;
        const kda = (summoner.kills + summoner.assists) / summoner.deaths;
        const matchEntry = document.createElement("div");
        matchEntry.innerHTML = `
        <h2>${summoner.riotIdGameName}</h2>
        <p>Game Mode: ${this.matchData.info.gameMode}</p>
        <p>Game Type: ${this.matchData.info.gameType}</p>
        <p>Tier: ${summoner.championName}</p>
        <img class="champ-img" alt="Champion Image" />
        <p>${summoner.kills}/${summoner.deaths}/${summoner.assists}</p>
        <p>KDA: ${kda.toFixed(2)}</p>
      `;
        if (summoner.win) {
          matchEntry.classList.add("win");
        } else {
          matchEntry.classList.add("loss");
        }
        const champ = summoner.championName;
        const patch = "16.12.1"; // or fetch dynamically

        const imgUrl = `https://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${champ}.png`;

        matchEntry.querySelector(".champ-img").src = imgUrl;
        this.matchInfoContainer.appendChild(matchEntry);
      }
    }
  }
}
