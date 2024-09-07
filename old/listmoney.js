/** @param {NS} ns */
export async function main(ns)
{
  ns.getServerMaxMoney(ns.getHostname());
  ns.scp();
  ns.exec();
}