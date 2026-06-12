import ExternalServices from "./ExternalServices.mjs";

const dataSource = new ExternalServices();

export default class MatchDetails {
  constructor(dataSource, name) {
    this.dataSource = dataSource;
    this.name = name;
  }

  async init() {
    const getId = await this.dataSource.getId(this.name);
    const puuid = getId.puuid;
    console.log(puuid);
    const matchList = await this.dataSource.getMatchList(puuid);
    const matchId = matchList[0];
    const matchData = await this.dataSource.getMatchDetails(matchId);
    this.matchData = matchData;
    this.renderMatchDetails();
  }
  renderMatchDetails() {
    const matchInfoContainer = document.querySelector(".match");
    console.log(this.matchData);
    matchInfoContainer.innerHTML = ``;
    //for (const entry of this.matchData) {
    const matchEntry = document.createElement("div");
    matchEntry.innerHTML = `
        <h2>${this.matchData.info.participants[0].summonerName}</h2>
        <p>Tier: ${this.matchData.info.participants[0].championName}</p>
      `;
    matchInfoContainer.appendChild(matchEntry);
    //}
  }
}
