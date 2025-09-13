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

const {REST, Routes} = require("discord.js") // Classes used for slash command registration

const {Token} = require("./json/secret/token.json")
const {AppId, GuildIds} = require("./json/config.json") // Global configuration variables

const fs = require("node:fs")
const path = require("node:path") // Module for joining directory paths that I didn't know existed lol

async function onStart() {
       const rest = new REST().setToken(Token) // New rest module object

       const commandsPath = path.join(__dirname, "commands") // __dirname is basically the parent directory of this file
       const directoryToLoad = fs.readdirSync(commandsPath)

       const jsonCommands = [] // Array used to store jsonified commands for registration
       
       // Iterate all files in the commands directory and store their command data
       for (const file of directoryToLoad) {
              const filePath = path.join(commandsPath, file)
              const command = require(filePath)

              jsonCommands.push(command.data.toJSON()) // Store jsonified command data
       }

       for (guildId of GuildIds) {
       // Using the routes module register all of our slash commands to all registered guilds
       // It's faster than doing it globally and this bot is private so *shrug*
              try {
                     await rest.put(Routes.applicationGuildCommands(AppId, guildId), {body: jsonCommands})
              } catch(error) {
                     console.error(error) // Make sure to log any errors that occur during this process
              }

       // If no release flag is specified only deploy the commands to the test server
              if (process.argv[2] != "--release") break
       }

       console.log("Successfully deployed the bot's slash commands!")
}

onStart() // Run the start function
