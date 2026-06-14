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
    const matchEntry = document.createElement("details");
    matchEntry.classList.add("card");
    for (const summoner of this.matchData.info.participants) {
      if (summoner.puuid === this.puuid) {
        this.main = summoner;
        break;
      }
    }

    document.querySelector(".profile-icon").src =
      `https://ddragon.leagueoflegends.com/cdn/16.12.1/img/profileicon/${this.main.profileIcon}.png`;

    if (this.main.win) {
      matchEntry.classList.add("win");
    } else {
      matchEntry.classList.add("loss");
    }

    const kda = (this.main.kills + this.main.assists) / this.main.deaths;

    matchEntry.innerHTML = `
      <summary>
        <p>${this.main.riotIdGameName}</p>
        <p>Game Mode: ${this.matchData.info.gameMode}</p>
        <p>Champion: ${this.main.championName}</p>
        <p>Position: ${this.main.teamPosition}</p>
        <img class="main-champ-img" alt="Champion Image" />
        <p>${this.main.kills}/${this.main.deaths}/${this.main.assists} KDA: ${kda.toFixed(2)}</p>
      </summary>
      <div class="accordion-content">
        </div>
    `;

    matchEntry.querySelector(".main-champ-img").src =
      `https://ddragon.leagueoflegends.com/cdn/16.12.1/img/champion/${this.main.championName}.png`;

    const content = matchEntry.querySelector(".accordion-content");

    for (const summoner of this.matchData.info.participants) {
      if (summoner.puuid !== this.puuid) {
        const kda = (summoner.kills + summoner.assists) / summoner.deaths;

        const section = document.createElement("section");
        section.innerHTML = `
          <p><a class="linker" href="#" target="_blank">${summoner.riotIdGameName}</a></p>
          <p>Champion: ${summoner.championName}</p>
          <p>Position: ${summoner.teamPosition}</p>
          <img class="champ-img" alt="Champion Image" />
          <p>${summoner.kills}/${summoner.deaths}/${summoner.assists} KDA: ${kda.toFixed(2)}</p>
        `;
        if (summoner.win) {
          section.classList.add("win");
        } else {
          section.classList.add("loss");
        }

        section.querySelector(".champ-img").src =
          `https://ddragon.leagueoflegends.com/cdn/16.12.1/img/champion/${summoner.championName}.png`;

        content.appendChild(section);
      }
    }
    this.matchInfoContainer.appendChild(matchEntry);
  }
}

// for (const summoner of this.matchData.info.participants) {
//   if (summoner.puuid === this.puuid) {
//     const iconUrl = `https://ddragon.leagueoflegends.com/cdn/16.12.1/img/profileicon/${summoner.profileIcon}.png`;
//     document.querySelector(".profile-icon").src = iconUrl;
//     const kda = (summoner.kills + summoner.assists) / summoner.deaths;
//     //const matchEntry = document.createElement("div");
//     matchEntry.innerHTML += `
//     <summary>
//     <p>${summoner.riotIdGameName}</p>
//     <p>Game Mode: ${this.matchData.info.gameMode}</p>
//     <p>Champion: ${summoner.championName}</p>
//     <p>Position: ${summoner.teamPosition}</p>
//     <img class="main-champ-img" alt="Champion Image" />
//     <p>${summoner.kills}/${summoner.deaths}/${summoner.assists} KDA: ${kda.toFixed(2)}</p>
//     </summary>
//   `;

//     matchEntry.classList.add("card");
//     if (summoner.win) {
//       matchEntry.classList.add("win");
//     } else {
//       matchEntry.classList.add("loss");
//     }
//     const champ = summoner.championName;
//     const patch = "16.12.1"; // or fetch dynamically

//     const imgUrl = `https://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${champ}.png`;

//     matchEntry.querySelector(".main-champ-img").src = imgUrl;
//   } else {
//     const iconUrl = `https://ddragon.leagueoflegends.com/cdn/16.12.1/img/profileicon/${summoner.profileIcon}.png`;
//     document.querySelector(".profile-icon").src = iconUrl;
//     const kda = (summoner.kills + summoner.assists) / summoner.deaths;
//     //const matchEntry = document.createElement("div");
//     matchEntry.innerHTML += `
//     <section>
//     <p>${summoner.riotIdGameName}</p>
//     <p>Game Mode: ${this.matchData.info.gameMode}</p>
//     <p>Champion: ${summoner.championName}</p>
//     <p>Position: ${summoner.teamPosition}</p>
//     <img class="champ-img" alt="Champion Image" />
//     <p>${summoner.kills}/${summoner.deaths}/${summoner.assists} KDA: ${kda.toFixed(2)}</p>
//     </section>
//   `;

//     const champ = summoner.championName;
//     const patch = "16.12.1"; // or fetch dynamically

//     const imgUrl = `https://ddragon.leagueoflegends.com/cdn/${patch}/img/champion/${champ}.png`;

//     matchEntry.querySelector(".champ-img").src = imgUrl;
//   }
// this.matchInfoContainer.appendChild(matchEntry);
