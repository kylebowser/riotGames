import ExternalServices from "./ExternalServices.mjs";

const dataSource = new ExternalServices();

export default class Rank {
  constructor(dataSource, name) {
    this.dataSource = dataSource;
    this.name = name;
  }

  async init() {
    const getId = await this.dataSource.getId(this.name);
    const puuid = getId.puuid;
    console.log(puuid);
    const rankData = await this.dataSource.getRank(puuid);
    this.rankData = rankData;
    this.renderRankDetails();
  }
  renderRankDetails() {
    const rankInfoContainer = document.querySelector(".rank");
    console.log(this.rankData);
    rankInfoContainer.innerHTML = ``;
    for (const entry of this.rankData) {
      const rankEntry = document.createElement("div");
      rankEntry.innerHTML = `
        <h2>${entry.queueType}</h2>
        <p>Tier: ${entry.tier}</p>
        <p>Rank: ${entry.rank}</p>
        <p>League Points: ${entry.leaguePoints}</p>
        <p>Wins: ${entry.wins}</p>
        <p>Losses: ${entry.losses}</p>
        <p>Win Rate: ${((entry.wins / (entry.wins + entry.losses)) * 100).toFixed(2)}%</p>
      `;
      rankInfoContainer.appendChild(rankEntry);
    }
  }
  // rankInfoContainer.innerHTML = `
  //   <h2>Rank Details</h2>
  //   <p>League: ${this.rankData[0].leagueName}</p>
  //   <p>Division: ${this.rankData[0].division}</p>
  //   <p>Points: ${this.rankData[0].leaguePoints}</p>
  // `;
}
