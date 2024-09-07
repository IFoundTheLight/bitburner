/** @param {NS} ns */
export async function main(ns)
{
  while(true)
  {
    let numberOfHashes = await ns.hacknet.numHashes();
    let buyAmount = Math.round(numberOfHashes / 4); // 1m Cost
    ns.hacknet.spendHashes("Sell for Money", "", buyAmount);

    await ns.sleep(1000);
  }
}