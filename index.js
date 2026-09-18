import { readdirSync, existsSync, mkdirSync } from 'node:fs';
import { Client, Collection, GatewayIntentBits, Partials } from 'discord.js';
import token from './config.json' with {type: "json"};
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const client = new Client({ intents: [
	GatewayIntentBits.Guilds, 
	GatewayIntentBits.GuildMembers, 
	GatewayIntentBits.GuildMessages, 
	GatewayIntentBits.MessageContent, 
	GatewayIntentBits.GuildMessageReactions,
	GatewayIntentBits.GuildVoiceStates],  
	partials: [
    Partials.Message,
    Partials.Channel,
    Partials.Reaction
  ]
});
const debugmode = true
//const welcomeChannel = client.channels.cache.get('1327755122960236636');
//reading the commands folder and parsing files
client.commands = new Collection();
const foldersPath = join(__dirname, 'commands');
const commandFolders = readdirSync(foldersPath);
for (const folder of commandFolders) {
	const commandsPath = join(foldersPath, folder);
	if (debugmode) { console.log('commandsPath is ' + commandsPath); };
	const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	if (debugmode) { console.log('commandFiles is ' + commandsPath); };
	for (const file of commandFiles) {
		const filePath = join(commandsPath, file);
		const command = await import(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}
//reading the events folder and parsing files
const eventsPath = join(__dirname, 'events');
const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = join(eventsPath, file);
	const event = await import(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}
/*
//create the userData file structure if it does not exist already.
if (!existsSync(process.cwd() + '/modules/userdata/servers')) {
	mkdirSync(process.cwd() + '/modules/userdata/servers');
}
*/
client.login(token.token)
    .then(() => console.log('Login successful'))
    .catch(error => console.error('Login failed:', error));

export default {client};