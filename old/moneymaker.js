/** @param {NS} ns */
export async function main(ns)
{
  let remoteHost = ns.args[0];
  
  while(true)
  {
    let remoteHostMoney = await ns.getServerMoneyAvailable(remoteHost);
    let hackThreads = await ns.hackAnalyzeThreads(remoteHost, remoteHostMoney);
    let hackingTime = await ns.getHackTime(remoteHost);

    hackThreads = Math.round(hackThreads);

    await ns.tprint(`Hacking ${remoteHost} with ${hackThreads} threads, should take ${getTime(hackingTime)}`);
    
    let moneygotten = await ns.hack(remoteHost, {threads: hackThreads});

    await ns.tprint(`Hacked ${remoteHost} and got ${ns.formatNumber(moneygotten, 2, 1000, false)}.`);
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