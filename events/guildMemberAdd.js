import { Events, MessageFlags, GuildMember } from 'discord.js';

export default {
    name: Events.GuildMemberAdd,
    "once": false,

    async execute(member) {
        const { client } = member
        const welcomeChannel = client.channels.cache.get('1327755122960236636');
        const prwelcome = [];
        const prlogo = "⠀⠀⠀⣀⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀\n⠐⡗⠂⢸⡇⠀⠀⠀⠀⣀⣀⣀⣀⣀⣀⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀\n⠀⡇⠀⢸⣇⣠⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣤⣀⠀⠀⠀\n⠀⡇⠀⣤⠈⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⡄⠀\n⢀⣇⣿⣧⠤⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⣭⣭⣭⣭⣀⣼⣿⣿⠀\n⠀⠋⣿⡿⠽⣿⣿⡿⠟⠛⠿⣿⣿⣿⣿⡇⠛⠛⢐⣶⣷⣶⣷⡾⠀\n⠀⠀⠠⢿⣿⣿⣿⠀⠀⠀⠀⢸⣿⣿⣯⠀⠀⠀⠀⢨⣭⣭⡍⠀⠀\n⠀⠀⠀⠈⠻⣿⣿⣶⣤⣤⣴⣾⣿⢿⣿⠆⢤⣤⠰⠿⠿⠟⠀⠀⠀\n⠀⠀⠀⠀⠀⠿⣿⣿⣿⣿⣿⣿⠋⠈⣿⣿⣿⣿⣿⣿⠟⠂⠀⠀⠀\n⠀⠀ ⠀⠀ ⠀⠀⢨⣍⡿⣿⣿⣿⣿⣿⣿⢛⣉⡁⠀⠀⠀⠀⠀⠀\n⠀⠀ ⠀⠀ ⠀⠀⠘⠻⢧⣿⣽⣽⣯⣿⣽⡼⠟⠃⠀⠀⠀⠀⠀⠀\n⠀ ⠀⠀⠀ ⠀⠀⠀⠀⠀⠻⢿⣿⣿⡿⠏          \n \n"
        const prline = "====================================================\n";
        prwelcome.push("INITIATING 'PROGRAM' PROTOCOL... \nWELCOMING USER", "ONLINE!\n")
        var welcomeMention = "<@" + member.id + ">"
        var welcomeMessage = prline + prwelcome[0] + " " + welcomeMention + "\n" + prwelcome[1] + prline + prlogo + prline;
        welcomeChannel.send(welcomeMessage)
    }



}