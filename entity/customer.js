class Customer {
    _customerId;
    _customerName;
    _account;

    constructor(customerId, customerName) {
        this._customerId = customerId;
        this._customerName = customerName;
        this._account = null;
    }

    getCustomerId() {
        return this._customerId;
    }

    setCustomerId(value) {
        this._customerId = value;
    }

    getCustomerName() {
        return this._customerName;
    }

    setCustomerName(value) {
        this._customerName = value;
    }

    getAccounts() {
        return this._account;
    }

    setAccount(account) {
        if (account instanceof Account) {
            if (this._account === null) {
                this._account = account;
                console.log(`Tài khoản ${account.getAccountNumber()} đã được gắn với khách hàng ${this._customerName}`);
            } else {
                console.log(`Khách hàng ${this._customerName} đã sở hữu tài khoản. Không thể gắn thêm.`);
            }
        } else {
            console.log("Đối tượng không phải là tài khoản hợp lệ");
        }
    }
}