/*

	This code was written by Scvrlae (@datonescvrlae) and is his property. Unauthorized use and/or
	distribution of this script is strongly prohibited! PLEASE ask first!

	  ██████  ▄████▄ ██▒   █▓ ██▀███   ██▓    ▄▄▄      ▓█████ 
	▒██    ▒ ▒██▀ ▀█▓██░   █▒▓██ ▒ ██▒▓██▒   ▒████▄    ▓█   ▀ 
	░ ▓██▄   ▒▓█    ▄▓██  █▒░▓██ ░▄█ ▒▒██░   ▒██  ▀█▄  ▒███   
	  ▒   ██▒▒▓▓▄ ▄██▒▒██ █░░▒██▀▀█▄  ▒██░   ░██▄▄▄▄██ ▒▓█  ▄ 
	▒██████▒▒▒ ▓███▀ ░ ▒▀█░  ░██▓ ▒██▒░██████▒▓█   ▓██▒░▒████▒
	
	This file is part of the Ferron Discord bot owned and maintained by Scvrlae (@datonescvrlae).
	It is a public resource that can be used for learning!

*/

const {Client, Collection, Events, GatewayIntentBits, ActivityType} = require("discord.js") // Mandatory discord.js shit

const {Token} = require("./json/token.json")
const {Status, ActiveType, Activity} = require("./json/config.json") // Global configuration variables

const fs = require("node:fs")
const path = require("node:path") // Module for joining directory paths that I didn't know existed lol

const client = new Client({intents: [GatewayIntentBits.MessageContent, GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]})

function onStart() {
	client.commands = new Collection() // We'll store command data in here

	const commandsPath = path.join(__dirname, "commands") // __dirname is basically the parent directory of this file
	const directoryToLoad = fs.readdirSync(commandsPath)
	
	// Iterate all files in the commands directory and cache them in the client
	// That way we can just access a key in a cache instead of parsing the file system every time
	for (const file of directoryToLoad) {
		const filePath = path.join(commandsPath, file)
		const command = require(filePath)

		client.commands.set(command.data.name, command) // Cache the command
	}

	client.login(Token) // Make the bot log into the account associated with the Token var
}

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return // Not every interaction is a command so check for that

	const command = client.commands.get(interaction.commandName)

	// Always execute the command inside of a "try catch" block in case something goes wrong
	// The last thing we wanna do is crash the bot from a command error
	try {
		await command.execute(interaction)
	} catch (error) {
		console.error(error) // Output the error if the command fails to execute
	}
})

client.once(Events.ClientReady, readyClient => {
	// Set the custom status of the bot to whatever we want here it just looks cool that's about it lol
	readyClient.user.setPresence({
		activities: [{name: Activity, type: ActivityType[ActiveType]}],

       	status: Status // This is the online, idle, dnd and invisible status thingy
	})

	// Log the client being ready so we know
	console.log(`Client ready! Logged in as ${readyClient.user.tag}.`)
})

onStart() // Run the start function
