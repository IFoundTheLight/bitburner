/** @param {NS} ns */
export async function main(ns) 
{
  let remoteHost = ns.args[0];
  let maxThreads = ns.args[1];
  let scriptHost = ns.getHostname();

  while(true)
  {
    // Grow Remote
    let growTime = await ns.getGrowTime(remoteHost);
    //let growThreads = await ns.growthAnalyze(remoteHost, 10000, 1);
    //growThreads = Math.round(growThreads);
    await ns.tprint(`[${scriptHost}] Grow ${remoteHost} with ${maxThreads} threads, should take ${getTime(growTime)}`);
    await ns.grow(remoteHost, {threads: maxThreads});
    let remoteHostMoney = await ns.getServerMoneyAvailable(remoteHost);

    // Weaken Remote
    let weakenTime = await ns.getWeakenTime(remoteHost);
    //let weakenThreads = await ns.weakenAnalyze(remoteHost, 1);
    //weakenThreads = Math.round(weakenThreads);
    await ns.tprint(`[${scriptHost}] Weaken ${remoteHost} with ${maxThreads} threads, should take ${getTime(weakenTime)}`);
    await ns.weaken(remoteHost, {threads: maxThreads});


    // Hack Remote
    //let hackThreads = await ns.hackAnalyzeThreads(remoteHost, remoteHostMoney);
    //hackThreads = Math.round(hackThreads);
    let hackingTime = await ns.getHackTime(remoteHost);
    await ns.tprint(`[${scriptHost}] Hacking ${remoteHost} with ${maxThreads} threads, should take ${getTime(hackingTime)}`);
    let moneygotten = await ns.hack(remoteHost, {threads: maxThreads});
    await ns.tprint(`[${scriptHost}] Hacked ${remoteHost} and got ${ns.formatNumber(moneygotten, 2, 1000, false)}.`);
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