import { SlashCommandBuilder } from 'discord.js';
import { User } from '../../modules/sql.js'
export default {
	data: new SlashCommandBuilder()
		.setName('xp')
		.setDescription('Modifies XP for any given user, usable by staff only.')
		.addUserOption((option) => option.setName('user').setDescription('The user you would like to target.').setRequired(true))
		.addIntegerOption((option) => option.setName('qty').setDescription('Quantity, positive number to add, neative number to subtract.').setRequired(true) ),
		
	async execute(interaction) {
		const userObject = await User.create(interaction.user.id)
		const target = interaction.options.getUser('user');
		const qty = interaction.options.getInteger('qty');
		const username = target.username;
		if(!userObject.authenticateUser()){
			await interaction.reply('You do not have permission to execute this command.');

		}else{
			userObject.xpAdd(qty);
			//reply with new xp value
			await interaction.reply('Ok!  New XP Value for ' + username + ' is: ' + userObject.xp);
		};
	},
};