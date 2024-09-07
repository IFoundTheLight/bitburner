/** @param {NS} ns */
export async function main(ns) {
}

export class HomeModel extends BaseModel
{
  hasSMTPHack = false;
  hasFTPHack = false;
  hasSSHHack = false;
  hasHTTPHack = false;
  hasSQLHack = false;
  playerhackLevel = 0;

  constructor()
  {
    super();
  }
}

export class Servers extends BaseModel
{
  servers = []

  constructor()
  {
    super();
  }
}

export class ServerInformation extends BaseModel
{
  name = null;
  ipAddress = null;

  constructor()
  {
    super();
  }
}

export class JsonResponse  extends BaseModel
{
  success = null;
  data = null;
  
  constructor()
  {
    super();
  }
}

export class KeyValueResponse extends BaseModel
{
  key = null;
  value = null;

  constructor()
  {
    super();
  }
}

export class BaseModel
{
  constructor()
  {
  }

  loadData(json) {
    return Object.assign(this, json);
  }

  saveData() {
    return JSON.stringify(this);
  }
}