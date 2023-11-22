const homedataFile = "homedata.txt";
const startupScript = "startup.js";
const launcherScript = "launcher.js";
const remoteexecScript = "remoteexec.js";

/** @param {NS} ns */
export async function main(ns)
{
  // Check for Hack Software
  var hostName = await ns.getHostname();
  var iftlo = new IFTLObject(0,0,0,0,0,0,0,0);
  if (hostName == "home")
  {
    var hasSMTPHack = await ns.fileExists("relaysmtp.exe");
    var hasFTPHack = await ns.fileExists("ftpcrack.exe");
    var hasSSHHack = await ns.fileExists("brutessh.exe");
    var hasHTTPHack = await ns.fileExists("httpworm.exe");
    var hasSQLHack = await ns.fileExists("sqlinject.exe");
    var playerHackLevel = await ns.getHackingLevel();
    iftlo = new IFTLObject(hasSMTPHack, hasFTPHack, hasSSHHack, hasHTTPHack, hasSQLHack, hostName, null, playerHackLevel);

    // Write to file
    await ns.write(homedataFile, iftlo.toParseable(), "w");
  }
  else
  { 
    var homeData = await ns.read("homedata.txt");
    iftlo.setData(homeData);
  }

  // Scan Hosts
  var connectedHosts = await ns.scan(hostName);

  // Hack the planet
  for (var i = 0; i < connectedHosts.length; i++)
  {
    // Get Host Name
    var remoteHost = connectedHosts[i];
    if (remoteHost == "home")
    {
      continue;
    }
    var hackLevelNeeded = await ns.getServerRequiredHackingLevel(remoteHost);
    var portNumbersNeeded = await ns.getServerNumPortsRequired(remoteHost);
    var weCanHackit = iftlo.playerhackLevel >= hackLevelNeeded;
    var weHaveRoot = await ns.hasRootAccess(remoteHost);

    // Check if we have the hack
    var hackablePorts = 0;
    hackablePorts += iftlo.hasSMTPHack;
    hackablePorts += iftlo.hasFTPHack;
    hackablePorts += iftlo.hasSSHHack;
    hackablePorts += iftlo.hasHTTPHack;
    hackablePorts += iftlo.hasSQLHack;

    // See if we already have access
    if (!weHaveRoot)
    {

      // We can hack this!
      if (weCanHackit)
      {

        // Start Hacking
        if (hackablePorts >= portNumbersNeeded)
        {

          // SMTP Hack
          if (iftlo.hasSMTPHack)
          {
            await ns.tprint(`[${iftlo.parentHost}] (startup) Hacking SMTP on ${remoteHost}`);
            await ns.relaysmtp(remoteHost);
            await ns.tprint(`[${iftlo.parentHost}] (startup) Hacked SMTP on ${remoteHost}`);
          }

          // FTP Hack
          if (iftlo.hasFTPHack)
          {
            await ns.tprint(`[${iftlo.parentHost}] (startup) Hacking FTP on ${remoteHost}`);
            await ns.ftpcrack(remoteHost);
            await ns.tprint(`[${iftlo.parentHost}] (startup) Hacked FTP on ${remoteHost}`);
          }

          // SSH Hack
          if (iftlo.hasSSHHack)
          {
            await ns.tprint(`[${iftlo.parentHost}] (startup) Hacking SSH on ${remoteHost}`);
            await ns.brutessh(remoteHost);
            await ns.tprint(`[${iftlo.parentHost}] (startup) Hacked SSH on ${remoteHost}`);
          }

          // HTTP Hack
          if (iftlo.hasHTTPHack)
          {
            await ns.tprint(`[${iftlo.parentHost}] (startup) Hacking HTTP on ${remoteHost}`);
            await ns.httpworm(remoteHost);
            await ns.tprint(`[${iftlo.parentHost}] (startup) Hacked HTTP on ${remoteHost}`);
          }

          // SQL Hack
          if (iftlo.hasSQLHack)
          {
            await ns.tprint(`[${iftlo.parentHost}] (startup) Hacking SQL on ${remoteHost}`);
            await ns.sqlinject(remoteHost);
            await ns.tprint(`[${iftlo.parentHost}] (startup) Hacked SQL on ${remoteHost}`);
          }

          // Nuke
          await ns.tprint(`[${iftlo.parentHost}] (startup) Nuking ${remoteHost}`);
          await ns.nuke(remoteHost);
          await ns.tprint(`[${iftlo.parentHost}] (startup) Nuked ${remoteHost}`);

          // Print Message
          await ns.tprint(`[${iftlo.parentHost}] (startup) Hacked machine ${remoteHost} - ${hackablePorts} / ${portNumbersNeeded} (SMTP: ${iftlo.hasSMTPHack}, FTP: ${iftlo.hasFTPHack}, SSH: ${iftlo.hasSSHHack}, HTTP: ${iftlo.hasHTTPHack}, SQL: ${iftlo.hasSQLHack})`);
        }
        else 
        {
          // Print Message
          await ns.tprint(`[${iftlo.parentHost}] (startup) To many needed hack ports for ${remoteHost} - ${hackablePorts} / ${portNumbersNeeded} (SMTP: ${iftlo.hasSMTPHack}, FTP: ${iftlo.hasFTPHack}, SSH: ${iftlo.hasSSHHack}, HTTP: ${iftlo.hasHTTPHack}, SQL: ${iftlo.hasSQLHack})`);
        }
      }
      else 
      {
        // Print Message
        await ns.tprint(`[${iftlo.parentHost}] (startup) Hacking level to low for ${remoteHost} - ${iftlo.playerhackLevel} / ${hackLevelNeeded} (SMTP: ${iftlo.hasSMTPHack}, FTP: ${iftlo.hasFTPHack}, SSH: ${iftlo.hasSSHHack}, HTTP: ${iftlo.hasHTTPHack}, SQL: ${iftlo.hasSQLHack})`);
      }
    }
    else
    {
      // Hack
      await ns.tprint(`[${iftlo.parentHost}] (startup) Hacking ${remoteHost}`);
      await ns.hack(remoteHost);
      await ns.tprint(`[${iftlo.parentHost}] (startup) Hacked ${remoteHost}`);

      // Print Message
      await ns.tprint(`[${iftlo.parentHost}] (startup) Already have root access to machine ${remoteHost} - ${hackablePorts} / ${portNumbersNeeded} - Hackable: ${weCanHackit} - Player Hack Level: ${iftlo.playerhackLevel} - Hack Level Required: ${hackLevelNeeded} (SMTP: ${iftlo.hasSMTPHack}, FTP: ${iftlo.hasFTPHack}, SSH: ${iftlo.hasSSHHack}, HTTP: ${iftlo.hasHTTPHack}, SQL: ${iftlo.hasSQLHack})`);
    }
  }

  // Spread the love
  for (var i = 0; i < connectedHosts.length; i++)
  {
    // Get Host Name
    var remoteHost = connectedHosts[i];
    
    // Skip the parent
    if (iftlo.parentHost != remoteHost)
    {
      // Spread
      await ns.scp(homedataFile, remoteHost);
      await ns.scp(startupScript, remoteHost);
      await ns.scp(launcherScript, remoteHost);
      await ns.scp(remoteexecScript, remoteHost);

      //
      //await ns.tprint(`[${iftlo.parentHost}] (startup) Remote runing Startup Script ${remoteHost}`);
      await ns.run(launcherScript, 1, remoteHost);
    }
  }
}

