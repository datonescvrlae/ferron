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

const {REST, Routes} = require("discord.js") // Classes used for slash command registration
const {Token} = require("./token.json")
const {AppId, GuildId} = require("./config.json") // Global configuration variables

const fs = require("node:fs")
const path = require("node:path") // Module for joining directory paths that I didn't know existed lol

async function onStart() {
       const rest = new REST().setToken(Token) // New rest module object

       const commandsPath = path.join(__dirname, "commands") // __dirname is basically the parent directory of this file
       const directoryToLoad = fs.readdirSync(commandsPath)

       const jsonCommands = [] // Array used to store jsonified command data for registration
       
       // Iterate all files in the commands directory and store them
       for (const file of directoryToLoad) {
              const filePath = path.join(commandsPath, file)
              const command = require(filePath)

              jsonCommands.push(command.data.toJSON()) // Store jsonified command data
       }

       // Using the routes module register all of our slash commands to the specified guild
       // It's faster than doing it globally and this bot is private so *shrug*
       try {
              await rest.put(Routes.applicationGuildCommands(AppId, GuildId))
       } catch(error) {
              console.error(error) // Make sure to log any errors that occur during this process
       }

       console.log("Successfully refreshed the bot's slash commands!")
}

onStart() // Run the start function
