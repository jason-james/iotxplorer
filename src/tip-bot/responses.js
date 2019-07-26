const BULLET = "\u2B21";

export function help_message(language) {
  let message;
  switch (language) {
    case "en":
      message =
        "Thank you for using IoTeX Tips!  Below is a list of commands, and a description of what they do:\n\n" +
        BULLET +
        " !info: IoTeX is the auto-scalable and privacy-centric blockchain infrastructure for the Internet of Things (IoT). The native currency within the IoTeX network is IOTX. Together, the IoTeX community is leveraging the power of blockchain technology to usher in the Internet of Trusted Things. For more information, type !info.\n\n" +
        BULLET +
        " !help: The tip bot will respond to your DM with a list of commands and their functions. If you forget something, use this to get a hint of how to do it!\n\n" +
        BULLET +
        " !register: Registers your user ID for an account that is tied to it. This is used to store your tips. Make sure to withdraw to a private wallet, as the tip bot is not meant to be used for long term storage of your coins.\n\n" +
        BULLET +
        " !deposit: Returns the address that is tied to your user ID.  You can use this to deposit more IOTX into your tip account.\n\n" +
        BULLET +
        " !balance: This returns the balance of the account linked with your user ID.\n\n" +
        BULLET +
        " !tip: Tips are sent through public tweets. Mention @iotxplorer_bot in a tweet along with !tip <amount> <@username>.\n\nExample: @iotxplorer_bot !tip 100 IOTX @cryptweeter would send a 100 IOTX tip to @cryptweeter.\n\nYou can also tip multiple people with one tweet, just keep chaining on their usernames!\n\nNote: To cover gas fees, you need to leave at least 1 IOTX spare in your balance when you tip. E.g. if you want to tip 20 IOTX to somebody, you need a balance of 21 IOTX.\n\n" +
        BULLET +
        " !withdraw: Proper usage is !withdraw <address>. This will send the full balance of your tip account to the provided IoTeX (native) address.\n\nOptional: You can include an amount to withdraw by sending !withdraw <amount> <address>. \n\nExample: !withdraw 100 io14u5d66rt465ykm7t2t47qllj0reml27q30kr75 would withdraw 100 IOTX to the address io14u5d66rt465ykm7t2t47qllj0reml27q30kr75.\n\n";
      break;
    // case y:
    //   // code block
    //   break;
    default:
      message =
        "Thank you for using IoTeX Tips!  Below is a list of commands, and a description of what they do:\n\n" +
        BULLET +
        " !info: IoTeX is the auto-scalable and privacy-centric blockchain infrastructure for the Internet of Things (IoT). The native currency within the IoTeX network is IOTX. Together, the IoTeX community is leveraging the power of blockchain technology to usher in the Internet of Trusted Things. For more information, type !info.\n\n" +
        BULLET +
        " !help: The tip bot will respond to your DM with a list of commands and their functions. If you forget something, use this to get a hint of how to do it!\n\n" +
        BULLET +
        " !register: Registers your user ID for an account that is tied to it. This is used to store your tips. Make sure to withdraw to a private wallet, as the tip bot is not meant to be used for long term storage of your coins.\n\n" +
        BULLET +
        " !deposit: Returns the address that is tied to your user ID.  You can use this to deposit more IOTX into your tip account.\n\n" +
        BULLET +
        " !balance: This returns the balance of the account linked with your user ID.\n\n" +
        BULLET +
        " !tip: Tips are sent through public tweets. Mention @iotxplorer_bot in a tweet along with !tip <amount> <@username>.\n\nExample: @iotxplorer_bot !tip 100 IOTX @cryptweeter would send a 100 IOTX tip to @cryptweeter.\n\nYou can also tip multiple people with one tweet, just keep chaining on their usernames!\n\nNote: To cover gas fees, you need to leave at least 1 IOTX spare in your balance when you tip. E.g. if you want to tip 20 IOTX to somebody, you need a balance of 21 IOTX.\n\n" +
        BULLET +
        " !withdraw: Proper usage is !withdraw <address>. This will send the full balance of your tip account to the provided IoTeX (native) address.\n\nOptional: You can include an amount to withdraw by sending !withdraw <amount> <address>. \n\nExample: !withdraw 100 io14u5d66rt465ykm7t2t47qllj0reml27q30kr75 would withdraw 100 IOTX to the address io14u5d66rt465ykm7t2t47qllj0reml27q30kr75.\n\n";
  }
  return message;
}

export function account_register_message(language, userID, address) {
  let message;

  switch (language) {
    case "en":
      message = `You have successfully registered for an account.\n\nAccount number: ${userID}\nDeposit Address: ${address}`;
      break;
    default:
      message = `You have successfully registered for an account.\n\nAccount number: ${userID}\nDeposit Address: ${address}`;
  }
  return message;
}

