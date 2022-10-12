const CommandType = {
	HANDSHAKE: 0x00,
	PING: 0x01,

	ADD: 0x02,
	SUBTRACT: 0x03,
	MULTIPLY: 0x04,
	DIVIDE: 0x05,

	QUIT: 0x06,
};

const Command = {
	handshake: () => {
		return Buffer.from([CommandType.HANDSHAKE]);
	},

	ping: () => {
		return Buffer.from([CommandType.PING]);
	},

	/* Number commands */
	// All number commands look like this:
	// Command type (1 byte) | Number 1 (4 bytes) | Number 2 (4 bytes)
	// The numbers are stored in big endian format

	add: (num1: number, num2: number) => {
		if (num1 > 0xffffffff || num2 > 0xffffffff) {
			throw new Error("Number is too large");
		}

		const buffer = Buffer.alloc(9);
		buffer.writeUInt8(CommandType.ADD, 0);
		buffer.writeUInt32BE(num1, 1);
		buffer.writeUInt32BE(num2, 5);

		return buffer;
	},

	subtract: (num1: number, num2: number) => {
		if (num1 > 0xffffffff || num2 > 0xffffffff) {
			throw new Error("Number is too large");
		}

		const buffer = Buffer.alloc(9);
		buffer.writeUInt8(CommandType.SUBTRACT, 0);
		buffer.writeUInt32BE(num1, 1);
		buffer.writeUInt32BE(num2, 5);

		return buffer;
	},

	multiply: (num1: number, num2: number) => {
		if (num1 > 0xffffffff || num2 > 0xffffffff) {
			throw new Error("Number is too large");
		}

		const buffer = Buffer.alloc(9);
		buffer.writeUInt8(CommandType.MULTIPLY, 0);
		buffer.writeUInt32BE(num1, 1);
		buffer.writeUInt32BE(num2, 5);

		return buffer;
	},

	divide: (num1: number, num2: number) => {
		if (num1 > 0xffffffff || num2 > 0xffffffff) {
			throw new Error("Number is too large");
		}

		const buffer = Buffer.alloc(9);
		buffer.writeUInt8(CommandType.DIVIDE, 0);
		buffer.writeUInt32BE(num1, 1);
		buffer.writeUInt32BE(num2, 5);

		return buffer;
	},

	/* Misc commands */
	quit: () => {
		return Buffer.from([CommandType.QUIT]);
	},
};

export default Command;
export { CommandType };
