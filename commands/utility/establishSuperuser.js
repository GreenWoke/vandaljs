import { SlashCommandBuilder } from 'discord.js';
import { User } from '../../modules/sql.js'
import vandalAdminRole from '../../config.json' with {type: "json"};
export default {
    data: new SlashCommandBuilder()
        .setName('admin')
        .setDescription('Elevates the command runners permissions level'),
    async execute(interaction) {
        const userObject = await User.create(interaction.user.id)
        console.log(vandalAdminRole);
        if (interaction.member.roles.cache.has(vandalAdminRole.vandalAdminRole)) {
            userObject.admin_level = 2;
            await userObject.save();
            await interaction.reply('Your permissions value has been elevated!');
        } else {
            await interaction.reply('You are not authorized!');
        }

    },
};