export function iotex_info_message(language) {
  let message;

  switch (language) {
    case "en":
      message = `Understanding IoTeX: https://www.iotxplorer.io/education/understandingiotex/\nIoTeX introduction video: https://www.youtube.com/watch?v=gIVskvgzG9M&vl=en\n\nThese links should provide you with a great starting point in understanding what IoTeX, IoT, and cryptocurrency are all about.`;
      break;
    default:
      message = `Understanding IoTeX: https://www.iotxplorer.io/education/understandingiotex/\nIoTeX introduction video: https://www.youtube.com/watch?v=gIVskvgzG9M&vl=en\n\nThese links should provide you with a great starting point in understanding what IoTeX, IoT, and cryptocurrency are all about.`;
  }
  return message;
}

export function account_already_exists_message(language, userID, address) {
  let message;

  switch (language) {
    case "en":
      message = `You already have an account registered. Here are your details!\n\nAccount number: ${userID}\nDeposit Address: ${address}`;
      break;
    default:
      message = ` You already have an account registered. Here are your details!\n\nAccount number: ${userID}\nDeposit Address: ${address}`;
  }
  return message;
}

export function zero_balance_message(language, balance, address) {
  let message;

  switch (language) {
    case "en":
      message = `Your tip account has a balance of ${balance} IOTX. Deposit at least 10 IOTX to start sharing the love!\n\nYour personal deposit address is: ${address}`;
      break;
    default:
      message = `Your tip account has a balance of ${balance} IOTX. Deposit at least 10 IOTX to start sharing the love!\n\nYour personal deposit address is: ${address}`;
  }
  return message;
}

export function balance_message(language, balance, address) {
  let message;

  switch (language) {
    case "en":
      message = `Balance: ${balance} IOTX.\n\nYou can see the full transaction history for your tip account at https://www.iotxplorer.io/address/${address}`;
      break;
    default:
      message = `Balance: ${balance} IOTX.\n\nYou can see the full transaction history for your tip account at https://www.iotxplorer.io/address/${address}`;
  }
  return message;
}

export function no_account_registered_message(language) {
  let message;

  switch (language) {
    case "en":
      message = `You don't have an account with us yet. Send command !register to open an account.`;
      break;
    default:
      message = `You don't have an account with us yet. Send command !register to open an account.`;
  }
  return message;
}

export function balance_error_message(language, balance, address) {
  let message;

  switch (language) {
    case "en":
      message = `Could not retrieve balance. Check your balance manually at https://www.iotxplorer.io/address/${address} or contact us at t.me/iotxplorer`;
      break;
    default:
      message = `Could not retrieve balance. Check your balance manually at https://www.iotxplorer.io/address/${address} or contact us at t.me/iotxplorer`;
  }
  return message;
}

export function deposit_message(language, address) {
  let message;

  switch (language) {
    case "en":
      message = `Your deposit address is ${address}. Happy tipping!`;
      break;
    default:
      message = `Your deposit address is ${address}. Happy tipping!`;
  }
  return message;
}

export function deposit_no_account_registered_message(language) {
  let message;

  switch (language) {
    case "en":
      message = `You don't have an account with us yet, but we'll go ahead and register you right away!`;
      break;
    default:
      message = `You don't have an account with us yet, but we'll go ahead and register you right away!`;
  }
  return message;
}

export function tip_dm_message(language) {
  let message;

  switch (language) {
    case "en":
      message = `Tips are processed through public messages. To tip, please send a tweet in the following format:\n\n@iotxplorer_bot !tip 100 IOTX @<TipRecipient>.\n\n You can also tip multiple people with one tweet!\n\nExample: @iotxplorer_bot !tip 100 IOTX @cryptweeter @iotxplorer @iotex_io would send a 100 IOTX tip to @cryptweeter, @iotxplorer, and @iotex_io.\n\nThe person you want to tip doesn't need to have an account registered with me or an IoTeX address - I'll make one for them.`;
      break;
    default:
      message = `Tips are processed through public messages. To tip, please send a tweet in the following format:\n\n@iotxplorer_bot !tip 100 IOTX @<TipRecipient>.\n\n You can also tip multiple people with one tweet!\n\nExample: @iotxplorer_bot !tip 100 IOTX @cryptweeter @iotxplorer @iotex_io would send a 100 IOTX tip to @cryptweeter, @iotxplorer, and @iotex_io.\n\nThe person you want to tip doesn't need to have an account registered with me or an IoTeX address - I'll make one for them.`;
  }
  return message;
}

export function not_a_number_text(language, screenName) {
  let message;

  switch (language) {
    case "en":
      message = `@${screenName} Looks like the value you entered to tip was not a number. You can try again using the format @iotxplorer_bot !tip 100 @username`;
      break;
    default:
      message = `@${screenName} Looks like the value you entered to tip was not a number. You can try again using the format @iotxplorer_bot !tip 100 @username`;
  }
  return message;
}

