import eventBus from '#app/core/eventbus.js';

const bets = [];

export function getBets() {
	return bets;
}

export function addBet(bet) {
	bets.push(bet);
	eventBus.emit('addBet', bet);
}
