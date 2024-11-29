class Bank {
    _customers;
    _transactions;


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

    // Thực hiện giao dịch cho khách hàng
    performTransaction(accountNumber, type, amount) {
        const customer = this._customers.find(c => c.getAccounts() && c.getAccounts().getAccountNumber() === accountNumber);

        if (!customer) {
            console.log(`Customer with account ${accountNumber} not found.`);
            return;
        }

        const account = customer.getAccounts();
        if (type === TypeTransaction.DEPOSIT) {
            account.deposit(amount);
            this._transactions.push({
                accountNumber,
                type: TypeTransaction.DEPOSIT,
                amount,
                date: new Date()
            });
        } else if (type === TypeTransaction.WITHDRAW) {
            account.withdraw(amount);
            this._transactions.push({
                accountNumber,
                type: TypeTransaction.WITHDRAW,
                amount,
                date: new Date()
            });
        } else {
            console.log("Invalid transaction type.");
        }
    }

    // Chuyển tiền giữa hai tài khoản
    transferMoney(fromAccountNumber, toAccountNumber, amount) {
        const fromCustomer = this._customers.find(c => c.getAccounts() && c.getAccounts().getAccountNumber() === fromAccountNumber);
        const toCustomer = this._customers.find(c => c.getAccounts() && c.getAccounts().getAccountNumber() === toAccountNumber);

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
        fromAccount.withdraw(amount); // Rút tiền từ tài khoản nguồn
        toAccount.deposit(amount); // Nạp tiền vào tài khoản đích

        // Ghi lại giao dịch chuyển tiền
        this._transactions.push({
            fromAccountNumber,
            toAccountNumber,
            type: "Transfer",
            amount,
            date: new Date()
        });

        console.log(`Đã chuyển ${amount} từ tài khoản ${fromAccountNumber} sang tài khoản ${toAccountNumber}`);
    }

    // Liệt kê tất cả giao dịch của khách hàng
    listTransactions(accountNumber) {
        const transactions = this._transactions.filter(t => t.accountNumber === accountNumber);
        console.log(`Transactions for account ${accountNumber}:`);
        transactions.forEach(transaction => {
            console.log(`${transaction.type} of ${transaction.amount} at ${transaction.date}`);
        });
    }


}