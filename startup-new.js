/** @param {NS} ns */
export async function main(ns)
{
    // Check for Hack Software
    var hostName = await ns.getHostname();

    // Scan Hosts
    var connectedHosts = await ns.scan(hostName);

    // Hack the planet
    for (var i = 0; i < connectedHosts.length; i++)
    {
        // Get Host Name
        var remoteHost = connectedHosts[i];

        // Skip Home
        if (remoteHost == "home")
        {
            continue;
        }

        // We don't have root access
        var weHaveRoot = await ns.hasRootAccess(remoteHost);
        if (!weHaveRoot)
        {
            // Get Hack Leve, Ports Needed and if we can hack it
            var hackLevelNeeded = await ns.getServerRequiredHackingLevel(remoteHost);
            var portNumbersNeeded = await ns.getServerNumPortsRequired(remoteHost);
            var weCanHackit = iftlo.playerhackLevel >= hackLevelNeeded;

            // Check if we can hack it
            if (weCanHackit)
            {
                await ns.tprint(`[${iftlo.parentHost}] We can hack ${remoteHost}.`);
            }
            else
            {
                await ns.tprint(`[${iftlo.parentHost}] We cannot hack ${remoteHost}, skill to low.`);
            }
        }
    }
}