class IFTLObject
{
  constructor(hasSMTPHack, hasFTPHack, hasSSHHack, hasHTTPHack, hasSQLHack, parentHost, thisHost, playerhackLevel)
  {
      this.hasSMTPHack = this.isBoolean(hasSMTPHack);
      this.hasFTPHack = this.isBoolean(hasFTPHack);
      this.hasSSHHack = this.isBoolean(hasSSHHack);
      this.hasHTTPHack = this.isBoolean(hasHTTPHack);
      this.hasSQLHack = this.isBoolean(hasSQLHack);
      this.parentHost = parentHost;
      this.thisHost = thisHost;
      this.playerhackLevel = Number(playerhackLevel);
  }

  toParseable()
  {
    return `${this.hasSMTPHack}|${this.hasFTPHack}|${this.hasSSHHack}|${this.hasHTTPHack}|${this.hasSQLHack}|${this.parentHost}|${this.thisHost}|${this.playerhackLevel}`;
  }

  isBoolean(data)
  {
    if (data == "true" || data == "True" || data == 1 || data == "1")
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  setData(data)
  {
    if (data.includes("|"))
    {
      var Parsed = data.split("|");
      this.hasSMTPHack = this.isBoolean(Parsed[0]);
      this.hasFTPHack = this.isBoolean(Parsed[1]);
      this.hasSSHHack = this.isBoolean(Parsed[2]);
      this.hasHTTPHack = this.isBoolean(Parsed[3]);
      this.hasSQLHack = this.isBoolean(Parsed[4]);
      this.parentHost = Parsed[5];
      this.thisHost = Parsed[6];
      this.playerhackLevel = Number(Parsed[7]);
    }
  }
}