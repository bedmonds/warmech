import { TextChannel, Message, Client as DiscordClient } from 'discord.js';

import { ISubscriber } from './subscriptions';
import { IFlagset } from './flags';

import * as help from './help';
import * as subscriptions from './subscriptions';
import * as flags from './flags';
import * as races from './races';


const Channels = {
	ArtcordTest: '398576343295459341'
}


export interface IStream {
	reply: (string) => void;
}


export class WarMECH {
	private client: DiscordClient;

	constructor() {
		this.client = new DiscordClient();
		this.registerEvents();
	}

	get botName() {
		return this.client.user.username;
	}

	get botUserId() {
		return this.client.user.id;
	}

	connect(token: string) : Promise<string> {
		return this.client.login(token);
	}

	disconnect() { this.client.destroy(); }

	private registerEvents() {
		this.client.on('ready', this.onClientReady.bind(this));
		this.client.on('message', this.onMessageReceived.bind(this));
	}

	//
	// Event Handlers
	//
	
	// Print client connection information to STDOUT.
	onClientReady(evt: any) {
		console.log('Connected');
		console.log(`
			Logged in as: ${this.botName} - (${this.botUserId})
		`);
		this.postToChannel(
			Channels.ArtcordTest,
			"Tremble in fear, WarMECH is here! " +
			"Whisper !help for more info."
		);
	}


	// Parse direct messages received by the client and funnel them
	// to the appropriate command.
	onMessageReceived(msg: Message) {
		if (msg.author.username == 'WarMECH') return;

		let args = msg.content.substring(1).split(' ');
		let cmd = args[0];

		args = args.splice(1);

		switch(cmd) {
		case 'usage':
		case 'h':
		case 'help':
			this.SendHelp(msg, args)
			break;

		case 'races':
			races.list(msg);

		case 'sub':
		case 'subscribe':
			subscriptions.register(msg.author, msg);
			break;

		case 'unsub':
		case 'unsubscribe':
			subscriptions.withdraw(msg.author, msg);
			break;

		case 'flags':
			let flagset : IFlagset | undefined  = 
				flags.forLabel(args[0]);

			if (!flagset) {
				this.SendHelp(msg, ['flags']);
				return;
			}

			msg.reply(`\`\`\`
${flagset.name} - ${flagset.flags}
Party: ${flagset.party} 

${flagset.goal} 
\`\`\``);
		}
	}


	//
	// RaceBot Commands
	//
	private SendHelp(os: IStream, args: string[]) {
		if (args.length == 0) {
			os.reply(help.GeneralUsage);
			return;
		}

		switch(args[0]) {
		case 'sub':
		case 'subscribe':
			os.reply(help.Subscribe);
			break;

		case 'unsub':
		case 'unsubscribe':
			os.reply(help.Unsubscribe);
			break;

		case 'flags':
			os.reply(help.Flags);
			break;

		default:
			os.reply(help.GeneralUsage);
		}
	}


	private postToChannel(channelId: string, msg: string) {
		const channel = this.client.channels.get(channelId) as TextChannel;

		if (!channel) {
			console.log(`Channel not found: ${channelId}`)
			return;
		}

		channel.send(msg);
	}
}
