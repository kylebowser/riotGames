import { loadHeaderFooter, getParam } from "./utils.mjs";
import PlayerDetails from "./playerDetails.mjs";
import ExternalServices from "./ExternalServices.mjs";

const dataSource = new ExternalServices();
const playerDetails = new PlayerDetails(dataSource);
loadHeaderFooter();
playerDetails.init();
