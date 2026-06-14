var e=(e,t)=>()=>(e&&(t=e(e=0)),t),t=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports);(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function n(e,t,n,r){t.innerHTML=e,r&&r(n)}async function r(e){return await(await fetch(e)).text()}async function i(){let e=await r(`/partials/header.html`),t=await r(`/partials/footer.html`),i=document.querySelector(`#main-header`),a=document.querySelector(`#main-footer`);n(e,i),n(t,a)}var a=e((()=>{})),o,s=e((()=>{o=class{constructor(){}async getId(e){return(await fetch(`/api/player/${e}/NA1`)).json()}async getRank(e){return console.log(`Fetching rank for PUUID:`,e),(await fetch(`/api/player/rank/${e}`)).json()}async getMatchList(e){return console.log(`Fetching match list for PUUID:`,e),(await fetch(`/api/matchList/${e}`)).json()}async getMatchDetails(e){return console.log(`Fetching match details for Match ID:`,e),(await fetch(`/api/match/${e}`)).json()}}})),c,l=e((()=>{s(),new o,c=class{constructor(e,t){this.dataSource=e,this.name=t}async init(){let e=await this.dataSource.getId(this.name);this.playerData=e,this.renderPlayerDetails()}renderPlayerDetails(){let e=document.querySelector(`.player-info`);e.innerHTML=`
      <h2>Player Details</h2>
      <p>Name: ${this.playerData.gameName}</p>
      <p>Tagline: ${this.playerData.tagLine}</p>
      <p>PUUID: ${this.playerData.puuid}</p>
      <img class="profile-icon" alt="Profile Icon" />
    `}}})),u,d=e((()=>{s(),new o,u=class{constructor(e,t){this.dataSource=e,this.name=t}async init(){let e=(await this.dataSource.getId(this.name)).puuid;console.log(e);let t=await this.dataSource.getRank(e);this.rankData=t,this.renderRankDetails()}renderRankDetails(){let e=document.querySelector(`.rank`);console.log(this.rankData),e.innerHTML=``;for(let t of this.rankData){let n=document.createElement(`div`);n.innerHTML=`
        <h2>${t.queueType}</h2>
        <p>Tier: ${t.tier}</p>
        <p>Rank: ${t.rank}</p>
        <p>League Points: ${t.leaguePoints}</p>
        <p>Wins: ${t.wins}</p>
        <p>Losses: ${t.losses}</p>
        <p>Win Rate: ${(t.wins/(t.wins+t.losses)*100).toFixed(2)}%</p>
      `,e.appendChild(n)}}}})),f,p=e((()=>{s(),new o,f=class{constructor(e,t){this.dataSource=e,this.name=t}async init(){this.matchInfoContainer=document.querySelector(`.match`),this.matchInfoContainer.innerHTML=``;let e=await this.dataSource.getId(this.name);this.puuid=e.puuid,console.log(this.puuid),console.log(`HEREERERER1`);let t=await this.dataSource.getMatchList(this.puuid);console.log(`HEREERERER2`),console.log(`Match list raw:`,t[0]);for(let e of t){let t=await this.dataSource.getMatchDetails(e);console.log(`Match data raw:`,t),this.matchData=t,this.renderMatchDetails()}}renderMatchDetails(){let e=document.createElement(`details`);e.classList.add(`card`);for(let e of this.matchData.info.participants)if(e.puuid===this.puuid){this.main=e;break}document.querySelector(`.profile-icon`).src=`https://ddragon.leagueoflegends.com/cdn/16.12.1/img/profileicon/${this.main.profileIcon}.png`,this.main.win?e.classList.add(`win`):e.classList.add(`loss`);let t=(this.main.kills+this.main.assists)/this.main.deaths;e.innerHTML=`
      <summary>
        <p>${this.main.riotIdGameName}</p>
        <p>Game Mode: ${this.matchData.info.gameMode}</p>
        <p>Champion: ${this.main.championName}</p>
        <p>Position: ${this.main.teamPosition}</p>
        <img class="main-champ-img" alt="Champion Image" />
        <p>${this.main.kills}/${this.main.deaths}/${this.main.assists} KDA: ${t.toFixed(2)}</p>
      </summary>
      <div class="accordion-content">
        </div>
    `,e.querySelector(`.main-champ-img`).src=`https://ddragon.leagueoflegends.com/cdn/16.12.1/img/champion/${this.main.championName}.png`;let n=e.querySelector(`.accordion-content`);for(let e of this.matchData.info.participants)if(e.puuid!==this.puuid){let t=(e.kills+e.assists)/e.deaths,r=document.createElement(`section`);r.innerHTML=`
          <p class="linker">${e.riotIdGameName}</p>
          <p>Champion: ${e.championName}</p>
          <p>Position: ${e.teamPosition}</p>
          <img class="champ-img" alt="Champion Image" />
          <p>${e.kills}/${e.deaths}/${e.assists} KDA: ${t.toFixed(2)}</p>
        `,e.win?r.classList.add(`win`):r.classList.add(`loss`),r.querySelector(`.champ-img`).src=`https://ddragon.leagueoflegends.com/cdn/16.12.1/img/champion/${e.championName}.png`,n.appendChild(r)}this.matchInfoContainer.appendChild(e)}}}));t((()=>{a(),l(),s(),d(),p(),i(),document.addEventListener(`DOMContentLoaded`,()=>{document.querySelector(`form`).addEventListener(`submit`,e=>{e.preventDefault();let t=document.querySelector(`#summoner-name`).value;console.log(`Form submitted with:`,t);let n=new o;new c(n,t).init(),new u(n,t).init(),new f(n,t).init()})}),document.addEventListener(`DOMContentLoaded`,()=>{document.querySelector(`.linker`).addEventListener(`.linker`,e=>{e.preventDefault();let t=document.querySelector(`.linker`).value;console.log(`Form submitted with:`,t);let n=new o;new c(n,t).init(),new u(n,t).init(),new f(n,t).init()})})}))();