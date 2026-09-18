import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import {User} from '../../modules/sql.js'
import { PrEmbed } from '../../modules/embedBuilder.js'
export default {
	data: new SlashCommandBuilder()
		.setName('nfo')
		.setDescription('Shows you your total XP, level, and standing in the server.')
		.addUserOption((option) => option.setName('user').setDescription('The user you would like to see information about.')),
	async execute(interaction) {
		//who is running this command?
		const specificUser = interaction.options.getUser('user');
		//wow chatgpt actually taught me about this syntax, rare chatgpt w? I wrote this theres no direct
		//ai code anywhere in this codebase.
		const userID = specificUser ?? interaction.user;
		const userpfp = userID.displayAvatarURL({ dynamic: true, size: 1024 });
		const username = userID.globalName;
		const userObject = await User.create(userID)
		//grab the users info from the data structure
		//these are established in the same order as the params because
		//javascript or something idk
		console.log("Retrieving data for " + userID + " in the data structure.");
		level = userObject.level
		totalxp = userObject.xp
		totalmsgs = userObject.msg_sent
		hoursvc = userObject.hours_in_vc
		//call the embed builder with this data
		await interaction.reply(new PrEmbed('level', level, totalxp, totalmsgs, hoursvc, userpfp, username, userID).build());
	},
};