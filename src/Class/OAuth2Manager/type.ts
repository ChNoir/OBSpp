import type { AppName } from "open";

export interface Credentials {
  client_id: string;
  client_secret: string;
  redirect_uris: string[];
  auth_uri: string;
  token_uri: string;
  scopes: string[];
  extra_params : { [key : string] : string }
}

export interface TokenData {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type: string;
  created_at: number;
  refresh_token_expires_in ?: number // for google 
}

export type OptionOAuth2Manager = {
    port : number
    url : string
    credentialsPath : string , 
    tokenPath: string,
    logInstanceName : string 
    openOptions ?: AppName
}
