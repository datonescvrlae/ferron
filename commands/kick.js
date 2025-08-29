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

	// Additional parameters for the command such as a user or channel

	// In this case we first specify which user to kick which is a required parameter
	// And there's also an optional reason that can be given
	.addUserOption(option => option
		.setName("user")
		.setDescription("The user to kick from the server.")

		.setRequired(true)
	)

	.addStringOption(option => option // This gets defaulted to "No reason given." if left empty
		.setName("reason")
		.setDescription("Reason for kicking the user.")
	),

	// This is the function that will be called when the command is ran
	async execute(interaction) {
		const guildMember = interaction.options.getMember("user")
		const reason = interaction.options.getString("reason") ?? "No reason given."

		guildMember.kick(reason) // And finally kick the user from the guild
	},

	// What permissions the user must have to be able to use this command
	// You can also specify which roles can use this command by modifying the config
	permissions: [PermissionsBitField.Flags.KickMembers]
}
