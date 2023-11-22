/** @param {NS} ns */
export async function main(ns) {
    let remoteHost = ns.args[0];
    let moneyWanted = ns.args[1];
    let maxMoney = await ns.getServerMaxMoney(remoteHost);
    let growthMultipler = await ns.getServerGrowth(remoteHost);
  
    let threadCountForGrowth = ns.growthAnalyze(remoteHost, growthMultipler, 4);
  
    if (maxMoney < moneyWanted)
    {
      moneyWanted = maxMoney;
    }
  
    let threadCountForHack = await ns.hackAnalyzeThreads(remoteHost, moneyWanted);
  
    
  
    await ns.tprint(`Maximum Money: ${ns.formatNumber(maxMoney, 2, 1000, false)}`);
    await ns.tprint(`Thread Count for Growth: ${threadCountForGrowth}`);
    await ns.tprint(`Thread Count for Hack: ${threadCountForHack}`);
  }