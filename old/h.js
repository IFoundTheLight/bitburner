/** @param {NS} ns */
export async function main(ns) {
  var Name = ns.getHostname();
  var Threads = ns.args[0];
  while (true) {
    await ns.hack(Name, {threads: Threads});
  }
}