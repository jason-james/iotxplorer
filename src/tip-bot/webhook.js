import { Autohook } from "twitter-autohook";

export default async function initWebhook(oauth_token, oauth_token_secret) {
  try {
    const webhook = new Autohook();

    // Removes existing webhooks
    await webhook.removeWebhooks();

    // Listens to incoming activity
    webhook.on("event", event => console.log("Something happened:", event));

    // Starts a server and adds a new webhook
    webhook.start();

    // Subscribes to a user's activity
    webhook.subscribe({ oauth_token, oauth_token_secret });
  } catch (e) {
    console.log(e);
  }
}
