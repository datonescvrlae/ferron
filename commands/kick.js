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

const {SlashCommandBuilder, PermissionsBitField} = require("discord.js") // Just some discord.js shit

module.exports = {
	data: new SlashCommandBuilder() // Set data related to how the command will register
		.setName("kick")
		.setDescription("No description yet.")

		.addUserOption(option => option
			.setName("user")
			.setDescription("The user to kick from the server.")

			.setRequired(true)
		),

	// This is the function that will be called when the command is ran
	async execute(interaction) {
		
	},

	// What permissions the user must have to be able to use this command
	permissions: [PermissionsBitField.Flags.KickMembers]
}
