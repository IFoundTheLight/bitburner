import * as modelModule from "models-module.js"
import * as cacheModule from "cache-module.js"

const filesToCopy = ["startup.js", "cache-module.js", "models-module.js"];

/** @param {NS} ns */
export async function main(ns)
{
  // Check for Hack Software
  var hostName = await ns.getHostname();

  // Scan Hosts
  var connectedHosts = await ns.scan(hostName);

  // Load Home Model
  let homeInfo = await cacheModule.getCacheItem(ns, `Home`, new modelModule.HomeModel());

  // Hack the planet
  for (var i = 0; i < connectedHosts.length; i++)
  {
    // Get Host Name
    var remoteHost = connectedHosts[i];

    // Skip Home Machine
    if (remoteHost == "home")
    {
      continue;
    }

    // Get Server Information
    let currentServerInfo = await cacheModule.getCacheItem(ns, `ServerInfo.${remoteHost}`, new modelModule.Server());

    // See if we already have access
    if (!currentServerInfo.hasAdminRights)
    {

      // We can hack this!
      if (currentServerInfo.requiredHackingSkill <= homeInfo.playerHackLevel)
      {

          // SMTP Hack
          if (homeInfo.hasSMTPHack)
          {
            await ns.tprint(`[${hostName}] (startup) Hacking SMTP on ${remoteHost}`);
            await ns.relaysmtp(remoteHost);
            await ns.tprint(`[${hostName}] (startup) Hacked SMTP on ${remoteHost}`);
          }

          // FTP Hack
          if (homeInfo.hasFTPHack)
          {
            await ns.tprint(`[${hostName}] (startup) Hacking FTP on ${remoteHost}`);
            await ns.ftpcrack(remoteHost);
            await ns.tprint(`[${hostName}] (startup) Hacked FTP on ${remoteHost}`);
          }

          // SSH Hack
          if (homeInfo.hasSSHHack)
          {
            await ns.tprint(`[${hostName}] (startup) Hacking SSH on ${remoteHost}`);
            await ns.brutessh(remoteHost);
            await ns.tprint(`[${hostName}] (startup) Hacked SSH on ${remoteHost}`);
          }

          // HTTP Hack
          if (homeInfo.hasHTTPHack)
          {
            await ns.tprint(`[${hostName}] (startup) Hacking HTTP on ${remoteHost}`);
            await ns.httpworm(remoteHost);
            await ns.tprint(`[${hostName}] (startup) Hacked HTTP on ${remoteHost}`);
          }

          // SQL Hack
          if (homeInfo.hasSQLHack)
          {
            await ns.tprint(`[${hostName}] (startup) Hacking SQL on ${remoteHost}`);
            await ns.sqlinject(remoteHost);
            await ns.tprint(`[${hostName}] (startup) Hacked SQL on ${remoteHost}`);
          }

          // Nuke
          await ns.tprint(`[${hostName}] (startup) Nuking ${remoteHost}`);
          await ns.nuke(remoteHost);
          await ns.tprint(`[${hostName}] (startup) Nuked ${remoteHost}`);

          // Print Message
          await ns.tprint(`[${hostName}] (startup) Hacked machine ${remoteHost} - player Hack Level: ${homeInfo.playerHackLevel} - Hack Level Required: ${currentServerInfo.requiredHackingSkill} (SMTP: ${currentServerInfo.smtpPortOpen}, FTP: ${currentServerInfo.ftpPortOpen}, SSH: ${currentServerInfo.sshPortOpen}, HTTP: ${currentServerInfo.httpPortOpen}, SQL: ${currentServerInfo.sqlPortOpen})`);
      }
      else 
      {
        // Print Message
        await ns.tprint(`[${hostName}] (startup) Hacking level to low for ${remoteHost} - player Hack Level: ${homeInfo.playerHackLevel} - Hack Level Required: ${currentServerInfo.requiredHackingSkill} (SMTP: ${currentServerInfo.smtpPortOpen}, FTP: ${currentServerInfo.ftpPortOpen}, SSH: ${currentServerInfo.sshPortOpen}, HTTP: ${currentServerInfo.httpPortOpen}, SQL: ${currentServerInfo.sqlPortOpen})`);
      }
    }
    else
    {
      // Print Message
      await ns.tprint(`[${hostName}] (startup) Already have root access to machine ${remoteHost} - player Hack Level: ${homeInfo.playerHackLevel} - Hack Level Required: ${currentServerInfo.requiredHackingSkill} (SMTP: ${currentServerInfo.smtpPortOpen}, FTP: ${currentServerInfo.ftpPortOpen}, SSH: ${currentServerInfo.sshPortOpen}, HTTP: ${currentServerInfo.httpPortOpen}, SQL: ${currentServerInfo.sqlPortOpen})`);
    }
  }

  // Spread the love
  for (var i = 0; i < connectedHosts.length; i++)
  {
    // Get Host Name
    var remoteHost = connectedHosts[i];
    
    // Skip the parent
    if (hostName != remoteHost)
    {

      // Copy Files Over
      for(var j = 0; j < filesToCopy.length; j++)
      {
        let fileToCopy = filesToCopy[j];

        // Copy file to  remote server
        await ns.scp(fileToCopy, remoteHost);

        // Display Copy Message
        await ns.tprint(`[${hostName}] (startup) Copying script ${fileToCopy} to ${remoteHost}.`);  
      }

      let runStart = true;
      let remoteServerProcesses = await ns.ps(remoteHost);
      for(var x = 0; x < remoteServerProcesses.length; x++)
      {
        if (remoteServerProcesses[x].filename == "startup.js")
        {
          runStart = false;
        }
      }

      if (runStart)
      {
        // Running Startup on remote host
        await ns.exec("startup.js", remoteHost);
        await ns.tprint(`[${hostName}] (startup) Remote running startup.js Script ${remoteHost}`);
      }
    }
  }
}