class Bank {
    _customers;
    _transactions;
    static _customerCounter = 0; // Bộ đếm khách hàng


    constructor() {
        this._customers = [];
        this._transactions = [];
    }

    getCustomers() {
        return this._customers;
    }

    setCustomers(value) {
        this._customers = value;
    }

    getTransactions() {
        return this._transactions;
    }

    setTransactions(value) {
        this._transactions = value;
    }

    // Tạo ID khách hàng mới
    static generateCustomerId() {
        this._customerCounter += 1;
        return `C${String(this._customerCounter).padStart(3, "0")}`; // Định dạng C001, C002...
    }

    // Lưu giao dịch vào ngân hàng
    addTransaction(transaction) {
        this._transactions.push(transaction);
    }

    // Thêm khách hàng vào ngân hàng
    addCustomer(customer) {
        if (customer instanceof Customer) {
            this._customers.push(customer);
            console.log(`Customer added: ${customer.getCustomerName()}`);
        } else {
            console.log("Invalid customer object.");
        }
    }

    // Tìm kiếm khách hàng theo ID
    findCustomerById(customerId) {
        return this._customers.find(customer => customer.getCustomerId() === customerId);
    }

    // Tìm khách hàng dựa trên số tài khoản
    findCustomerByAccountNumber(accountNumber) {
        return this._customers.find(
            customer => customer.getAccounts() && customer.getAccounts().getAccountNumber() === accountNumber
        );
    }

    // Chuyển tiền giữa hai tài khoản
    transferMoney(fromAccountNumber, toAccountNumber, amount) {
        const fromCustomer = this.findCustomerByAccountNumber(fromAccountNumber);
        const toCustomer = this.findCustomerByAccountNumber(toAccountNumber);

        // Kiểm tra xem cả hai khách hàng có tồn tại không
        if (!fromCustomer || !toCustomer) {
            console.log("Một trong các tài khoản không tồn tại.");
            return;
        }

        const fromAccount = fromCustomer.getAccounts();
        const toAccount = toCustomer.getAccounts();

        // Kiểm tra số dư tài khoản nguồn
        if (fromAccount.getBalance() < amount) {
            console.log("Số dư tài khoản nguồn không đủ để thực hiện giao dịch.");
            return;
        }

        // Thực hiện giao dịch chuyển tiền
        fromAccount.withdraw(amount, true); // Rút tiền từ tài khoản nguồn
        toAccount.deposit(amount, true); // Nạp tiền vào tài khoản đích


        // Tạo mã giao dịch duy nhất cho chuyển tiền
        const transactionId = `T${this._transactions.length + 1}`; // Mã giao dịch như T1, T2, T3...

        // Tạo đối tượng Transaction
        const transaction = new Transaction(transactionId, TypeTransaction.TRANSFER, amount, fromAccountNumber, toAccountNumber);

        // Ghi lại giao dịch
        this.addTransaction(transaction);
        fromAccount.addTransactionId(transactionId);
        toAccount.addTransactionId(transactionId);
        transaction.record();

        console.log(`Đã chuyển ${amount} từ tài khoản ${fromAccountNumber} sang tài khoản ${toAccountNumber}`);
        return true;
    }

    // Truy xuất giao dịch
    listTransactions(accountNumber) {
        const customer = this._customers.find(c => c.getAccounts() && c.getAccounts().getAccountNumber() === accountNumber);

        if (!customer) {
            console.log(`Account ${accountNumber} not found.`);
            return;
        }

        const account = customer.getAccounts();
        console.log(`Transactions for account ${accountNumber}:`);
        account.getTransactionIds().forEach(transactionId => {
            const transaction = this._transactions.find(t => t.getTransactionId() === transactionId);
            if (transaction) {
                transaction.record();
            }
        });
    }

    // Xem toàn bộ giao dịch của ngân hàng
    listAllTransactions() {
        console.log("All Transactions in Bank:");
        this._transactions.forEach(transaction => transaction.record());
    }


}