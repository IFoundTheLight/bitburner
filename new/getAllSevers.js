import * as modelModule from "models-module.js"
import * as cacheModule from "cache-module.js"

/** @param {NS} ns */
export async function main(ns) {

  const ALLSERVERSFILE = "allservers.txt";
  let allServers = await ns.read(ALLSERVERSFILE).split('\n');
  let serverList = new modelModule.Servers();
  for(var i = 0; i < allServers.length; i++)
  {
    let serverName = allServers[i].trim();
    serverList.servers.push(serverName);
  }
  
  // Save Servers List
  await cacheModule.setCacheItem(ns, "Servers", serverList);
}