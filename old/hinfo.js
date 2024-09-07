const hackInfoScript = "hinfo.js";
const hackthismachineScript = "hackthismachine.js";

/** @param {NS} ns */
export async function main(ns)
{
  // Scan Hosts
  var connectedHosts = await ns.scan(hostName);

  // Hack the planet
  for (var i = 0; i < connectedHosts.length; i++) {
    await ns.sleep(1000);

    // Get Host Name
    var remoteHost = connectedHosts[i];

    // Hack Server
    //await HackServer(ns, hostName, remoteHost, iftlo);

    await networkSystem.scp(hackthismachineScript, remoteHost);
    await networkSystem.scp(hackInfoScript, remoteHost);
    await networkSystem.exec(hackthismachineScript, remoteHost);
    //await networkSystem.exec(scriptName, hostName, {threads: hackThreads}, hasSMTPHack, hasFTPHack, hasSSHHack, hasHTTPHack, hasSQLHack);
  }
}

// export async function HackServer(networkSystem, hostName, remoteHost, iftlo)
// {
//   if (await networkSystem.serverExists(remoteHost)) {

//     // See if we already have access
//     if (!await networkSystem.hasRootAccess(remoteHost))
//     {
//       var hackLevelNeeded = await networkSystem.getHackingLevel(remoteHost);

//       // We can hack this!
//       if (hackLevelNeeded <= playerHackLevel)
//       {
//         var portNumbersNeeded = await networkSystem.getServerNumPortsRequired(remoteHost);

//         // Check if we have the hack
//         var hackablePorts = 0;
//         hackablePorts += iftlo.hasSMTPHack;
//         hackablePorts += iftlo.hasFTPHack;
//         hackablePorts += iftlo.hasSSHHack;
//         hackablePorts += iftlo.hasHTTPHack;
//         hackablePorts += iftlo.hasSQLHack;

//         // Start Hacking
//         if (hackablePorts >= portNumbersNeeded)
//         {
//           // SMTP Hack
//           if (iftlo.hasSMTPHack) {
//             await networkSystem.relaysmtp(remoteHost);
//           }

//           // FTP Hack
//           if (iftlo.hasFTPHack) {
//             await networkSystem.ftpcrack(remoteHost);
//           }

//           // SSH Hack
//           if (iftlo.hasSSHHack) {
//             await networkSystem.brutessh(remoteHost);
//           }

//           // HTTP Hack
//           if (iftlo.hasHTTPHack) {
//             await networkSystem.httpworm(remoteHost);
//           }

//           // SQL Hack
//           if (iftlo.hasSQLHack) {
//             await networkSystem.sqlinject(remoteHost);
//           }

//           // Nuke
//           await networkSystem.nuke(remoteHost);

//           // Hack
//           await networkSystem.hack(remoteHost);

//           // Print Message
//           // await networkSystem.tprint(`[${hostName}] (${hackInfoScript}) nuked and hacked ${remoteHost}. running hinfo on remote.`);        

//           // Copy this file to the remote host
//           await networkSystem.scp(hackInfoScript, hostName, remoteHost);
//           //await networkSystem.scp("h.js", remoteHost);

//           // run this script there
//           //await ExecuteRemoteScript(networkSystem, hackInfoScript, remoteHost, iftlo.hasSMTPHack, iftlo.hasFTPHack, iftlo.hasSSHHack, iftlo.hasHTTPHack, iftlo.hasSQLHack);
//           //await networkSystem.exec(hackInfoScript, remoteHost, 1, iftlo.hasSMTPHack, iftlo.hasFTPHack, iftlo.hasSSHHack, iftlo.hasHTTPHack, iftlo.hasSQLHack);
//         }
//         else {
//           // Print Message
//           await networkSystem.tprint(`[${hostName}] (${hackInfoScript}) To many needed hack ports for ${remoteHost} - ${hackablePorts} / ${portNumbersNeeded} (SMTP: ${iftlo.hasSMTPHack}, FTP: ${iftlo.hasFTPHack}, SSH: ${iftlo.hasSSHHack}, HTTP: ${iftlo.hasHTTPHack}, SQL: ${iftlo.hasSQLHack})`);
//         }
//       }
//       else {
//         // Print Message
//         await networkSystem.tprint(`[${hostName}] (${hackInfoScript}) Hacking level to low for ${remoteHost} - ${hackablePorts} / ${hackLevelNeeded} (SMTP: ${iftlo.hasSMTPHack}, FTP: ${iftlo.hasFTPHack}, SSH: ${iftlo.hasSSHHack}, HTTP: ${iftlo.hasHTTPHack}, SQL: ${iftlo.hasSQLHack})`);
//       }
//     }
//     else {
//       // Print Message
//       // await networkSystem.tprint(`[${hostName}] (${hackInfoScript}) Already have root access to ${remoteHost}. Copying self to remote host and running.`);

//       // Don't Run The Script Again
//       if (!await networkSystem.isRunning(hackInfoScript, remoteHost, iftlo.hasSMTPHack, iftlo.hasFTPHack, iftlo.hasSSHHack, iftlo.hasHTTPHack, iftlo.hasSQLHack))
//       {
//         // Copy this file to the remote host
//         await networkSystem.scp(hackInfoScript, remoteHost);

