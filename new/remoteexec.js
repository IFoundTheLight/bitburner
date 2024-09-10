/** @param {NS} ns */
export async function main(ns)
{
  var remoteHost = ns.args[0];
  await ns.exec("startup.js", remoteHost);
}