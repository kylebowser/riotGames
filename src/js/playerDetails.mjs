import ExternalServices from "./ExternalServices.mjs";

const dataSource = new ExternalServices();

export default class PlayerDetails {
  constructor(dataSource) {
    this.dataSource = dataSource;
  }

  async init() {
    const playerData = await this.dataSource.getId("LengthyShadow");
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
