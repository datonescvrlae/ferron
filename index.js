/*

	This code was written by Scvrlae (@datonescvrlae) and is his property. Unauthorized use and/or
	distribution of this script is strongly prohibited! PLEASE ask first!

	  ██████  ▄████▄ ██▒   █▓ ██▀███   ██▓    ▄▄▄      ▓█████ 
	▒██    ▒ ▒██▀ ▀█▓██░   █▒▓██ ▒ ██▒▓██▒   ▒████▄    ▓█   ▀ 
	░ ▓██▄   ▒▓█    ▄▓██  █▒░▓██ ░▄█ ▒▒██░   ▒██  ▀█▄  ▒███   
	  ▒   ██▒▒▓▓▄ ▄██▒▒██ █░░▒██▀▀█▄  ▒██░   ░██▄▄▄▄██ ▒▓█  ▄ 
	▒██████▒▒▒ ▓███▀ ░ ▒▀█░  ░██▓ ▒██▒░██████▒▓█   ▓██▒░▒████▒
	
	This file is part of the Ferron Discord bot owned and maintained by Scvrlae (@datonescvrlae).
	It is private and not available for use under any circumstances!

*/

const {Client, Collection, Events, GatewayIntentBits} = require("discord.js") // Mandatory discord.js shit
const {Token} = require("./token.json")
const {StatusType} = require("./config.json") // Global configuration variables

const fs = require("node:fs")
const path = require("node:path") // Module for joining directory paths that I didn't know existed lol

const client = new Client({intents: [GatewayIntentBits.GuildMessages]})

let angerLevel = 0 // How pissed off the bot is from 0 to 100

function getRandomInteger(minNum, maxNum) {
	return Math.floor(Math.random() * (maxNum - minNum) + minNum) // Why does JS not have a thing for this
}

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
	if (!interaction.isChatInputCommand()) return null // Not every interaction is a command so check for that

	const command = client.commands.get(interaction.commandName)

	// Always execute the command inside of a "try catch" block in case something goes wrong
	// The last thing we wanna do is crash the bot from a command error
	try {
		await command.execute(interaction)
	} catch (error) {
		console.error(error) // Output the error if the command fails to execute
	}

	// If the command annoys the bot process the new anger level lol this is so fucking stupid
	if (command.annoyance) {
		const annoyance = getRandomInteger(command.annoyance[0], command.annoyance[1])
		angerLevel += annoyance
	}
})

client.once(Events.ClientReady, readyClient => {
	// Set the custom status of the bot to whatever we want here it just looks cool that's about it lol
	readyClient.user.setPresence({
       	status: StatusType
	})

	// Log the client being ready so we know
	console.log(`Client ready! Logged in as ${readyClient.user.tag}.`)
})

onStart() // Run the start function
