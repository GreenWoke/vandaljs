import { SlashCommandBuilder } from 'discord.js';
import { User } from '../modules/sql.js';
module.exports = {
    data: new SlashCommandBuilder()
        .setName('adminCommand')
        .setDescription('Command template for commands that require authorization')
        .addUserOption((option) => option.setName('user').setDescription('The user you would like to target.').setRequired(true))
        .addIntegerOption((option) => option.setName('value').setDescription('Placeholder value').setRequired(true)),

    async execute(interaction) {
        const userObject = await User.create(interaction.author.id);
        if (!userObject.authenticateUser()) {
            await interaction.reply('You do not have permission to execute this command.');

        } else {
            await interaction.reply('Ok!  User is Admin');
        };
    },
};