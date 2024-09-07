import * as modelModule from "models-module.js"

/**
 * @param {NS} NetworkStream
 * @param {string} Key or Id of KeyValuePair
 * @param {string} Value to save
 * @summary Save Item To Cache.
 **/
export async function setCacheItem(ns, key, value)
{
  const setBaseAddress = "https://bitburner.iftl.net/Cache/Set?";
  const setTargetFile = "set-response.txt";

  // Get Host Address
  let hostAddress = await ns.getHostname();

  // Set Item
  await ns.wget(`${setBaseAddress}Key=${key}&Value=${JSON.stringify(value)}`, setTargetFile);

  // Read File Contents
  let fileContents = await ns.read(setTargetFile);

  // Remove File
  await ns.rm(setTargetFile, hostAddress);

  // Read File and Turn into Json
  let response = JSON.parse(fileContents);

  // Get Json Response
  let jResponse = new modelModule.JsonResponse();
  jResponse.loadData(response);

  // Return File Contents
  return jResponse;
}

/**
 * @param {NS} NetworkStream
 * @param {key} Id of KeyValuePair
 * @summary Retrieve Item from Cache.
 **/
export async function getCacheItem(ns, key)
{
  const getBaseAddress = "https://bitburner.iftl.net/Cache/Get?";
  const getTargetFile = "get-response.txt";

  // Get Host Address
  let hostAddress = await ns.getHostname();

  // Set Item
  await ns.wget(`${getBaseAddress}Key=${key}`, getTargetFile);

  // Read File Contents
  let fileContents = await ns.read(getTargetFile);

  // Remove File
  await ns.rm(getTargetFile, hostAddress);

  // Read File and Turn into Json
  let response = JSON.parse(fileContents);

  // Get Json Response
  let jResponse = new modelModule.JsonResponse();
  jResponse.loadData(response);

  // Return File Contents
  return jResponse;
}