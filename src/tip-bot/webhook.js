import axios from "axios";
import { Autohook } from "twitter-autohook";
import { get } from "dottie";
import Twit from "twit";
import * as COMMANDS from "../tip-bot/commands";
import * as RESPONSES from "../tip-bot/responses";
import * as PROCESSES from "../tip-bot/processes";
import * as HELPERS from "../tip-bot/helpers";

const BOT_ID = "1114950915545600000";

export default async function initWebhook(
  oauth_token,
  oauth_token_secret,
  server
) {
  var Twitter = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

  try {
    const webhook = new Autohook();

    // Removes existing webhooks
    await webhook.removeWebhooks();

    // Listens to incoming activity
    webhook.on("event", event => {
      if (event.hasOwnProperty("direct_message_events")) {
        // User sent a DM to the bot
        handleDirectMessage(Twitter, event, server);
      } else if (event.hasOwnProperty("tweet_create_events")) {
        // User sent a tweet to the bot
        handleTweets(Twitter, event, server);
      } else if (event.hasOwnProperty("follow_events")) {
        // New follower for the bot
        handleFollow(Twitter, event, server);
      } else {
        // Unsupported event
        return 0;
      }
    });

    // Starts a server and adds a new webhook
    await webhook.start("https://www.iotxplorer.io/twitter");

    // Subscribes to a user's activity
    await webhook.subscribe({ oauth_token, oauth_token_secret });
  } catch (e) {
    console.log(e);
  }
}

function handleDirectMessage(Twitter, event, server) {
  const {
    gateways: { RpcMethod }
  } = server;
  /*
  Parse the DM, see if there is an action provided and perform it.
  If no action is provided, reply with an error.
  */
  let dm_object = event["direct_message_events"][0];
  let message_object = get(dm_object, "message_create");
  // Get sender id
  const userID = message_object.sender_id;
  const screenName = event.users[userID].screen_name;
  console.log(message_object.message_data.text);
  // if !help command was received
  if (COMMANDS.help_commands.en.includes(message_object.message_data.text)) {
    let data = {
      event: {
        type: "message_create",
        message_create: {
          target: { recipient_id: userID },
          message_data: { text: RESPONSES.help_message("en") }
        }
      }
    };
    // send the help message
    Twitter.post("direct_messages/events/new", data, function(
      err,
      data,
      response
    ) {
      if (err) {
        console.log(err);
      }
    });
    // if !register command was received
  } else if (
    COMMANDS.register_commands.en.includes(message_object.message_data.text)
  ) {
    PROCESSES.registerProcess(Twitter, userID, RESPONSES, screenName);
    // if !balance command was received
  } else if (
    COMMANDS.balance_commands.en.includes(message_object.message_data.text)
  ) {
    PROCESSES.balanceProcess(Twitter, userID, RESPONSES, RpcMethod);
    //if !deposit command was received
  } else if (
    COMMANDS.deposit_commands.en.includes(message_object.message_data.text)
  ) {
    PROCESSES.depositProcess(
      Twitter,
      userID,
      RESPONSES,
      screenName,
      PROCESSES.registerProcess
    );
    //if !tip command was received
  } else if (
    COMMANDS.tip_commands.en.includes(message_object.message_data.text)
  ) {
    PROCESSES.tipDirectMessageProcess(
      Twitter,
      userID,
      RESPONSES,
      screenName,
      PROCESSES.registerProcess
    );
    //if !withdraw command was received
  } else if (
    COMMANDS.withdraw_commands.en.some(r =>
      message_object.message_data.text.split(" ").includes(r)
    )
  ) {
    PROCESSES.withdraw_process(
      Twitter,
      userID,
      RESPONSES,
      message_object.message_data.text,
      RpcMethod
    );
  } else if (
    COMMANDS.info_commands.en.includes(message_object.message_data.text)
  ) {
    let data = {
      event: {
        type: "message_create",
        message_create: {
          target: { recipient_id: userID },
          message_data: { text: RESPONSES.iotex_info_message("en") }
        }
      }
    };
    // send the info message
    Twitter.post("direct_messages/events/new", data, function(
      err,
      data,
      response
    ) {
      if (err) {
        console.log(err);
      }
    });
  }
}

function handleTweets(Twitter, event, server) {
  const {
    gateways: { RpcMethod }
  } = server;

  /*
    A tweet was received. The bot will parse the tweet, see if there are any tips and process them.
    Error handling will cover if the sender doesn't have an account, doesn't have enough to cover the tips,
    sent to an invalid username, didn't send an amount to tip or didn't send a !tip command.
  */

  let tweet_object = event["tweet_create_events"][0];
  const screenName = tweet_object.user.screen_name;
  const userID = tweet_object.user.id_str;

  if (tweet_object.user.id_str === BOT_ID) {
    console.log("@iotxplorer_bot sent a tweet.");
    return 1;
  }

  let tweet = {};
  tweet["text"] = tweet_object.text;
  if (tweet_object["id"] === null || tweet_object["id"] === undefined) {
    return 1;
  }
  tweet["id"] = tweet_object.id_str;

  tweet = HELPERS.check_tweet_action(
    tweet,
    COMMANDS.tip_commands.en,
    HELPERS.getWordAt
  );

  if (tweet["action"] === null) {
    console.log(
      new Date().toLocaleString() +
        ": Mention of @iotxplorer_bot without a !tip command."
    );
    return 1;
  }
  console.log(tweet);
  tweet = HELPERS.validate_tip_amount(Twitter, tweet, RESPONSES, screenName);

  if (tweet["tip_amount"] <= 0) {
    return 1;
  }

  if (tweet["action"] !== -1 && screenName !== BOT_ID) {
    if (process.env.BOT_STATUS == "maintenance") {
      Twitter.post(
        "statuses/update",
        {
          status: RESPONSES.maintenance_message("en", screenName),
          in_reply_to_status_id: tweet["id"]
        },
        function(err, data, response) {
          if (err) {
            console.log(err);
          } else {
            console.log(
              "Bot under maintenance, not available to tip - Notified user."
            );
          }
        }
      );
    } else {
      PROCESSES.tip_process(
        Twitter,
        tweet,
        RESPONSES,
        screenName,
        PROCESSES.registerProcess,
        HELPERS.set_tip_list,
        HELPERS.check_invalid_chars,
        userID,
        HELPERS.validate_sender_account,
        RpcMethod
      );
    }
  } else {
    return 1;
  }

  return 0;
}

async function handleFollow(Twitter, event) {
  console.log(new Date().toLocaleString() + ": New user followed the bot!");
  let follow_object = event["follow_events"][0];
  let follower_id = follow_object.source.id;

  let data = {
    event: {
      type: "message_create",
      message_create: {
        target: { recipient_id: follower_id },
        message_data: { text: RESPONSES.help_message("en") }
      }
    }
  };
  // send help message
  Twitter.post("direct_messages/events/new", data, function(
    err,
    data,
    response
  ) {
    if (err) {
      console.log(err);
    }
  });

  return 0;
}
