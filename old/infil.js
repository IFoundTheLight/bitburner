/** @param {NS} ns */
export async function main(ns) {
  var Locations = await ns.infiltration.getPossibleLocations();

  for(var i = 0; i < Locations.length; i++)
  {
    var Location = ns.infiltration.getInfiltration(Locations[i].name);

    await ns.tprint(`difficulty: ${Location.difficulty}, location: (${Location.location.city}, ${Location.location.name}), reward: (SoARep: ${Location.reward.SoARep}, TradeRep: ${Location.reward.tradeRep}, SellCash: ${Location.reward.sellCash})`);
  }
}