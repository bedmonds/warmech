export interface IFlagset {
	name: string;
	flags: string;
	goal: string;
	party: string;
}

const map : { [Key: string]: IFlagset } = {
	'league-1': { 
		name: 'Low Boost!', 
		flags: 'r%%%AwoWWAA',
		goal: 'Defeat CHAOS',
		party: 'Four Random' 
	},
	'league-2': {
		name: 'LICH Strikes Back',
		flags: 'p!7%AweeoKA',
		goal: 'Defeat LICH in the Earth Cave',
		party: 'Four White Mages'
	},
	'league-3': {
		name: 'Pretty Pretty BB',
		flags: 'uf%%AwyoWAA',
		goal: `Without having class changed, a Black Belt must hold \
one of each bracelet in his inventory.`,
		party: 'At least one Black Belt'
	},
	'league-4': {
		name: 'Alignment: Chaotic',
		flags: 'qf%%AwoWoAA',
		goal: 'Defeat Chaos',
		party: 'One Thief, Three Black Mages'
	},
	'league-5': {
		name: 'Alignment: Neutral',
		flags: 'qf%%AwoWoAA',
		goal: 'Defeat Chaos',
		party: 'Three Black Belts, One Red Mage'
	},
	'league-6': {
		name: 'Alignment: Lawful', 
		flags: 'qf%%AwoWoAA',
		goal: 'Defeat Chaos',
		party: 'Three White Mages, One Fighter'
	},
	'league-7': {
		name: 'The Useful Thief',
		flags: 'uf%%AwooWAA',
		goal: `Without having class changed, a Thief must hold \
either four spell-casting weapons or four spell-casting pieces of armour. \
Duplicates are accepted.`,
		party: 'At least one Thief'
	},
	'league-8': {
		name: 'Show Some Class',
		flags: 'r3%%AwoWWAA',
		goal: 'After having class changed, defeat Chaos.',
		party: 'Any'
	}
};

export function forLabel(label: string) : IFlagset | undefined {
	return map[label];
}
