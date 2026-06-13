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
        const matchEntry = document.createElement("div");
        matchEntry.innerHTML = `
        <h2>${summoner.riotIdGameName}</h2>
        <p>Tier: ${summoner.championName}</p>
      `;
        if (summoner.win) {
          matchEntry.classList.add("win");
        } else {
          matchEntry.classList.add("loss");
        }
        this.matchInfoContainer.appendChild(matchEntry);
      }
    }
  }
}
