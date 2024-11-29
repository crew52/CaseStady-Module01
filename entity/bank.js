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

    // Liệt kê tất cả giao dịch của khách hàng
    listTransactions(accountNumber) {
        const transactions = this._transactions.filter(t => t.accountNumber === accountNumber);
        console.log(`Transactions for account ${accountNumber}:`);
        transactions.forEach(transaction => {
            console.log(`${transaction.type} of ${transaction.amount} at ${transaction.date}`);
        });
    }


}