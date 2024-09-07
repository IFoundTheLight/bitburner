const ALLSERVERSFILE = "allservers.txt";
const ALLSERVERINFOFILE = "allserverinfo.txt";

/** @param {NS} ns */
export async function main(ns)
{
    // Read All Servers File
    let allServers = await ns.read(ALLSERVERSFILE).split('\n');
    let allServerInformation = [];

    // Loop over server and collect information
    for(var i = 0; i < allServers.length; i++)
    {
      let serverName = allServers[i].trim();
   
      if (await ns.serverExists(serverName))
      {
        try
        {
          let serverInfo = await ns.getServer(serverName);
          allServerInformation.push(serverInfo);
          await ns.print(`Server: ${serverName} found and added.`);
        }
        catch
        {
          await ns.print(`Server: ${serverName} found but failed to add.`);
        }
      }
      else
      {
        await ns.print(`Server: ${serverName} not found.`);
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

    await ns.print(`Server: ${maxMoneyServer} most money at ${ns.formatNumber(maxMoneyServerAmount, 2, 1000, false)}.`);

    for(var i = 0; i < allServerInformation.length; i++)
    {
      if (allServerInformation[i].backdoorInstalled)
      {
        await ns.print(`Server: ${allServerInformation[i].hostname} backdoor installed.`);
      }
    }

    // Log Information
    await ns.write(ALLSERVERINFOFILE, JSON.stringify(allServerInformation, null, "\t"), "w");
}

class ServerInformation
{
    constructor(name, maxmoney, backdoor, hacked, memory, files)
    {
      this.Name = name;
      this.MaxMoney = maxmoney;
      this.Backdoor = backdoor;
      this.Hacked = hacked;
      this.Memory = memory;
      this.Files = files;
    }
}