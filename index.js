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

const {Client, Events, GatewayIntentBits} = require("discord.js") // Mandatory discord.js shit
const {Token} = require("./config.json")

const client = new Client({intents: [GatewayIntentBits.GuildMessages]})

client.once(Events.ClientReady, readyClient => {
	// Set the custom status of the bot to whatever we want here it just looks cool that's about it lol
	readyClient.user.setPresence({
       	status: "dnd"
	})

	// Log the client being ready so we know
	console.log(`Client ready! Logged in as ${readyClient.user.tag}.`)
})

client.login(Token) // Make the bot log into the account associated with the Token var
