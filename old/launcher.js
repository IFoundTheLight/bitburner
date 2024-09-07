const remoteexecScript = "remoteexec.js";

/** @param {NS} ns */
export async function main(ns)
{ 
  var RemoteHost = "";

  if (ns.args.length > 0)
  {
    RemoteHost = ns.args[0];
  }

  if (RemoteHost != "")
  {
    await ns.spawn(remoteexecScript, 1, RemoteHost);
  }
  else
  {
    ns.tprint(`Spaning ${remoteexecScript} to ${RemoteHost}`);
  }
}