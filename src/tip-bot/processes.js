import { getAntenna } from "../shared/getAntenna";
import Antenna from "iotex-antenna";
import { getDB } from "../database/db";
import { toRau } from "iotex-antenna/lib/account/utils";

const GASLIMIT = "100000";
const GASPRICE = toRau("1", "Qev");

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

export async function registerProcess(Twitter, userID, RESPONSES, screenName) {
  console.log(
    new Date().toLocaleString() +
      ": Going through registration process for " +
      screenName +
      "..."
  );
  let data;
  // check if there is already a db entry with that user id as account number
  let user = await getUserFromDB(userID);

  // if yes, send details and say already registered
  if (user !== null) {
    data = {
      event: {
        type: "message_create",
        message_create: {
          target: { recipient_id: userID },
          message_data: {
            text: RESPONSES.account_already_exists_message(
              "en",
              userID,
              user.address
            )
          }
        }
      }
    };
    console.log(
      new Date().toLocaleString() +
        ": User was already registered, details sent."
    );
    // if no, create iotex account, upload to database and send to user
  } else {
    // Create iotex account
    const account = await getAntenna().iotx.accounts.create(userID);
    const collection = await getDB()
      .db()
      .collection("TipUsers");
    // Upload to database
    collection.insertOne({
      accountNumber: userID.toString(),
      screenName: screenName,
      address: account.address,
      privateKey: account.privateKey,
      created: parseInt(Date.now()).toFixed(0)
    });

    // Send message to user with details
    data = {
      event: {
        type: "message_create",
        message_create: {
          target: { recipient_id: userID },
          message_data: {
            text: RESPONSES.account_register_message(
              "en",
              userID,
              account.address
            )
          }
        }
      }
    };
    console.log(new Date().toLocaleString() + ": Successful registration!");
  }
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

export async function balanceProcess(Twitter, userID, RESPONSES, RpcMethod) {
  // Return the user's account balance
  console.log(new Date().toLocaleString() + ": Retrieving balance for user");
  let data;
  let user = await getUserFromDB(userID);
  if (!user) {
    //User isn't registered yet

    data = {
      event: {
        type: "message_create",
        message_create: {
          target: { recipient_id: userID },
          message_data: {
            text: RESPONSES.no_account_registered_message("en")
          }
        }
      }
    };
    console.log(
      new Date().toLocaleString() +
        ": User does not have an account yet, notifying."
    );
  } else {
    //User is registered, get their balance
    var account = await RpcMethod.getAccount({
      address: user.address
    });
    var balance = account.accountMeta.balance / 1e18;
    if (balance === 0 || balance === "0") {
      data = {
        event: {
          type: "message_create",
          message_create: {
            target: { recipient_id: userID },
            message_data: {
              text: RESPONSES.zero_balance_message("en", balance, user.address)
            }
          }
        }
      };
      console.log(
        new Date().toLocaleString() + ": User has zero balance, notifying!"
      );
    } else if (balance) {
      data = {
        event: {
          type: "message_create",
          message_create: {
            target: { recipient_id: userID },
            message_data: {
              text: RESPONSES.balance_message("en", balance, user.address)
            }
          }
        }
      };
      console.log(new Date().toLocaleString() + ": Notified user of balance.");
    } else {
      data = {
        event: {
          type: "message_create",
          message_create: {
            target: { recipient_id: userID },
            message_data: {
              text: RESPONSES.balance_error_message("en", balance, user.address)
            }
          }
        }
      };
      console.log(new Date().toLocaleString() + ": Couldn't retrieve balance.");
    }
  }

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

export async function depositProcess(
  Twitter,
  userID,
  RESPONSES,
  screenName,
  registerProcess
) {
  // Return the deposit ddress for the user's account
  console.log(
    new Date().toLocaleString() + ": Retrieving deposit address for user"
  );
  let data;
  let user = await getUserFromDB(userID);
  if (!user) {
    //User isn't registered yet
    data = {
      event: {
        type: "message_create",
        message_create: {
          target: { recipient_id: userID },
          message_data: {
            text: RESPONSES.deposit_no_account_registered_message("en")
          }
        }
      }
    };
    Twitter.post("direct_messages/events/new", data, function(
      err,
      data,
      response
    ) {
      if (err) {
        console.log(err);
      }
    });
    console.log(
      new Date().toLocaleString() +
        ": User does not have an account yet, notifying."
    );
    registerProcess(Twitter, userID, RESPONSES, screenName);
  } else {
    //User is registered
    data = {
      event: {
        type: "message_create",
        message_create: {
          target: { recipient_id: userID },
          message_data: {
            text: RESPONSES.deposit_message("en", user.address)
          }
        }
      }
    };
    console.log(
      new Date().toLocaleString() + ": Notified user of their deposit address"
    );
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

export async function tipDirectMessageProcess(
  Twitter,
  userID,
  RESPONSES,
  screenName,
  registerProcess
) {
  let data;
  let user = await getUserFromDB(userID);
  if (!user) {
    //User isn't registered yet
    data = {
      event: {
        type: "message_create",
        message_create: {
          target: { recipient_id: userID },
          message_data: {
            text: RESPONSES.deposit_no_account_registered_message("en")
          }
        }
      }
    };
    Twitter.post("direct_messages/events/new", data, function(
      err,
      data,
      response
    ) {
      if (err) {
        console.log(err);
      }
    });
    console.log(
      new Date().toLocaleString() +
        ": User does not have an account yet, notifying."
    );
    await registerProcess(Twitter, userID, RESPONSES, screenName);
    data = {
      event: {
        type: "message_create",
        message_create: {
          target: { recipient_id: userID },
          message_data: {
            text: RESPONSES.tip_dm_message("en")
          }
        }
      }
    };
    Twitter.post("direct_messages/events/new", data, function(
      err,
      data,
      response
    ) {
      if (err) {
        console.log(err);
      }
    });
  } else {
    data = {
      event: {
        type: "message_create",
        message_create: {
          target: { recipient_id: userID },
          message_data: {
            text: RESPONSES.tip_dm_message("en")
          }
        }
      }
    };
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

export async function tip_process(
  Twitter,
  tweet,
  RESPONSES,
  screenName,
  registerProcess,
  set_tip_list,
  check_invalid_chars,
  userID,
  validate_sender_account,
  RpcMethod
) {
  let tips = await set_tip_list(
    Twitter,
    tweet,
    screenName,
    check_invalid_chars
  );

  if (tips[1].length !== 0 && tips[0].length > 0) {
    // If there are mistyped users in the tweet but some successful users to tip, sent a tweet to tell the tipper
    Twitter.post(
      "statuses/update",
      {
        status: RESPONSES.mistyped_user_message("en", screenName, tips[1]),
        in_reply_to_status_id: tweet["id"]
      },
      function(err, data, response) {
        if (err) {
          console.log(err);
        } else {
          console.log("User mistyped recipients - Notified user.");
        }
      }
    );
  }

  if (tips[1].length !== 0 && tips[0].length === 0) {
    // If all users were mistyped, sent tweet
    Twitter.post(
      "statuses/update",
      {
        status: RESPONSES.all_mistyped_user_message("en", screenName),
        in_reply_to_status_id: tweet["id"]
      },
      function(err, data, response) {
        if (err) {
          console.log(err);
        } else {
          console.log("User mistyped recipients - Notified user.");
        }
      }
    );
  }

  if (tips[1].length === 0 && tips[0].length === 0) {
    // If incorrect format
    Twitter.post(
      "statuses/update",
      {
        status: RESPONSES.incorrect_format_message("en", screenName),
        in_reply_to_status_id: tweet["id"]
      },
      function(err, data, response) {
        if (err) {
          console.log(err);
        } else {
          console.log("User typed in wrong format - Notified user.");
        }
      }
    );
  }

  // Check that sender a has an account with us
  tweet = await validate_sender_account(
    Twitter,
    tweet,
    userID,
    screenName,
    RESPONSES
  );

  if (!tweet["sender_account"]) {
    return;
  }

  // Check that sender has enough balance to cover total tip amount
  tweet = await validate_total_tip_amount(
    Twitter,
    tweet,
    RpcMethod,
    RESPONSES,
    screenName
  );

  if (tweet["tip_amount"] <= 0) {
    return;
  }

  // Process tips

  tweet = await send_tip(
    Twitter,
    tweet,
    tips[0],
    RESPONSES,
    userID,
    screenName
  );
}

export async function send_tip(
  Twitter,
  tweet,
  users_to_tip,
  RESPONSES,
  userID,
  screenName
) {
  let tipHash;
  let tipHashes = [];
  let account;
  const antenna = new Antenna(`http://${process.env.IOTEX_CORE_URL}`);
  users_to_tip.forEach(async (user, i) => {
    console.log(
      new Date().toLocaleString(),
      `: Sending tip to ${user.receiver_screen_name}`
    );
    // handle self tips
    if (user.receiver_screen_name === userID) {
      Twitter.post(
        "statuses/update",
        {
          status: RESPONSES.self_tip_message("en", screenName),
          in_reply_to_status_id: tweet["id"]
        },
        function(err, data, response) {
          if (err) {
            console.log(err);
          } else {
            console.log("User tried to self tip, notified.");
          }
        }
      );
      return;
    } else {
      // Not a self tip
      // Check if receiver has an account

      let recipient_account = await getUserFromDB(user.receiver_id);
      if (!recipient_account) {
        // Recipient doesn't have an account, make them one
        console.log("User doesn't have an account, registering.");
        account = await antenna.iotx.accounts.create(user.receiver_id);
        const collection = await getDB()
          .db()
          .collection("TipUsers");
        // Upload to database
        collection.insertOne({
          accountNumber: user.receiver_id.toString(),
          screenName: user.receiver_screen_name,
          address: account.address,
          privateKey: account.privateKey,
          created: parseInt(Date.now()).toFixed(0)
        });
        user["address"] = account.address;
      } else {
        console.log("User already has an account.");

        user["address"] = recipient_account.address;
      }

      try {
        // Send transfer
        console.log("unlocking wallet");
        var unlockedWallet = await antenna.iotx.accounts.privateKeyToAccount(
          tweet.sender_privateKey
        );
        console.log("sending transfer");

        tipHash = await antenna.iotx.sendTransfer({
          from: unlockedWallet.address,
          to: user.address,
          value: toRau(tweet.tip_amount, "iotx"),
          gasLimit: GASLIMIT,
          gasPrice: GASPRICE
        });
        tweet["tip_hash"] = tipHash;
        tipHashes.push(tipHash);
        // Upload tip to database
        const tipCollection = await getDB()
          .db()
          .collection("TipHistory");

        tipCollection.insertOne({
          sender: userID,
          recipient: user.receiver_screen_name,
          amount: tweet.tip_amount,
          hash: tipHash,
          tweetID: tweet.id,
          tweetContent: tweet.text
        });

        // Send tweet to recipient to notify them of their new monies

        Twitter.post(
          "statuses/update",
          {
            status: RESPONSES.tip_received_message(
              "en",
              user.receiver_screen_name,
              tweet.tip_amount,
              screenName
            )
          },
          function(err, data, response) {
            if (err) {
              console.log(err);
            } else {
              console.log(`Notified ${user.receiver_screen_name} of tip`);
            }
          }
        );

        // Notify sender of successful tips
        // Single tip
        if (users_to_tip.length === 1) {
          Twitter.post(
            "statuses/update",
            {
              status: RESPONSES.tip_success_message(
                "en",
                screenName,
                tweet["tip_hash"]
              ),
              in_reply_to_status_id: tweet["id"]
            },
            function(err, data, response) {
              if (err) {
                console.log(err);
              } else {
                console.log("User tried to self tip, notified.");
              }
            }
          );
        } else if (users_to_tip.length > 1) {
          Twitter.post(
            "statuses/update",
            {
              status: RESPONSES.multi_tip_success_message(
                "en",
                screenName,
                users_to_tip.length,
                unlockedWallet.address
              ),
              in_reply_to_status_id: tweet["id"]
            },
            function(err, data, response) {
              if (err) {
                console.log(err);
              } else {
                console.log("User tried to self tip, notified.");
              }
            }
          );
        }
      } catch (err) {
        console.log(err);
        Twitter.post(
          "statuses/update",
          {
            status: RESPONSES.tip_error_message("en", screenName),
            in_reply_to_status_id: tweet["id"]
          },
          function(err, data, response) {
            if (err) {
              console.log(err);
            } else {
              console.log(`Notified ${user.receiver_screen_name} of tip`);
            }
          }
        );
      }
    }
  });
  tweet["tip_hashes"] = tipHashes;

  return tweet;
}

export async function validate_total_tip_amount(
  Twitter,
  tweet,
  RpcMethod,
  RESPONSES,
  screenName
) {
  /*
  Validate that the sender has enough IOTX to cover the tip to all users
  */
  console.log("Validating total tip amount");

  var account = await RpcMethod.getAccount({
    address: tweet["sender_address"]
  });
  var balance = account.accountMeta.balance / 1e18;

  if (
    (balance < tweet["total_tip_amount"] + 1 &&
      balance > tweet["total_tip_amount"]) ||
    balance === tweet["total_tip_amount"]
  ) {
    console.log(
      "User has good balance but didn't leave at least 1 IOTX for gas fee"
    );
    tweet["tip_amount"] = -1;
    Twitter.post(
      "statuses/update",
      {
        status: RESPONSES.not_enough_gas_message("en", screenName),
        in_reply_to_status_id: tweet["id"]
      },
      function(err, data, response) {
        if (err) {
          console.log(err);
        } else {
          console.log("User didn't leave enough IOTX for gas: ", screenName);
        }
      }
    );
  } else if (balance < tweet["total_tip_amount"]) {
    console.log("User doesn't have enough IOTX to tip everyone");
    tweet["tip_amount"] = -1;
    Twitter.post(
      "statuses/update",
      {
        status: RESPONSES.balance_too_low_message("en", screenName),
        in_reply_to_status_id: tweet["id"]
      },
      function(err, data, response) {
        if (err) {
          console.log(err);
        } else {
          console.log(
            "User tried to tip more than they have in their account: ",
            screenName
          );
        }
      }
    );
  }

  return tweet;
}

export async function withdraw_process(
  Twitter,
  userID,
  RESPONSES,
  message,
  RpcMethod
) {
  /*
  When the user sends !withdraw dm, send their entire balance to the provided account.  If there is no provided account
  reply with an error.
  */
  console.log(new Date().toLocaleString() + ": In account withdrawal process.");
  let data;
  let tipHash;
  let balance;
  let message_array = message.split(" ");
  const antenna = new Antenna(`http://${process.env.IOTEX_CORE_URL}`);

  if (message_array.length === 2 || message_array.length === 3) {
    if (
      (message_array.length === 3 && isNaN(message_array[1])) ||
      (message_array.length === 2 && !isNaN(message_array[1]))
    ) {
      // Invalid syntax, notify user
      console.log(
        new Date().toLocaleString() + ": Invalid withdraw syntax, notifying."
      );
      data = {
        event: {
          type: "message_create",
          message_create: {
            target: { recipient_id: userID },
            message_data: {
              text: RESPONSES.invalid_withdrawal_syntax_message("en")
            }
          }
        }
      };
    }
    // Potentially valid syntax. Retrieve balance

    // Prepare DB
    const withdrawCollection = await getDB()
      .db()
      .collection("WithdrawalHistory");

    let user = await getUserFromDB(userID);
    if (!user) {
      //User isn't registered yet

      data = {
        event: {
          type: "message_create",
          message_create: {
            target: { recipient_id: userID },
            message_data: {
              text: RESPONSES.no_account_registered_message("en")
            }
          }
        }
      };
      console.log(
        new Date().toLocaleString() +
          ": User does not have an account yet, notifying."
      );
    } else {
      //User is registered, get their balance
      var account = await RpcMethod.getAccount({
        address: user.address
      });
      balance = account.accountMeta.balance / 1e18;
      if (balance === 0 || balance === "0") {
        data = {
          event: {
            type: "message_create",
            message_create: {
              target: { recipient_id: userID },
              message_data: {
                text: RESPONSES.zero_balance_message(
                  "en",
                  balance,
                  user.address
                )
              }
            }
          }
        };
        console.log(
          new Date().toLocaleString() + ": User has zero balance, notifying!"
        );
      } else if (balance) {
        if (message_array.length === 2) {
          if (message_array[1].length !== 41) {
            console.log("User entered an invalid io1 address");
            // Address is incorrect
            data = {
              event: {
                type: "message_create",
                message_create: {
                  target: { recipient_id: userID },
                  message_data: {
                    text: RESPONSES.address_syntax_message("en")
                  }
                }
              }
            };
            Twitter.post("direct_messages/events/new", data, function(
              err,
              data,
              response
            ) {
              if (err) {
                console.log(err);
              }
            });
            return 1;
          }

          // withdraw entire balance
          try {
            // Send transfer
            console.log("unlocking wallet");
            var unlockedWallet = await antenna.iotx.accounts.privateKeyToAccount(
              user.privateKey
            );
            console.log("withdrawing");

            tipHash = await antenna.iotx.sendTransfer({
              from: unlockedWallet.address,
              to: message_array[1],
              value: toRau(balance - 0.02, "iotx"),
              gasLimit: GASLIMIT,
              gasPrice: GASPRICE
            });
          } catch (err) {
            console.log(err);
            console.log("Couldn't withdraw");
            data = {
              event: {
                type: "message_create",
                message_create: {
                  target: { recipient_id: userID },
                  message_data: {
                    text: RESPONSES.withdraw_error_message("en")
                  }
                }
              }
            };
          }
          data = {
            event: {
              type: "message_create",
              message_create: {
                target: { recipient_id: userID },
                message_data: {
                  text: RESPONSES.withdraw_success_message(
                    "en",
                    balance - 0.02,
                    tipHash
                  )
                }
              }
            }
          };
          withdrawCollection.insertOne({
            recipient: userID,
            amount: balance - 0.02,
            hash: tipHash,
            message: message
          });
        } else {
          if (message_array[2].length !== 41) {
            console.log("User entered an invalid io1 address");
            // Address is incorrect
            data = {
              event: {
                type: "message_create",
                message_create: {
                  target: { recipient_id: userID },
                  message_data: {
                    text: RESPONSES.address_syntax_message("en")
                  }
                }
              }
            };
            Twitter.post("direct_messages/events/new", data, function(
              err,
              data,
              response
            ) {
              if (err) {
                console.log(err);
              }
            });
            return 1;
          }
          let withdrawal_amount = message_array[1];

          if (withdrawal_amount >= balance) {
            // Don't have enough to withdraw
            console.log(
              "User doesn't have enough balance to withdraw this amount"
            );
            data = {
              event: {
                type: "message_create",
                message_create: {
                  target: { recipient_id: userID },
                  message_data: {
                    text: RESPONSES.withdraw_balance_error("en")
                  }
                }
              }
            };
          }
          // withdraw specified amount
          try {
            // Send transfer
            console.log("unlocking wallet");
            var unlockedWallet = await antenna.iotx.accounts.privateKeyToAccount(
              user.privateKey
            );
            console.log("withdrawing");

            tipHash = await antenna.iotx.sendTransfer({
              from: unlockedWallet.address,
              to: message_array[2],
              value: toRau(message_array[1], "iotx"),
              gasLimit: GASLIMIT,
              gasPrice: GASPRICE
            });
          } catch (err) {
            console.log(err);
            console.log("Couldn't withdraw");
            data = {
              event: {
                type: "message_create",
                message_create: {
                  target: { recipient_id: userID },
                  message_data: {
                    text: RESPONSES.withdraw_error_message("en")
                  }
                }
              }
            };
          }

          data = {
            event: {
              type: "message_create",
              message_create: {
                target: { recipient_id: userID },
                message_data: {
                  text: RESPONSES.withdraw_success_message(
                    "en",
                    message_array[1],
                    tipHash
                  )
                }
              }
            }
          };

          withdrawCollection.insertOne({
            recipient: userID,
            amount: message_array[1],
            hash: tipHash,
            message: message
          });
        }

        console.log(new Date().toLocaleString() + ": Withdrawal successful.");
      } else {
        // Invalid withdrawal syntax, notify user
        data = {
          event: {
            type: "message_create",
            message_create: {
              target: { recipient_id: userID },
              message_data: {
                text: RESPONSES.invalid_withdrawal_syntax_message("en")
              }
            }
          }
        };
      }

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
  } else {
    //invalid syntax
    console.log("User tried to withdraw with wrong syntax");
    data = {
      event: {
        type: "message_create",
        message_create: {
          target: { recipient_id: userID },
          message_data: {
            text: RESPONSES.invalid_withdrawal_syntax_message("en")
          }
        }
      }
    };

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

export async function giveaway_process(
  Twitter,
  userID,
  RESPONSES,
  RpcMethod,
  screenName,
  registerProcess
) {
  /*
  When the user sends !giveaway dm, register them if not registered and then send them 10 IOTX.
  */

  console.log(new Date().toLocaleString() + ": Going through giveaway process");
  let data;
  let user = await getUserFromDB(userID);
  let tipHash;
  const antenna = new Antenna(`http://${process.env.IOTEX_CORE_URL}`);

  if (!user) {
    //User isn't registered yet

    // Register them
    registerProcess(Twitter, userID, RESPONSES, screenName);

    // Set enteredGiveaway = true in database
    const collection = await getDB()
      .db()
      .collection("TipUsers");

    await collection.update(
      {
        screenName: { $eq: screenName }
      },
      { $set: { enteredGiveaway: true } }
    );

    // Send 10 IOTX

    console.log("unlocking wallet");
    var unlockedWallet = await antenna.iotx.accounts.privateKeyToAccount(
      process.env.giveawayAccountPrivateKey
    );
    console.log("sending 10 iotx");

    tipHash = await antenna.iotx.sendTransfer({
      from: unlockedWallet.address,
      to: user.address,
      value: toRau(10, "iotx"),
      gasLimit: GASLIMIT,
      gasPrice: GASPRICE
    });

    // Send DM response
    data = {
      event: {
        type: "message_create",
        message_create: {
          target: { recipient_id: userID },
          message_data: {
            text: RESPONSES.giveaway_no_account_registered_message(
              "en",
              tipHash
            )
          }
        }
      }
    };

    Twitter.post("direct_messages/events/new", data, function(
      err,
      data,
      response
    ) {
      if (err) {
        console.log(err);
      }
    });
    console.log(
      new Date().toLocaleString() +
        ": User does not have an account yet, notifying and sending giveaway IOTX."
    );
  } else {
    //User is registered

    if (user.enteredGiveaway) {
      // User already entered, don't send anything.

      // Send DM response
      data = {
        event: {
          type: "message_create",
          message_create: {
            target: { recipient_id: userID },
            message_data: {
              text: RESPONSES.already_sent_giveaway_IOTX("en")
            }
          }
        }
      };

      Twitter.post("direct_messages/events/new", data, function(
        err,
        data,
        response
      ) {
        if (err) {
          console.log(err);
        }
      });
      console.log(
        new Date().toLocaleString() +
          ": User tried to enter giveaway more than once."
      );
    } else {
      // Send 10 IOTX
      console.log("unlocking wallet");
      var unlockedWallet = await antenna.iotx.accounts.privateKeyToAccount(
        process.env.giveawayAccountPrivateKey
      );
      console.log("sending 10 iotx");

      tipHash = await antenna.iotx.sendTransfer({
        from: unlockedWallet.address,
        to: user.address,
        value: toRau(10, "iotx"),
        gasLimit: GASLIMIT,
        gasPrice: GASPRICE
      });

      // Update that they've entered giveaway in DB
      const collection = await getDB()
        .db()
        .collection("TipUsers");

      await collection.update(
        {
          screenName: { $eq: screenName }
        },
        { $set: { enteredGiveaway: true } }
      );
      // Send DM response
      data = {
        event: {
          type: "message_create",
          message_create: {
            target: { recipient_id: userID },
            message_data: {
              text: RESPONSES.giveaway_message("en", tipHash)
            }
          }
        }
      };
      console.log(new Date().toLocaleString() + ": Send giveaway 10 IOTX");
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
}
