import { SlashCommandBuilder } from 'discord.js';
import { User } from '../../modules/sql.js'
export default {
	data: new SlashCommandBuilder()
		.setName('level')
		.setDescription('Sets Level for any given user, usable by staff only.')
		.addUserOption((option) => option.setName('user').setDescription('The user you would like to target.').setRequired(true))
		.addIntegerOption((option) => option.setName('level').setDescription('Level to set user to').setRequired(true) ),
		
	async execute(interaction) {
		const userObject = await User.create(interaction.user.id);
		const target = interaction.options.getUser('user');
		const level = interaction.options.getInteger('level');
		const targetUserObject = await User.create(target.id);
		const username = target.username;
		if(level<0){await interaction.reply('Level must be a positive value'); return;}
		if(!userObject.authenticateUser()){
			await interaction.reply('You do not have permission to execute this command.');

		}else{
			targetUserObject.setLevel(level);
			await interaction.reply('Ok! Set ' + username + "'s level to: "  + targetUserObject.level);
		}
	},
}
