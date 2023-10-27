// const { OAuth2Client } = require("google-auth-library");

import { OAuth2Client } from "google-auth-library";
const clientIdWeb = process.env["CLIENT_ID_WEB"];
const clientIdAndroid = process.env["CLIENT_ID_ANDROID"];
const clientSecret = process.env["CLIENT_SECRET"];

if(!clientIdWeb || !clientIdAndroid || !clientSecret) {
    console.log("clientIdWeb, clientIdAndroid, or clientSecret not set")
    process.exit(1)
}

const oAuth2Client = new OAuth2Client(clientIdWeb, clientSecret, "postmessage");

export const GoogleAuthMiddleware = async (idToken: string) => {
    const ticket = await oAuth2Client.verifyIdToken({
      idToken: idToken,
      audience: [clientIdWeb, clientIdAndroid], // Specify the CLIENT_ID of the authrouter that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    if(!payload) {
        throw new Error("invalid token")
    }

    const user_uuid = payload["sub"];
    const user_name = payload["name"];
    const email = payload["email"];

    if(!user_uuid || !user_name || !email) {
        throw new Error("information missing from token (sub, name, or email)")
    }
    return { user_uuid, user_name, email };

};

