import Server from "./structures/Server";
import Logger from "./Logger";

const main = async () => {
	const host = "localhost";
	const port = 8008;

	// Create a new server
	const server = new Server(host, port);
	await server.init();

	// Main loop
	let shouldContinue = true;
	while (shouldContinue) {
		const input = await Logger.prompt("> ");

		const [command, ...args] = input.split(" ");

		switch (command.toLowerCase()) {
			case "quit":
			case "exit":
				shouldContinue = false;
				break;
			case "ping":
				server.sendPing();
				break;
			case "add":
				if (args.length < 2) {
					Logger.error("Invalid arguments");
					break;
				}

				const num1 = parseInt(args[0]);
				const num2 = parseInt(args[1]);

				if (isNaN(num1) || isNaN(num2)) {
					Logger.error("Invalid arguments");
					break;
				}

				server.sendAdd(num1, num2);
				break;
			case "subtract":
				if (args.length < 2) {
					Logger.error("Invalid arguments");
					break;
				}

				const num3 = parseInt(args[0]);
				const num4 = parseInt(args[1]);

				if (isNaN(num3) || isNaN(num4)) {
					Logger.error("Invalid arguments");
					break;
				}

				server.sendSubtract(num3, num4);
				break;
			case "multiply":
				if (args.length < 2) {
					Logger.error("Invalid arguments");
					break;
				}

				const num5 = parseInt(args[0]);
				const num6 = parseInt(args[1]);

				if (isNaN(num5) || isNaN(num6)) {
					Logger.error("Invalid arguments");
					break;
				}

				server.sendMultiply(num5, num6);
				break;
			case "divide":
				if (args.length < 2) {
					Logger.error("Invalid arguments");
					break;
				}

				const num7 = parseInt(args[0]);
				const num8 = parseInt(args[1]);

				if (isNaN(num7) || isNaN(num8)) {
					Logger.error("Invalid arguments");
					break;
				}

				server.sendDivide(num7, num8);
				break;
			default:
				Logger.error("Invalid command");
				break;
		}
	}
};

main();
