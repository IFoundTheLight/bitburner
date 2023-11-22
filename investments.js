/** @param {NS} ns */
export async function main(ns) 
{
  let symbols = await ns.stock.getSymbols();

  ns.alert("hello");

  // this is a test
}