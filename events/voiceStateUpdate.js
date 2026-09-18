import {Events, ActivityType } from 'discord.js';
import { User } from '../modules/sql.js'
const voiceSessions = new Map();
export default {
    name: Events.VoiceStateUpdate,
    async execute(oldState, newState) {
        const userObject = User.create(newState.id)
        const client = newState.client;
        const guild = newState.guild;
        const sentinelRole = guild.roles.cache.get('1328727053859815439');
        const oldChannel = oldState.channel;
        const newChannel = newState.channel;
        const currentLevel = userObject.level;
        const outputChannel = client.channels.cache.get('1327755122960236636');
        // USER JOINS VC
        if (!oldChannel && newChannel) {
            voiceSessions.set(userId, Date.now());
        }

        // USER LEAVES VC
        if (oldChannel && !newChannel) {

            const joinTime = voiceSessions.get(userId);

            if (!joinTime) return;

            const timeSpent = Date.now() - joinTime;

            console.log(`${newState.member.user.tag} spent ${Math.floor(timeSpent/1000)} seconds in VC`);

            userData.addVoiceChatTime(userId, timeSpent)
            newLevel = userData.getUserData('level', userId)
            if (newLevel > currentLevel && newLevel == 10) {
            newState.member.roles.add(sentinelRole);
            outputChannel.send('User ' + pingObject + levelUpString + newLevel + levelUpStringSentinel);
        } else if (newLevel > currentLevel && newLevel < 10) {
            newState.member.roles.remove(sentinelRole);
            outputChannel.send('User ' + pingObject + levelUpString + newLevel);
        }else if (newLevel > currentLevel && newLevel > 10) {
            newState.member.roles.add(sentinelRole);
            outputChannel.send('User ' + pingObject + levelUpString + newLevel);
        }


        }

        // USER SWITCHES CHANNEL
        if (oldChannel && newChannel && oldChannel.id !== newChannel.id) {

            const joinTime = voiceSessions.get(userId);

            if (!joinTime) return;

            const timeSpent = Date.now() - joinTime;

            console.log(`${newState.member.user.tag} spent ${Math.floor(timeSpent/1000)} seconds in ${oldChannel.name}`);

    

        }
        

    },
};