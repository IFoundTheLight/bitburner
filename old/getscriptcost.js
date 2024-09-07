/** @param {NS} ns */
export async function main(ns) {
  let scriptName = ns.args[0];
  let scriptCost = await ns.getScriptRam(scriptName);
  let machineName = await ns.getHostname();
  let machineMemory = await ns.getServerMaxRam(machineName);
  let maxRunOnMachine = machineMemory / scriptCost;

  await ns.tprint(`You can run ${maxRunOnMachine} ${scriptName} s on this machine.`);
}