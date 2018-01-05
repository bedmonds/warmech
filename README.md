WarMECH - The FFR Community Discord Bot
=======================================

WarMECH is a bot that is usually online in the Final Fantasy
Randomizer community Discord server.

He can answer commonly-asked questions and notify you of ongoing
races on SpeedRunsLive.


## Installation

If you want to take WarMECH for a spin on your private server, either for
kicks or to develop features, create a Discord App, set it up as a bot 
and invite it.

### Dependencies

- ruby 2.3+; it should work on any version 1.9.3 and up, but I have not
  tested it on anything older than 2.3.
- nodejs 6.12+; again, it probably works fine on older versions.

Run `make deps` to install dependencies.

For WarMECH to log on to Discord, you'll need to create a new file in 
the project root called `auth.json`, with the following format:

    {
        "token": "YourBotUserToken"
    }


You can then run WarMECH with `make run`. 

Daemonizing and packaging the program into an executable is outside the scope
of public development.


### Help! I'm on Windows, how do I get this to work!?

Upgrade to a sane operating system; I don't give a fuck about Windows.


## Maintainer

Brian Edmonds "Artea" <[brian@bedmonds.net](mailto:brian@bedmonds.net)>
