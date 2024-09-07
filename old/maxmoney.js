/** @param {NS} ns */
export async function main(ns) {
  let remoteHost = ns.args[0];
  await ns.tprint(`${remoteHost} can have ${await ns.formatNumber(await ns.getServerMaxMoney(remoteHost), 2, 1000, false)}`);
}