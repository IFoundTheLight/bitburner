/** @param {NS} ns */
export async function main(ns) {
    await ns.tprint(await ns.getScriptRam(ns.args[0]));
  }