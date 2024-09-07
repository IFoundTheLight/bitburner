/** @param {NS} ns */
export async function main(ns)
{
  let remoteHost = ns.args[0];
  let maxThreads = ns.args[1];

  while(true)
  {
    let weakenTimeSeconds = await ns.getWeakenTime(remoteHost);
    let weakenTimeinTime = getTime(weakenTimeSeconds);
    let minimumSecurity = await ns.getServerMinSecurityLevel(remoteHost);
    let currentSecurity = await ns.getServerSecurityLevel(remoteHost);
    let differenceNeeded = currentSecurity - minimumSecurity;
    let threadsNeeded = 0;
    let threadDifference = 0;
    let weakenAmount = 0;

    while(differenceNeeded > threadDifference)
    {
      threadDifference = ns.weakenAnalyze(threadsNeeded, 4);
      threadsNeeded++;
    }

    if (threadsNeeded > maxThreads)
    {
      // weaken message
      await ns.print(`Weakening security on ${remoteHost}, weaken will take ${weakenTimeinTime}, threads needed ${maxThreads} [${minimumSecurity}, ${currentSecurity}, ${differenceNeeded}]`);

      // weaken
      weakenAmount = await ns.weaken(remoteHost, {threads: Number(maxThreads)});
    }
    else
    {
      // weaken message
      await ns.print(`Weakening security on ${remoteHost}, weaken will take ${weakenTimeinTime}, threads needed ${threadsNeeded} [${minimumSecurity}, ${currentSecurity}, ${differenceNeeded}]`);

      // weaken
      weakenAmount = await ns.weaken(remoteHost, {threads: Number(threadsNeeded)});
    }


    // weaken
    await ns.print(`${remoteHost} weakened by ${ns.formatNumber(weakenAmount, 2, 1000, false)}`);
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