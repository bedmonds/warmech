export const GeneralUsage = `\`\`\`
usage: !<command> [arguments, ...]

For individual command help and detailed description, use !help <command>

Public Commands

flags        print the flag string for commonly run settings
schedule     print upcoming league races
help         print general usage information, or details on a specific command
\`\`\``;
/*
subscribe    add yourself to the notification list, becoming a subscriber

Subscriber Commands

unsubscribe  remove yourself from the notification list
\`\`\``;
 */
export const Flags = `\`\`\`
usage: !flags <label>

Print the flag string for a given label.

Supported Labels

league-1    stage 1 flags for the FFR League (Low Boost!)
league-2    stage 2 flags for the FFR League (LICH Strikes Back)
league-3    stage 3 flags for the FFR League (Pretty Pretty BB)
league-4    stage 4 flags for the FFR League (Alignment: Chaotic)
league-5    stage 5 flags for the FFR League (Alignment: Neutral)
league-6    stage 6 flags for the FFR League (Alignment: Lawful)
league-7    stage 7 flags for the FFR League (The Useful Thief)
league-8    stage 8 flags for the FFR League (Show Some Class)
\`\`\``;

export const Subscribe = `\`\`\`
usage: !subscribe

By subscribing, you will receive a direct message from WarMECH any time
a FFR room opens on SpeedRunsLive.
\`\`\``;

export const Unsubscribe = `\`\`\`
usage: !unsubscribe

Stops any further direct messages from WarMECH.
\`\`\``;
