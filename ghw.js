/** @param {NS} ns */
export async function main(ns) {
    var Name = ns.args[0];
    while (true) {
      await ns.grow(Name);
      await ns.hack(Name);
      await ns.weaken(Name);
    }
  }