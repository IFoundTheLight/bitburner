const hackInfoScript = "hinfo.js";
const hackthismachineScript = "hackthismachine.js";
const spreadScript = "spread.js";
const startupScript = "startup.js";

/** @param {NS} ns */
export async function main(ns)
{
  // Scan Hosts
  var connectedHosts = await ns.scan(await ns.getHostname());

  // Hack the planet
  for (var i = 0; i < connectedHosts.length; i++)
  {
    // Get Host Name
    var remoteHost = connectedHosts[i];


  }
}