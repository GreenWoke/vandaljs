import {
    ContextMenuCommandBuilder,
    ApplicationCommandType,
    ActionRowBuilder,
    ChannelSelectMenuBuilder,
    ChannelType
} from 'discord.js';
import { User } from '../../modules/sql.js'
export default {
    data: new ContextMenuCommandBuilder()
        .setName('echo')
        .setType(ApplicationCommandType.Message),
    async execute(interaction) {
        const userObject = await User.create(interaction.user.id);
        const targetMessage = interaction.targetMessage;
   if (!userObject.authenticateUser()) {
            await interaction.reply('You do not have permission to execute this command.');

        } else {
        const select = new ChannelSelectMenuBuilder()
            .setCustomId(`echo_select_${interaction.id}`)
            .setPlaceholder('Select a channel')
            .addChannelTypes(ChannelType.GuildText); // restrict if you want
        const row = new ActionRowBuilder().addComponents(select);
        await interaction.reply({
            content: 'Where do you want to send this message?',
            components: [row],
            ephemeral: true
        });
        // Store message temporarily
        interaction.client.echoCache ??= new Map();
        interaction.client.echoCache.set(interaction.id, targetMessage);
        };

   
    }
};