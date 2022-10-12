import chalk from "chalk";

// Return the current time in the format of HH:MM:SS. Pad the numbers with 0s.
const getTime = () => {
	const date = new Date();

	const hours = date.getHours().toString().padStart(2, "0");
	const minutes = date.getMinutes().toString().padStart(2, "0");
	const seconds = date.getSeconds().toString().padStart(2, "0");

	return `${hours}:${minutes}:${seconds}`;
};

const Logger = {
	log: (message: string, tag: string = "GEN", color: string = "blue") => {
		console.log(chalk`{magenta [${getTime()}]} {${color} [${tag}]} ${message}`);
	},

	error: (message: string) => {
		Logger.log(message, "ERR", "red");
	},

	warn: (message: string) => {
		Logger.log(message, "WRN", "yellow");
	},

	info: (message: string) => {
		Logger.log(message, "INF", "cyan");
	},

	debug: (message: string) => {
		Logger.log(message, "DBG", "green");
	},

	success: (message: string) => {
		Logger.log(message, "OK!", "green");
	},
};

export default Logger;