export function below_minimum_tip(language, screenName) {
  let message;

  switch (language) {
    case "en":
      message = `@${screenName} The minimum allowable tip amount is 1 IOTX. Please increase your tip amount and try again!`;
      break;
    default:
      message = `@${screenName} The minimum allowable tip amount is 1 IOTX. Please increase your tip amount and try again!`;
  }
  return message;
}

export function maintenance_message(language, screenName) {
  let message;

  switch (language) {
    case "en":
      message = `@${screenName} IoTeX Tips is currently under maintenance. For an ETA on when you'll be able to tip again, visit our telegram at t.me/iotxplorer!`;
      break;
    default:
      message = `@${screenName} IoTeX Tips is currently under maintenance. For an ETA on when you'll be able to tip again, visit our telegram at t.me/iotxplorer!`;
  }
  return message;
}

export function mistyped_user_message(language, screenName, mistyped_array) {
  let message;

  if (mistyped_array.length === 1) {
    switch (language) {
      case "en":
        message = `@${screenName} The following receipient was mistyped and so cannot be tipped: ${
          mistyped_array[0]
        }. Please check their name and try again!`;
        break;
      default:
        message = `@${screenName} The following receipients were mistyped and so cannot be tipped: ${
          mistyped_array[0]
        }. Please check their names and try again!`;
    }
  } else if (mistyped_array.length === 2) {
    switch (language) {
      case "en":
        message = `@${screenName} The following receipients were mistyped and so cannot be tipped: ${
          mistyped_array[0]
        }, ${mistyped_array[1]}. Please check their names and try again!`;
        break;
      default:
        message = `@${screenName} The following receipients were mistyped and so cannot be tipped: ${
          mistyped_array[0]
        }, ${mistyped_array[1]}. Please check their names and try again!`;
    }
  } else if (mistyped_array.length === 3) {
    switch (language) {
      case "en":
        message = `@${screenName} The following receipients were mistyped and so cannot be tipped: ${
          mistyped_array[0]
        }, ${mistyped_array[1]}, ${
          mistyped_array[2]
        }. Please check their names and try again!`;
        break;
      default:
        message = `@${screenName} The following receipients were mistyped and so cannot be tipped: ${
          mistyped_array[0]
        }, ${mistyped_array[1]}, ${
          mistyped_array[2]
        }. Please check their names and try again!`;
    }
  } else {
    switch (language) {
      case "en":
        message = `@${screenName} You sent a tip request with at least 3 mistyped users, please check their names and try again.`;
        break;
      default:
        message = `@${screenName} You sent a tip request with at least 3 mistyped users, please check their names and try again.`;
    }
  }
  return message;
}

export function all_mistyped_user_message(language, screenName) {
  let message;

  switch (language) {
    case "en":
      message = `@${screenName} Looks like you mistyped all of the recipients. Please try again!`;
      break;
    default:
      message = `@${screenName} Looks like you mistyped all of the recipients. Please try again!`;
  }
  return message;
}

export function incorrect_format_message(language, screenName) {
  let message;

  switch (language) {
    case "en":
      message = `@${screenName} Looks like you didn't enter anyone to tip. Please try again in the format @iotxplorer_bot !tip @username`;
      break;
    default:
      message = `@${screenName} Looks like you didn't enter anyone to tip. Please try again in the format @iotxplorer_bot !tip @username`;
  }
  return message;
}

export function tweet_no_account_registered_message(language, screenName) {
  let message;

  switch (language) {
    case "en":
      message = `@${screenName} You don't have an account with me yet, so I can't process this tip! To register, send me a DM containing the command !register to make an account and start sending tips!`;
      break;
    default:
      message = `@${screenName} You don't have an account with me yet, so I can't process this tip! To register, send me a DM containing the command !register to make an account and start sending tips!`;
  }
  return message;
}

export function not_enough_gas_message(language, screenName) {
  let message;

  switch (language) {
    case "en":
      message = `@${screenName} To cover network gas costs, you have to leave at least 1 IOTX spare in your account when you want to tip. For example, if you want to tip 20 IOTX, you need a balance of 21 IOTX. Please readjust and try again!`;
      break;
    default:
      message = `@${screenName} To cover network gas costs, you have to leave at least 1 IOTX spare in your account when you want to tip. For example, if you want to tip 20 IOTX, you need a balance of 21 IOTX. Please readjust and try again!`;
  }
  return message;
}

export function balance_too_low_message(language, screenName) {
  let message;

  switch (language) {
    case "en":
      message = `@${screenName} You don't have enough IOTX in your account to cover all tips. Please deposit more to your address or lower your tip amount. For more information, DM me with !help.`;
      break;
    default:
      message = `@${screenName} You don't have enough IOTX in your account to cover all tips. Please deposit more to your address or lower your tip amount. For more information, DM me with !help.`;
  }
  return message;
}

