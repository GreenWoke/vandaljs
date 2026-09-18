import { Events, MessageFlags, GuildMember } from 'discord.js';
import { User } from '../modules/sql.js'

export default {
    name: Events.MessageCreate,
    "once": false,

    async execute(message) {
        const userObject = await User.create(message.author);
        // Ignore bots (VERY IMPORTANT)
        const { client } = message
        if (message.author.bot) return;
        const outputChannel = client.channels.cache.get('1327755122960236636');
        const currentLevel = userObject.level
        const pingObject = "<@" + message.author + ">"
        const levelUpString = ' has reached terminal operator access level '
        const levelUpStringSentinel = ' | Congratulations, you are now a SENTINEL '
        const member = message.member;
        const sentinelRole = message.guild.roles.cache.get('1328727053859815439')
        //userData.xpAdd(message.author, 10);
        userObject.msgAdd(1);
        console.log('checking for level up');
        newLevel = userObject.level;
        console.log(newLevel);
        if (newLevel > currentLevel && newLevel == 10) {
            await member.roles.add(sentinelRole);
            outputChannel.send('User ' + pingObject + levelUpString + newLevel + levelUpStringSentinel);
        } else if (newLevel > currentLevel && newLevel < 10) {
            await member.roles.remove(sentinelRole);
            outputChannel.send('User ' + pingObject + levelUpString + newLevel);
        }else if (newLevel > currentLevel && newLevel > 10) {
            await member.roles.add(sentinelRole);
            outputChannel.send('User ' + pingObject + levelUpString + newLevel);
        }
    }

}