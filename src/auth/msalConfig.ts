import { PublicClientApplication } from "@azure/msal-browser";

export const msalInstance = new PublicClientApplication({
  auth: {
    clientId: "8abd5ed8-d363-410f-bf48-16b7a2ef253b",
    authority:
      "https://login.microsoftonline.com/7878ac3a-84b9-4020-9efa-fdee9c876808",
    redirectUri: "http://localhost:5173",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
});

export const loginRequest = {
  scopes: ["User.Read"],
};