//         //await networkSystem.scp("h.js", remoteHost);
//         // Print Message
//         // await networkSystem.tprint(`[${hostName}] (${hackInfoScript}) Copyed to ${remoteHost}.`);

//         // run this script there (hasSMTPHack, hasFTPHack, hasSSHHack, hasHTTPHack, hasSQLHack);
//         //await ExecuteRemoteScript(networkSystem, hackInfoScript, remoteHost, iftlo.hasSMTPHack, iftlo.hasFTPHack, iftlo.hasSSHHack, iftlo.hasHTTPHack, iftlo.hasSQLHack);
//       }
//     }
//   }
//   else {
//     // Print Message
//     await networkSystem.tprint(`[${hostName}] (${hackInfoScript}) ${remoteHost} doesn't exist.`);
//   }
// }

// export async function ExecuteRemoteScript(networkSystem, scriptName, hostName, hasSMTPHack, hasFTPHack, hasSSHHack, hasHTTPHack, hasSQLHack) {
//   // var maxRam = await networkSystem.getServerMaxRam(hostName);
//   // var usedRam = await networkSystem.getServerUsedRam(hostName);
//   // var server = await networkSystem.getServer(hostName);
//   // var freeRam = maxRam - usedRam;
//   // var hackThreads = Math.round(freeRam / 11.0);

//   // if (hackThreads < 1) {
//   //   hackThreads = 1;
//   // }

//   // hackThreads = 2;

//   //await networkSystem.exec(scriptName, hostName, {threads: hackThreads}, hasSMTPHack, hasFTPHack, hasSSHHack, hasHTTPHack, hasSQLHack);

//   // Print Message
//   //await networkSystem.tprint(`[${hostName}] (${hackInfoScript}) Running Remote Script on ${hostName}. CPUCores: ${server.cpuCores}`);
// }

// export async function StealMoney(networkSystem, localHost, iftlo) {
//   // See if we already have access
//   if (await networkSystem.hasRootAccess(localHost)) {
//     if (localHost != "home") {
//       var looper = true;

//       while (looper) {
//         // Get Server Object
//         var hostServer = await networkSystem.getServer(localHost);
//         var securityLevel = await networkSystem.getServerSecurityLevel(localHost);
//         var minimumSecurityLevel = await networkSystem.getServerMinSecurityLevel(localHost);
//         var playerHackLevel = await networkSystem.getHackingLevel();

//         // Growth Phase
//         if (hostServer.moneyAvailable == 0) {
//           // Share Memory with Faction
//           await networkSystem.share();

//           // Print Message
//           await networkSystem.tprint(`[${localHost}] (${hackInfoScript}) Has no money. Sharing Memory.`);
//         }
//         else if (hostServer.moneyAvailable < 1000) {
//           // Grow
//           await networkSystem.grow(localHost);
//         }
//         else if (securityLevel - 5 > playerHackLevel) // Weaken Phase
//         {
//           // Weaken
//           await networkSystem.weaken(localHost);
//         }
//         else if (playerHackLevel > securityLevel) {
//           if (await networkSystem.hackAnalyzeChance(localHost) > 0) {
//             var maxRam = await networkSystem.getServerMaxRam(localHost);
//             var usedRam = await networkSystem.getServerUsedRam(localHost);
//             var freeRam = maxRam - usedRam;
//             var server = await networkSystem.getServer(localHost);
//             var hackThreads = await Math.round(freeRam / 0.20);

//             if (hackThreads < 1) {
//               hackThreads = 1;
//             }

//             if (hackThreads > server.cpuCores)
//             {
//               //hackThreads = server.cpuCores;
//             }

//             // Hack
//             await networkSystem.hack(localHost, { "additionalMsec": null, "stock": null, "threads": hackThreads });
//           }
//         }
//         else {
//           // Share Memory with Faction
//           await networkSystem.share();

//           // Print Message
//           await networkSystem.tprint(`[${localHost}] (${hackInfoScript}) Hacking to low. Sharing Memory.  (${playerHackLevel} / ${securityLevel})`);
//         }

//         // Print Message
//         await networkSystem.tprint(`[${localHost}] (${hackInfoScript}) Money: ${hostServer.moneyAvailable}, Current-Security: ${securityLevel}, Min-Security: ${minimumSecurityLevel}`);
//       }
//     }
//   }
// }

class IFTLObject
{
  constructor(hasSMTPHack, hasFTPHack, hasSSHHack, hasHTTPHack, hasSQLHack, parentHost, thisHost, playerhackLevel)
  {
    this.hasSMTPHack = hasSMTPHack;
    this.hasFTPHack = hasFTPHack;
    this.hasSSHHack = hasSSHHack;
    this.hasHTTPHack = hasHTTPHack;
    this.hasSQLHack = hasSQLHack;
    this.parentHost = parentHost;
    this.thisHost = thisHost;
    this.playerhackLevel = playerhackLevel;
  }
}