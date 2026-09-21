//Run this .js file in your terminal to unregister slash commands...
//useful for removing endpoints that will never respond in the case of test bot applications.

const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');

const rest = new REST().setToken(token);

(async () => {
  try {
    console.log('Started clearing application (/) commands...');

    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: [] },
    );
    console.log('Started clearing global application (/) commands...')
    await rest.put(
      Routes.applicationCommands(clientId, guildId),
      { body: [] },
    );

    console.log('Successfully cleared all guild slash commands.');
  } catch (error) {
    console.error(error);
  }
})();
