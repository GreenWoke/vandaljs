import { Events, MessageFlags } from 'discord.js'

export default {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.isChannelSelectMenu()) {
            const id = interaction.customId.split('echo_select_')[1];
            const message = interaction.client.echoCache?.get(id);

            if (!message) {
                return interaction.reply({
                    content: 'Original message not found.',
                    ephemeral: true
                });
            }

            const channel = interaction.channels.first();

            try {
                await channel.send({
                    content: message.content,
                    embeds: message.embeds,
                    files: message.attachments.map(a => a.url)
                });

                await interaction.update({
                    content: `Sent to ${channel}`,
                    components: []
                });

                interaction.client.echoCache.delete(id);

            } catch (err) {
                console.error(err);

                return interaction.reply({
                    content: 'Failed to send message.',
                    ephemeral: true
                });
            }

            return;
        }

  
        if (
            !interaction.isChatInputCommand() &&
            !interaction.isMessageContextMenuCommand()
        ) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);

            const replyPayload = {
                content: 'There was an error while executing this command!',
                flags: MessageFlags.Ephemeral
            };

            if (interaction.replied || interaction.deferred) {
                await interaction.followUp(replyPayload);
            } else {
                await interaction.reply(replyPayload);
            }
        }
    },
};