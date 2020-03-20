const {
	TransferTransaction
} = require('@liskhq/lisk-transactions');


class PaymentTransaction extends TransferTransaction {

	static get TYPE () {
		return 21;
	};

	static get FEE () {
		return `${10 ** 2}`;
	};

	async prepare(store) {
		await super.prepare(store);
	}

	applyAsset(store) {
		const errors = [];
        const sender = store.account.get(this.senderId);
        const newObj = { ...sender, asset: this.asset };
		store.account.set(sender.address, newObj);
		console.log(this.asset);
		return errors;
	}

	undoAsset(store) {
		const errors = super.undoAsset(store);

		return errors;
	}
}

module.exports = PaymentTransaction;
