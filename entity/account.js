class Account {
    _accountNumber;
    _accountHolder;
    _balance;
    _accountType;
    static _transactionCounter = { deposit: 0, withdraw: 0 };

    constructor(accountNumber, accountHolder, accountType) {
        this._accountNumber = accountNumber; // stk
        this._accountHolder = accountHolder; // chu tk
        this._balance = 0; // so du
        this._accountType = accountType;
    }

    getAccountNumber() {
        return this._accountNumber;
    }

    setAccountNumber(value) {
        this._accountNumber = value;
    }

    getAccountHolder() {
        return this._accountHolder;
    }

    setAccountHolder(value) {
        this._accountHolder = value;
    }

    getBalance() {
        return this._balance;
    }

    setBalance(value) {
        this._balance = value;
    }

    getAccountType() {
        return this._accountType;
    }

    setAccountType(value) {
        this._accountType = value;
    }

    // GUI TIEN VAO TK
    deposit(amount) {
        if (amount > 0) {
            this._balance += amount; // Cập nhật số dư sau khi nạp tiền

            // Tạo mã giao dịch cho gửi tiền
            const transactionId = `D${String(++Account._transactionCounter.deposit).padStart(3, '0')}`;

            // Tạo và ghi lại giao dịch
            const depositTransaction = new Transaction(transactionId, TypeTransaction.DEPOSIT, amount, this._accountNumber);
            depositTransaction.record();

            console.log(`Đã gửi ${amount}. Số dư tài khoản hiện tại: ${this._balance}`);
        } else {
            console.log("Số tiền không phù hợp");
        }
    }

    // RUT TIEN TU TK
    withdraw(amount) {
        if (amount > this._balance) {
            console.log("Số dư không đủ");
        } else if (amount <= 0) {
            console.log("Số tiền không phù hợp");
        } else {
            this._balance -= amount; // Cập nhật số dư sau khi rút tiền

            // Tạo mã giao dịch cho rút tiền
            const transactionId = `W${String(++Account._transactionCounter.withdraw).padStart(3, '0')}`;

            // Tạo và ghi lại giao dịch
            const withdrawTransaction = new Transaction(transactionId, TypeTransaction.WITHDRAW, amount, this._accountNumber);
            withdrawTransaction.record();

            console.log(`Đã rút ${amount}, số dư còn lại: ${this._balance}`);
        }
    }
}