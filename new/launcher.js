const remoteexecScript = "remoteexec.js";

/** @param {NS} ns */
export async function main(ns)
{ 
  var remoteHost = "";

  if (ns.args.length > 0)
  {
    remoteHost = ns.args[0];
  }

  if (remoteHost != "")
  {
    await ns.tprint(`Spawning ${remoteexecScript} on ${remoteHost}`);
    await ns.spawn(remoteexecScript, 1, remoteHost);
  }
  else
  {
    ns.tprint(`Spaning ${remoteexecScript} to ${remoteHost}`);
  }
}