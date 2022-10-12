import { Socket, createSocket, RemoteInfo } from "dgram";
import Logger from "../Logger";
import Command, { CommandType } from "./Command";

class Server {
	host: string;
	port: number;

	socket: Socket;

	constructor(host: string, port: number) {
		this.host = host;
		this.port = port;

		this.socket = createSocket("udp4");
	}

	async init() {
		return new Promise<void>((resolve, reject) => {
			this.socket.connect(this.port, this.host);

			this.socket.on("message", this.listenForResponse.bind(this));

			this.socket.on("connect", () => {
				Logger.info(`Connected to ${this.host}:${this.port}. Sending handshake...`);

				this.sendHandshake();

				resolve();
			});

			this.socket.on("error", (err) => {
				Logger.error(err.message);
				reject(err);
			});
		});
	}

	sendHandshake() {
		let command = Command.handshake();

		this.socket.send(command, (err) => {
			if (err) {
				Logger.error(err.message);
				return;
			}

			Logger.info("Sent handshake to server");
		});
	}

	sendAdd(num1: number, num2: number) {
		let command = Command.add(num1, num2);

		this.socket.send(command, (err) => {
			if (err) {
				Logger.error(err.message);
				return;
			}

			Logger.info(`Sent add command to server: ${num1} + ${num2}`);
		});
	}

	sendSubtract(num1: number, num2: number) {
		let command = Command.subtract(num1, num2);

		this.socket.send(command, (err) => {
			if (err) {
				Logger.error(err.message);
				return;
			}

			Logger.info(`Sent subtract command to server: ${num1} - ${num2}`);
		});
	}

	sendMultiply(num1: number, num2: number) {
		let command = Command.multiply(num1, num2);

		this.socket.send(command, (err) => {
			if (err) {
				Logger.error(err.message);
				return;
			}

			Logger.info(`Sent multiply command to server: ${num1} * ${num2}`);
		});
	}

	sendDivide(num1: number, num2: number) {
		let command = Command.divide(num1, num2);

		this.socket.send(command, (err) => {
			if (err) {
				Logger.error(err.message);
				return;
			}

			Logger.info(`Sent divide command to server: ${num1} / ${num2}`);
		});
	}

	sendPing() {
		let command = Command.ping();

		this.socket.send(command, (err) => {
			if (err) {
				Logger.error(err.message);
				return;
			}

			Logger.info("Sent ping command to server");
		});
	}

	listenForResponse(msg: Buffer, rinfo: RemoteInfo) {
		// The first byte of the message is the command ID.
		let command = msg.readUint8(0);

		// Handle the command
		switch (command) {
			case CommandType.HANDSHAKE:
				Logger.info("Received handshake from server");
				break;
			case CommandType.ADD:
				Logger.info(`Received add response from server: ${msg.readFloatBE(1)}`);
				break;
			case CommandType.SUBTRACT:
				Logger.info(`Received subtract response from server: ${msg.readFloatBE(1)}`);
				break;
			case CommandType.MULTIPLY:
				Logger.info(`Received multiply response from server: ${msg.readFloatBE(1)}`);
				break;
			case CommandType.DIVIDE:
				Logger.info(`Received divide response from server: ${msg.readFloatBE(1)}`);
				break;
			case CommandType.PING:
				Logger.info(`Received ping response from server: ${msg.readFloatBE(1)}`);
				break;
			default:
				Logger.warn(`Received unknown command from server: ${command}`);
				break;
		}
	}
}

export default Server;
