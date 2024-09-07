import * as modelModule from "models-module.js"
import * as cacheModule from "cache-module.js"

/** @param {NS} ns */
export async function main(ns) {

  // Check for Hack Software
  let hostName = await ns.getHostname();
  let model = new modelModule.HomeModel();
  if (hostName == "home")
  {
    // Check if we have these files
    model.hasSMTPHack = await ns.fileExists("relaysmtp.exe");
    model.hasFTPHack = await ns.fileExists("ftpcrack.exe");
    model.hasSSHHack = await ns.fileExists("brutessh.exe");
    model.hasHTTPHack = await ns.fileExists("httpworm.exe");
    model.hasSQLHack = await ns.fileExists("sqlinject.exe");
    model.playerHackLevel = await ns.getHackingLevel();

    // Update Cache With Data
    await cacheModule.setCacheItem(ns, "Home", model);
  }
}