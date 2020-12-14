const dir = require('node-dir');

//TODO make this not use an old npm library
exports.run = (commands, aliases) => {
	let files = dir.files("./commands/", {sync:true});

	files.forEach((file) => {
		//replace all instance of \ with /
		file = file.replace(/\\/g,"/");
		let command = require("../" + file);
		commands.set(command.help.name, "./../" + file);

		command.config.aliases.forEach((alias) => {
			aliases.set(alias, "./" + file);
		});
	});
}
