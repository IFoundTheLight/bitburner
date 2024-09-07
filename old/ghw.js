/** @param {NS} ns */
export async function main(ns) {
  while(true)
  {
    await ns.grow(ns.args[0], {threads: Number(ns.args[1])});
    await ns.weaken(ns.args[0], {threads: Number(ns.args[1])});
    await ns.hack(ns.args[0], {threads: Number(ns.args[1])});
  }
}

// /** @param {NS} ns */
// export async function main(ns) {
//   var Name = ns.args[0];
//   while (true) {
//     await ns.grow(Name);
//     await ns.hack(Name);
//     await ns.weaken(Name);
//   }
// }