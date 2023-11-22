/** @param {NS} ns */
export async function main(ns)
{
  var TIX = ns.stock;
  var Symbols = await TIX.getSymbols();
  var ShareMonies = await ns.getPlayer().money * 0.05;
  var IFTLStockObjects = [];

  // Keep running
  while(true)
  {

    // Loop over Symbols
    for(var i = 0; i < Symbols.length; i++)
    {
      // Get Symbol
      let Symbol = Symbols[i];

      // Get Forecast
      let Forcast = await TIX.getForecast(Symbol);
      let ForcastPercent = Math.round(Forcast * 100);
      let ForcastRank = Math.round(ForcastPercent / 10);

      // Get Volatility
      let Volatility = await TIX.getVolatility(Symbol);
      let VolatilityPercent = Math.round(Volatility * 100);

      // Get Info
      let MaxShares = await TIX.getMaxShares(Symbol);
      let SharesLong, avgLongPrice, sharesShort, avgShortPrice = TIX.getPosition(Symbol);
      let SharePrice = await TIX.getPrice(Symbol);
      var SharesToBuy = Math.round(ShareMonies / SharePrice);


      // Print
      await ns.tprint(`[Stocks] ${Symbol}: ${ForcastPercent}, ${ForcastRank}, ${SharesLong}, ${SharePrice}`);

      //
      if (SharesLong === undefined)
      {
        SharesLong = 0;
      }

      //
      if (SharesLong <= 0)
      {
        //
        if (ForcastRank >= 6)
        {
          // 
          await TIX.buyStock(Symbol, SharesToBuy);

          // Add Data If we don't have it already
          var SavedData = FindByName(IFTLStockObjects, Symbol);
          if (SavedData == undefined)
          {
            IFTLStockObjects.push(new IFTLStockObject(Symbol, SharePrice, SharesToBuy));
          }

          // Print
          await ns.tprint(`[Stocks] ${Symbol}: Bought ${SharesToBuy}`);
        }
      }
      else
      {
        // Add Data If we don't have it already
        var SavedData = FindByName(IFTLStockObjects, Symbol);
        if (SavedData != undefined)
        {
          if (SavedData.boughtPrice > SharePrice)
          {

          }
        }

        if (ForcastRank < 6)
        {
          // Sell Stock
          await TIX.sellStock(Symbol, SharesLong)

          // Print
          await ns.tprint(`[Stocks] ${Symbol}: Sold ${SharesLong}`);
        }
      }
    }

    // Wait
    await ns.sleep(1000);
  }
}

function FindByName(iftlstockobject, name)
{

  for(var i = 0; i < iftlstockobject.length; i++)
  {
    if (iftlstockobject[i].name == name)
    {
      return iftlstockobject[i];
    }
  }
}

class IFTLStockObject
{
  constructor(symbolName, boughtPrice, boughtAmount)
  {
      this.symbolName = Number(symbolName);
      this.boughtPrice = Number(boughtPrice);
      this.boughtAmount = Number(boughtAmount);
  }

  toParseable()
  {
    return `${this.symbolName}|${this.boughtPrice}|${this.boughtAmount}`;
  }

  setData(data)
  {
    if (data.includes("|"))
    {
      var Parsed = data.split("|");
      this.symbolName = Number(Parsed[0]);
      this.boughtPrice = Number(Parsed[1]);
      this.boughtAmount = Number(Parsed[2]);
    }
  }
}