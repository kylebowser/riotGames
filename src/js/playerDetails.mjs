import ExternalServices from "./ExternalServices.mjs";

const dataSource = new ExternalServices();

export default class PlayerDetails {
  constructor(dataSource, name) {
    this.dataSource = dataSource;
    this.name = name;
  }

  async init() {
    const playerData = await this.dataSource.getId(this.name);
    this.playerData = playerData;
    this.renderPlayerDetails();
  }
  renderPlayerDetails() {
    const playerInfoContainer = document.querySelector(".player-info");
    playerInfoContainer.innerHTML = `
      <h2>Player Details</h2>
      <p>Name: ${this.playerData.gameName}</p>
      <p>Tagline: ${this.playerData.tagLine}</p>
      <p>PUUID: ${this.playerData.puuid}</p>
    `;
  }
}
