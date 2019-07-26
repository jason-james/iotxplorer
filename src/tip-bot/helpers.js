import { getDB } from "../database/db";

export function check_tweet_action(tweet, tip_commands) {
  /*   
    Check to see if there are any key action values mentioned in the tweet.
    */

  let tweet_array = tweet.text.split(" ");
  tip_commands.forEach(command => {
    if (tweet_array.includes(command)) {
      tweet["action_index"] = tweet_array.indexOf(command);
      tweet["action"] = command;
    }
  });

  if (!tweet["action_index"]) {
    tweet["action"] = null;
    return tweet;
  }
  tweet["starting_point"] = tweet["action_index"] + 1;
  console.log(tweet);
  return tweet;
}

export function validate_tip_amount(Twitter, tweet, RESPONSES, screenName) {
  /*
    Validate the tweet includes an amount to tip, and if that tip amount is greater than the minimum tip amount.
    */
  const MIN_TIP = 1;

  console.log(new Date().toLocaleString() + " : in validate_tip_amount");

  if (isNaN(tweet["text"].split(" ")[tweet["starting_point"]])) {
    // Tip amount is not a number
    Twitter.post(
      "statuses/update",
      {
        status: RESPONSES.not_a_number_text("en", screenName),
        in_reply_to_status_id: tweet["id"]
      },
      function(err, data, response) {
        if (err) {
          console.log(err);
        } else {
          console.log("User tipped in wrong format - Notified user.");
        }
      }
    );
    tweet["tip_amount"] = -1;
    return tweet;
  }

  tweet["tip_amount"] = tweet["text"].split(" ")[tweet["starting_point"]];

  // Tip amount is a number but below minimum
  if (tweet["tip_amount"] < MIN_TIP) {
    Twitter.post(
      "statuses/update",
      {
        status: RESPONSES.below_minimum_tip("en", screenName),
        in_reply_to_status_id: tweet["id"]
      },
      function(err, data, response) {
        if (err) {
          console.log(err);
        } else {
          console.log("User tipped less than minimum amount - Notified user.");
        }
      }
    );

    tweet["tip_amount"] = -1;
    return tweet;
  }

  return tweet;
}

export async function set_tip_list(
  Twitter,
  tweet,
  screenName,
  check_invalid_chars
) {
  /*
    Loop through the message starting after the tip amount and identify any users that were tagged for a tip.  Add the
    user object to the users_to_tip array to process the tips.
    */
  console.log(new Date().toLocaleString() + " : in set_tip_list");
  let tweet_array = tweet.text.split(" ");
  let users_to_tip = [];
  let mistyped_users = [];
  // Identify the first user to string multi tips.  Once a non-user is mentioned, end the user list
  let first_user_found = false;

  for (let i = tweet.starting_point + 2; i < tweet_array.length; i++) {
    if (
      first_user_found &&
      tweet_array[i].length > 0 &&
      tweet_array[i][0] !== "@"
    ) {
      console.log("users identified, regular text breaking the loop");
      break;
    }

    if (
      tweet_array[i].length > 0 &&
      tweet_array[i][0] === "@" &&
      tweet_array[i].toLowerCase() !== `@${screenName.toLowerCase()}`
    ) {
      if (!first_user_found) {
        first_user_found = true;
      }
      tweet_array[i] = check_invalid_chars(tweet_array[i]);
      //get user info

      await new Promise((resolve, reject) => {
        Twitter.get("users/show", { screen_name: tweet_array[i] }, function(
          err,
          data,
          response
        ) {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      }).then(
        data => {
          // if promise resolves
          let user = {
            receiver_id: data.id_str,
            receiver_screen_name: data.screen_name,
            receiver_account: false
          };
          users_to_tip.push(user);
        },
        err => {
          // if promise is rejects

          console.log(err);
          console.log(
            "User sent a !tip command with a mistyped user",
            tweet_array[i]
          );
          mistyped_users.push(tweet_array[i]);
          // Send message notifying user of why tip failed
        }
      );
    }
  }

  console.log(new Date().toLocaleString(), users_to_tip);
  console.log(new Date().toLocaleString(), mistyped_users);

  tweet["total_tip_amount"] = tweet["tip_amount"];

  if (users_to_tip.length > 0 && tweet["tip_amount"] !== -1) {
    tweet["total_tip_amount"] *= users_to_tip.length;
  }
  console.log(new Date().toLocaleString(), tweet["total_tip_amount"]);

  return [users_to_tip, mistyped_users];
}

export async function validate_sender_account(
  Twitter,
  tweet,
  userID,
  screenName,
  RESPONSES
) {
  /*
  Validate that the sender has an account with the tip bot, and has enough IOTX to cover the tip.
  */

  console.log(new Date().toLocaleString(), "Validating sender account...");

  let user = await getUserFromDB(userID);
  if (!user) {
    //User isn't registered yet
    tweet["sender_account"] = null;
    Twitter.post(
      "statuses/update",
      {
        status: RESPONSES.tweet_no_account_registered_message("en", screenName),
        in_reply_to_status_id: tweet["id"]
      },
      function(err, data, response) {
        if (err) {
          console.log(err);
        } else {
          console.log("User tried to tip without an account: ", screenName);
        }
      }
    );
    return tweet;
  }

  tweet["sender_account"] = user.accountNumber;
  tweet["sender_address"] = user.address;
  tweet["sender_privateKey"] = user.privateKey;

  return tweet;
}

export function getWordAt(str, pos) {
  /* Finds a word at position in string and returns it */

  // Perform type conversions.
  str = String(str);
  pos = Number(pos) >>> 0;

  // Search for the word's beginning and end.
  var left = str.slice(0, pos + 1).search(/\S+$/),
    right = str.slice(pos).search(/\s/);

  // The last word in the string is a special case.
  if (right < 0) {
    return str.slice(left);
  }

  // Return the word, using the located bounds to extract it from the string.
  return str.slice(left, right + pos);
}

export function check_invalid_chars(user) {
  /*
    Check user for invalid ending characters
    */
  let invalid_ending_chars = [".", "!", "?", ","];

  if (invalid_ending_chars.includes(user[user.length - 1])) {
    return user.slice(0, -1);
  }

  return user;
}

async function getUserFromDB(userID) {
  try {
    const collection = await getDB()
      .db()
      .collection("TipUsers");
    var user = await collection.findOne({ accountNumber: { $eq: userID } });
  } catch (err) {
    console.log(err);
  }

  return user;
}
