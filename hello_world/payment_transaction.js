const {
	TransferTransaction
} = require('@liskhq/lisk-transactions');


class PaymentTransaction extends TransferTransaction {

	static get TYPE () {
		return 21;
	};

	static get FEE () {
		return `${0}`;
		// return `${10 ** 2}`;
	};

	async prepare(store) {
		await super.prepare(store);
	}

	applyAsset(store) {
		const errors = [];
		const sender = store.account.get(this.senderId);
		let a = this.asset.amount;
		let r = this.asset.recipientId;
		let d = this.asset.data;

		const newObj = {sender, asset: {
				amount: a,
				recipientId: r,
				data: 'testdata123testtest'
			} };
		store.account.set(sender.address, newObj);
		console.log(newObj);
		return errors;
	}

	undoAsset(store) {
		// const errors = super.undoAsset(store);
		const sender = store.account.get(this.senderId);
		const oldObj = { ...sender, asset: null };
		store.account.set(sender.address, oldObj);
		return [];
	}
}

module.exports = PaymentTransaction;
