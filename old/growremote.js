/** @param {NS} ns */
export async function main(ns) {
  let remoteHost = ns.args[0];

  while(true)
  {
    let growTimeSeconds = await ns.getGrowTime(remoteHost);
    let growTimeinTime = getTime(growTimeSeconds);
    let maxMoney = await ns.getServerMaxMoney(remoteHost);
    let currentMoney = await ns.getServerMoneyAvailable(remoteHost);
    let multiplierNeeded = maxMoney / currentMoney;
    let growthMultipler = await ns.getServerGrowth(remoteHost);
    let totalMultipler = multiplierNeeded / growthMultipler * 100;

    if (totalMultipler < 1)
    {
      totalMultipler = 1;
    }

    let threadCountForGrowth = ns.growthAnalyze(remoteHost, totalMultipler, 4);
    if (threadCountForGrowth < 1)
    {
      threadCountForGrowth = 1;
      continue;
    }

    // Growing message
    await ns.print(`Growing money on ${remoteHost}, grow will take ${growTimeinTime}, threads needed ${threadCountForGrowth} [${maxMoney}, ${currentMoney}, ${multiplierNeeded}, ${growthMultipler}, ${totalMultipler}]`);

    // grow
    let grownAmount = await ns.grow(remoteHost, {threads: Number(threadCountForGrowth)});

    // grown
    await ns.print(`${remoteHost} grew by ${ns.formatNumber(grownAmount, 2, 1000, false)}`);
  }
}

function getTime(timeinseconds) {
    var milli_sec = Math.floor(timeinseconds / 1000);
    var sec_num = parseInt(milli_sec, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return `${hours} hours ${minutes} minutes ${seconds} seconds`;
}