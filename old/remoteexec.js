const startupScript = "startup.js";
/** @param {NS} ns */
export async function main(ns) {
  var RemoteHost = ns.args[0];
  await ns.exec(startupScript, RemoteHost);
}