export function self_tip_message(language, screenName) {
  let message;

  switch (language) {
    case "en":
      message = `@${screenName} Self tipping is not allowed. Please use me to share IOTX with others!`;
      break;
    default:
      message = `@${screenName} Self tipping is not allowed. Please use me to share IOTX with others!`;
  }
  return message;
}

export function tip_received_message(
  language,
  recipient,
  tipAmount,
  screenName
) {
  let message;

  switch (language) {
    case "en":
      message = `@${recipient} Hey there! @${screenName} liked your tweet so much that they tipped you ${tipAmount} IOTX for it! Send me a DM with !withdraw if you want to send it to a personal wallet, or !help for more information.`;
      break;
    default:
      message = `@${recipient} Hey there! @${screenName} liked your tweet so much that they tipped you ${tipAmount} IOTX for it! Send me a DM with !withdraw if you want to send it to a personal wallet, or !help for more information.`;
  }
  return message;
}

export function tip_error_message(language, screenName) {
  let message;

  switch (language) {
    case "en":
      message = `@${screenName} I ran into a problem whilst trying to send your tip! Please try again or let my friends over at t.me/iotxplorer know about the issue.`;
      break;
    default:
      message = `@${screenName} I ran into a problem whilst trying to send your tip! Please try again or let my friends over at t.me/iotxplorer know about the issue.`;
  }
  return message;
}

export function tip_success_message(language, screenName, address) {
  let message;

  switch (language) {
    case "en":
      message = `@${screenName} You have successfully sent a tip! To view all of your recent tips, visit https://www.iotxplorer.io/address/${address}`;
      break;
    default:
      message = `@${screenName} You have successfully sent a tip! To view all of your recent tips, visit https://www.iotxplorer.io/address/${address}`;
  }
  return message;
}

export function multi_tip_success_message(
  language,
  screenName,
  no_of_tips,
  address
) {
  let message;

  switch (language) {
    case "en":
      message = `@${screenName} You have successfully sent ${no_of_tips} tips! To view all of your recent tips, visit https://www.iotxplorer.io/address/${address}`;
      break;
    default:
      message = `@${screenName} You have successfully sent ${no_of_tips} tips! To view all of your recent tips, visit https://www.iotxplorer.io/address/${address}`;
  }
  return message;
}

export function invalid_withdrawal_syntax_message(language) {
  let message;

  switch (language) {
    case "en":
      message = `It looks like you have entered the withdraw command incorrectly. Please try again in the format !withdraw <withdraw address> or !withdraw <amount> <withdraw address>.`;
      break;
    default:
      message = `It looks like you have entered the withdraw command incorrectly. Please try again in the format !withdraw <withdraw address> or !withdraw <amount> <withdraw address>.`;
  }
  return message;
}

export function withdraw_error_message(language) {
  let message;

  switch (language) {
    case "en":
      message = `I ran into a problem whilst trying to process your withdrawal! Please try again or let my friends over at t.me/iotxplorer know about the issue.`;
      break;
    default:
      message = `I ran into a problem whilst trying to process your withdrawal! Please try again or let my friends over at t.me/iotxplorer know about the issue.`;
  }
  return message;
}

export function withdraw_balance_error(language) {
  let message;

  switch (language) {
    case "en":
      message = `You do not have enough IOTX in your account to process this withdrawal. Check your balance with !balance, adjust your balance, and try again! Note that if you are specifiying a specific amount to withdraw, you need to specify an amount smaller than your balance (~0.02 IOTX) to allow for gas fees.`;
      break;
    default:
      message = `You do not have enough IOTX in your account to process this withdrawal. Check your balance with !balance, adjust your balance, and try again! Note that if you are specifiying a specific amount to withdraw, you need to specify an amount smaller than your balance (~0.02 IOTX) to allow for gas fees.`;
  }
  return message;
}

export function withdraw_success_message(language, amount, txHash) {
  let message;

  switch (language) {
    case "en":
      message = `You have successfully withdrawn ${amount} IOTX! You can check the transaction at https://www.iotxplorer.io/actions/${txHash}. You may have to wait a few seconds for the transaction to appear on the blockchain.`;
      break;
    default:
      message = `You have successfully withdrawn ${amount} IOTX! You can check the transaction at https://www.iotxplorer.io/actions/${txHash}. You may have to wait a few seconds for the transaction to appear on the blockchain.`;
  }
  return message;
}

export function address_syntax_message(language) {
  let message;

  switch (language) {
    case "en":
      message = `It looks like you have entered an invalid IoTeX address. Please double check and try again!`;
      break;
    default:
      message = `It looks like you have entered an invalid IoTeX address. Please double check and try again!`;
  }
  return message;
}
