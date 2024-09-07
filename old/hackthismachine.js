/** @param {NS} ns */
export async function main(ns)
{
  var homeData = await ns.read("homedata.txt");

  // Get Hostname
  var iftlo = new IFTLObject(0,0,0,0,0,0,0,0);
  iftlo.setData(homeData);
  var localhost = ns.args[0];
  var hackLevelNeeded = await ns.getHackingLevel(localhost);
  var portNumbersNeeded = await ns.getServerNumPortsRequired(localhost);
  
  // Check if we have the hack
  var hackablePorts = 0;
  hackablePorts += iftlo.hasSMTPHack;
  hackablePorts += iftlo.hasFTPHack;
  hackablePorts += iftlo.hasSSHHack;
  hackablePorts += iftlo.hasHTTPHack;
  hackablePorts += iftlo.hasSQLHack;

  // See if we already have access
  if (!await ns.hasRootAccess(localhost))
  {

    // We can hack this!
    if (hackLevelNeeded <= iftlo.playerHackLevel)
    {

      // Start Hacking
      if (hackablePorts >= portNumbersNeeded)
      {
        // SMTP Hack
        if (iftlo.hasSMTPHack)
        {
          await ns.relaysmtp(localhost);
        }

        // FTP Hack
        if (iftlo.hasFTPHack)
        {
          await ns.ftpcrack(localhost);
        }

        // SSH Hack
        if (iftlo.hasSSHHack)
        {
          await ns.brutessh(localhost);
        }

        // HTTP Hack
        if (iftlo.hasHTTPHack)
        {
          await ns.httpworm(localhost);
        }

        // SQL Hack
        if (iftlo.hasSQLHack)
        {
          await ns.sqlinject(localhost);
        }

        // Nuke
        await ns.nuke(localhost);

        // Hack
        await ns.hack(localhost);

        // Print Message
        await ns.tprint(`[${iftlo.parentHost}] (hackthismachine) Hacked machine ${localhost} - ${hackablePorts} / ${portNumbersNeeded} (SMTP: ${iftlo.hasSMTPHack}, FTP: ${iftlo.hasFTPHack}, SSH: ${iftlo.hasSSHHack}, HTTP: ${iftlo.hasHTTPHack}, SQL: ${iftlo.hasSQLHack})`);
      }
      else 
      {
        // Print Message
        await ns.tprint(`[${iftlo.parentHost}] (hackthismachine) To many needed hack ports for ${localhost} - ${hackablePorts} / ${portNumbersNeeded} (SMTP: ${iftlo.hasSMTPHack}, FTP: ${iftlo.hasFTPHack}, SSH: ${iftlo.hasSSHHack}, HTTP: ${iftlo.hasHTTPHack}, SQL: ${iftlo.hasSQLHack})`);
      }
    }
    else 
    {
      // Print Message
      await ns.tprint(`[${iftlo.parentHost}] (hackthismachine) Hacking level to low for ${localhost} - ${hackablePorts} / ${hackLevelNeeded} (SMTP: ${iftlo.hasSMTPHack}, FTP: ${iftlo.hasFTPHack}, SSH: ${iftlo.hasSSHHack}, HTTP: ${iftlo.hasHTTPHack}, SQL: ${iftlo.hasSQLHack})`);
    }
  }
  else
  {
    // Print Message
    await ns.tprint(`[${iftlo.parentHost}] (hackthismachine) Already hacked machine ${localhost} - ${hackablePorts} / ${portNumbersNeeded} (SMTP: ${iftlo.hasSMTPHack}, FTP: ${iftlo.hasFTPHack}, SSH: ${iftlo.hasSSHHack}, HTTP: ${iftlo.hasHTTPHack}, SQL: ${iftlo.hasSQLHack})`);
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