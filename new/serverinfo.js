import * as modelModule from "models-module.js"
import * as cacheModule from "cache-module.js"

/** @param {NS} ns */
export async function main(ns)
{
  let allServerInformation = [];

  // Load Cached Servers
  let responseData = await cacheModule.getCacheItem(ns, "Servers");
  let allServers = new modelModule.Servers();
  let list = atob(responseData.data.value);
  let oj = JSON.parse(list);
  allServers.loadData(oj);

  // Loop over server and collect information
  for(var i = 0; i < allServers.servers.length; i++)
  {
    let serverName = allServers.servers[i].trim();
  
    if (await ns.serverExists(serverName))
    {
      try
      {
        let serverInfo = await ns.getServer(serverName);
        let serverInfoO = new modelModule.Server();
        serverInfoO.loadData(serverInfo);
        allServerInformation.push(serverInfoO);
      }
      catch
      {
        await ns.tprint(`Server: ${serverName} found but add failed.`);
      }
    }
    else
    {
      await ns.tprint(`Server: ${serverName} not found.`);
    }
  }

  var maxMoneyServer = "";
  var maxMoneyServerAmount = 0;

  for(var i = 0; i < allServerInformation.length; i++)
  {
    if (allServerInformation[i].moneyMax > maxMoneyServerAmount)
    {
        maxMoneyServer = allServerInformation[i].hostname;
        maxMoneyServerAmount = allServerInformation[i].moneyMax;
    }
  }

  await ns.tprint(`Server: ${maxMoneyServer} most money at ${ns.formatNumber(maxMoneyServerAmount, 2, 1000, false)}.`);

  for(var i = 0; i < allServerInformation.length; i++)
  {
    if (allServerInformation[i].backdoorInstalled)
    {
      await ns.tprint(`Server: ${allServerInformation[i].hostname} backdoor installed.`);
    }
  }

  for(var i = 0; i < allServerInformation.length; i++)
  {
    let currentServer = allServerInformation[i];

    //    
    await ns.tprint(`ServerInfo.${currentServer.hostname}`);

    // Update Cache With Data
    await cacheModule.setCacheItem(ns, `ServerInfo.${currentServer.hostname}`, currentServer);
  }
}