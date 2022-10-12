import { createSocket } from "dgram";
import Logger from "./Logger";

const PacketType = {
	HANDSHAKE: 0x00,
	PING: 0x01,

	ADD: 0x02,
	SUBTRACT: 0x03,
	MULTIPLY: 0x04,
	DIVIDE: 0x05,
};

const main = async () => {
	// Create a UDP socket and listen for incoming packets
	const socket = createSocket("udp4");

	// Bind the socket to the port 8008
	const port = 8008;
	socket.bind(port);

	Logger.info(`Socket bound to port ${port}. Listening for incoming packets...`);

	socket.on("message", (msg, rinfo) => {
		// Read the first byte of the packet to determine the packet type
		const packetType = msg.readUInt8(0);

		// Handle the packet based on its type
		switch (packetType) {
			case PacketType.HANDSHAKE:
				Logger.debug(`Received handshake packet from ${rinfo.address}:${rinfo.port}`);
				break;

			case PacketType.PING:
				Logger.debug(`Received ping packet from ${rinfo.address}:${rinfo.port}`);

				// Send a pong packet back to the client
				const pongPacket = Buffer.alloc(1);
				pongPacket.writeUInt8(PacketType.PING, 0);

				socket.send(pongPacket, rinfo.port, rinfo.address);

				break;

			case PacketType.ADD:
				Logger.debug(`Received add packet from ${rinfo.address}:${rinfo.port}`);

				// Read the two numbers from the packet
				const num1 = msg.readUInt32BE(1);
				const num2 = msg.readUInt32BE(5);

				// Calculate the result
				const result = num1 + num2;

				// Send the result back to the client
				const resultPacket = Buffer.alloc(5);
				resultPacket.writeUInt8(PacketType.ADD, 0);
				resultPacket.writeFloatBE(result, 1);

				socket.send(resultPacket, rinfo.port, rinfo.address);

				break;

			case PacketType.SUBTRACT:
				Logger.debug(`Received subtract packet from ${rinfo.address}:${rinfo.port}`);

				// Read the two numbers from the packet
				const num3 = msg.readUInt32BE(1);
				const num4 = msg.readUInt32BE(5);

				// Calculate the result
				const result2 = num3 - num4;

				// Send the result back to the client
				const resultPacket2 = Buffer.alloc(5);
				resultPacket2.writeUInt8(PacketType.SUBTRACT, 0);
				resultPacket2.writeFloatBE(result2, 1);

				socket.send(resultPacket2, rinfo.port, rinfo.address);

				break;

			case PacketType.MULTIPLY:
				Logger.debug(`Received multiply packet from ${rinfo.address}:${rinfo.port}`);

				// Read the two numbers from the packet
				const num5 = msg.readUInt32BE(1);
				const num6 = msg.readUInt32BE(5);

				// Calculate the result
				const result3 = num5 * num6;

				// Send the result back to the client
				const resultPacket3 = Buffer.alloc(5);
				resultPacket3.writeUInt8(PacketType.MULTIPLY, 0);
				resultPacket3.writeFloatBE(result3, 1);

				socket.send(resultPacket3, rinfo.port, rinfo.address);

				break;

			case PacketType.DIVIDE:
				Logger.debug(`Received divide packet from ${rinfo.address}:${rinfo.port}`);

				// Read the two numbers from the packet
				const num7 = msg.readUInt32BE(1);
				const num8 = msg.readUInt32BE(5);

				// Calculate the result
				const result4 = num7 / num8;

				// Send the result back to the client
				const resultPacket4 = Buffer.alloc(5);
				resultPacket4.writeUInt8(PacketType.DIVIDE, 0);
				resultPacket4.writeFloatBE(result4, 1);

				socket.send(resultPacket4, rinfo.port, rinfo.address);

				break;

			default:
				Logger.error(`Received unknown packet type ${packetType} from ${rinfo.address}:${rinfo.port}`);
				break;
		}
	});
};

main();
