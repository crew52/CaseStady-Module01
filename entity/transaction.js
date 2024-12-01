class Transaction {
    _transactionId;
    _type;
    _amount;
    _timestamp;
    _fromAccount;
    _toAccount;

    // Constructor để khởi tạo giao dịch
    constructor(transactionId, type, amount, fromAccount, toAccount = null) {
        this._transactionId = transactionId;
        this._type = type;
        this._amount = amount;
        this._timestamp = new Date().toLocaleString(); // Thời gian giao dịch
        this._fromAccount = fromAccount;
        this._toAccount = toAccount;
    }

    getTransactionId() {
        return this._transactionId;
    }

    setTransactionId(value) {
        this._transactionId = value;
    }

    getType() {
        return this._type;
    }

    setType(value) {
        this._type = value;
    }

    getAmount() {
        return this._amount;
    }

    setAmount(value) {
        this._amount = value;
    }

    getTimestamp() {
        return this._timestamp;
    }

    setTimestamp(value) {
        this._timestamp = value;
    }

    getFromAccount() {
        return this._fromAccount;
    }

    setFromAccount(value) {
        this._fromAccount = value;
    }

    getToAccount() {
        return this._toAccount;
    }

    setToAccount(value) {
        this._toAccount = value;
    }

    record() {
        console.log(`Transaction Recorded: 
            ID: ${this._transactionId}, 
            Type: ${this._type}, 
            Amount: ${this._amount}, 
            Timestamp: ${this._timestamp},
            From Account: ${this._fromAccount}
            To Account: ${this._toAccount ? this._toAccount : "N/A"}`);
    }

    display() {
        return {
            transactionId: this._transactionId,
            type: this._type,
            amount: this._amount,
            timestamp: this._timestamp,
            fromAccount: this._fromAccount,
            toAccount: this._toAccount,
        };
    }
}