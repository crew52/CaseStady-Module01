class Account {
    _accountNumber;
    _accountHolder;
    _balance;
    _accountType;
    _transactionIds;
    static _transactionCounter = {deposit: 0, withdraw: 0};
    static _accountCounter = 0; // Bộ đếm khách hàng

    constructor(accountNumber, accountHolder, accountType) {
        this._accountNumber = accountNumber; // stk
        this._accountHolder = accountHolder; // chu tk
        this._balance = 0; // so du
        this._accountType = accountType;
        this._transactionIds = []; // Khởi tạo danh sách giao dịch
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


    getTransactionIds() {
        return this._transactionIds;
    }

    setTransactionIds(value) {
        this._transactionIds = value;
    }

    // Tạo ID khách hàng mới
    static generateAccountId() {
        this._accountCounter += 1;
        return `AC${String(this._accountCounter).padStart(3, "0")}`;
    }

// Thêm ID giao dịch vào danh sách
    addTransactionId(transactionId) {
        this._transactionIds.push(transactionId);
    }

    // GUI TIEN VAO TK
    deposit(amount, isTransfer = false) {
        if (amount > 0) {
            this._balance += amount; // Cập nhật số dư sau khi nạp tiền

            if (!isTransfer) {
                // Tạo mã giao dịch cho gửi tiền
                const transactionId = `D${String(++Account._transactionCounter.deposit).padStart(3, '0')}`;

                // Tạo và ghi lại giao dịch
                const depositTransaction = new Transaction(transactionId, TypeTransaction.DEPOSIT, amount, this._accountNumber);
                depositTransaction.record();

                return transactionId; // Trả về ID giao dịch
            }

            console.log(`Đã gửi ${amount}. Số dư tài khoản hiện tại: ${this._balance}`);
        } else {
            console.log("Số tiền không phù hợp");
        }
    }

    // RUT TIEN TU TK
    withdraw(amount, isTransfer = false) {
        if (amount > this._balance) {
            console.log("Số dư không đủ");
        } else if (amount <= 0) {
            console.log("Số tiền không phù hợp");
        } else {
            this._balance -= amount; // Cập nhật số dư sau khi rút tiền

            if (!isTransfer) {
                // Tạo mã giao dịch cho rút tiền
                const transactionId = `W${String(++Account._transactionCounter.withdraw).padStart(3, '0')}`;

                // Tạo và ghi lại giao dịch
                const withdrawTransaction = new Transaction(transactionId, TypeTransaction.WITHDRAW, amount, this._accountNumber);
                withdrawTransaction.record();
                return transactionId; // Trả về ID giao dịch
            }

            console.log(`Đã rút ${amount}, số dư còn lại: ${this._balance}`);
        }
    }
}