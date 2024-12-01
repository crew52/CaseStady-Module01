function getAccountByNumber(accountNumber) {
    const messageElement = document.getElementById("dw-message");

    // Kiểm tra số tài khoản hợp lệ
    if (!accountNumber) {
        messageElement.textContent = "Vui lòng nhập số tài khoản.";
        messageElement.style.color = "red";
        messageElement.style.display = "block";
        return null;
    }

    // Tìm khách hàng dựa trên số tài khoản
    const customer = bank.findCustomerByAccountNumber(accountNumber);
    if (!customer) {
        messageElement.textContent = "Không tìm thấy tài khoản.";
        messageElement.style.color = "red";
        messageElement.style.display = "block";
        return null;
    }

    // Lấy tài khoản từ khách hàng
    const account = customer.getAccounts(); // Giả sử getAccounts trả về tài khoản của khách hàng
    if (!account) {
        messageElement.textContent = "Không có tài khoản nào cho khách hàng này.";
        messageElement.style.color = "red";
        messageElement.style.display = "block";
        return null;
    }

    return account;
}


function handleDeposit() {
    let accountNumber = document.getElementById("dw-account").value;
    let amount = parseFloat(document.getElementById("dw-amount").value);
    let messageElement = document.getElementById("dw-message");

    // Kiểm tra số tiền hợp lệ
    if (amount <= 0) {
        messageElement.textContent = "Vui lòng nhập số tiền hợp lệ.";
        messageElement.style.color = "red";
        messageElement.style.display = "block";
        return;
    }

    // Lấy tài khoản từ số tài khoản
    const account = getAccountByNumber(accountNumber);
    if (!account) return;

    // Thực hiện nạp tiền
    account.deposit(amount);

    messageElement.textContent = `Nạp tiền thành công. Số dư mới: ${account._balance} VND.`;
    messageElement.style.color = "green";
    messageElement.style.display = "block";

    // Cập nhật danh sách giao dịch
    updateDWTransactionList(accountNumber);

    // Xóa dữ liệu nhập
    document.getElementById("dw-account").value = "";
    document.getElementById("dw-amount").value = "";
}

function handleWithdraw() {
    const accountNumber = document.getElementById("dw-account").value;
    const amount = parseFloat(document.getElementById("dw-amount").value);
    const messageElement = document.getElementById("dw-message");

    // Kiểm tra số tiền hợp lệ
    if (amount <= 0) {
        messageElement.textContent = "Vui lòng nhập số tiền hợp lệ.";
        messageElement.style.color = "red";
        messageElement.style.display = "block";
        return;
    }

    // Lấy tài khoản từ số tài khoản
    const account = getAccountByNumber(accountNumber);
    if (!account) return;

    // Kiểm tra số dư tài khoản trước khi rút
    if (account._balance < amount) {
        messageElement.textContent = "Số dư tài khoản không đủ để thực hiện giao dịch.";
        messageElement.style.color = "red";
        messageElement.style.display = "block";
        return;
    }

    // Thực hiện rút tiền
    account.withdraw(amount);

    messageElement.textContent = `Rút tiền thành công. Số dư mới: ${account._balance} VND.`;
    messageElement.style.color = "green";
    messageElement.style.display = "block";

    // Cập nhật danh sách giao dịch
    updateDWTransactionList(accountNumber);

    // Xóa dữ liệu nhập
    document.getElementById("dw-account").value = "";
    document.getElementById("dw-amount").value = "";
}



function updateDWTransactionList(accountNumber) {
    const dwTransactionList = document.getElementById("dw-transaction-list");
    dwTransactionList.innerHTML = "";

    // Tìm khách hàng dựa trên số tài khoản
    const customer = bank.findCustomerByAccountNumber(accountNumber);
    if (!customer) {
        const noTransactionItem = document.createElement("li");
        noTransactionItem.textContent = "Không tìm thấy tài khoản.";
        dwTransactionList.appendChild(noTransactionItem);
        return;
    }

    // Lấy tài khoản từ khách hàng
    const account = customer.getAccounts();
    if (!account) {
        const noTransactionItem = document.createElement("li");
        noTransactionItem.textContent = "Không tìm thấy tài khoản.";
        dwTransactionList.appendChild(noTransactionItem);
        return;
    }

    // Lấy danh sách giao dịch từ tài khoản
    const transactions = account.getTransactionIds().map(transactionId =>
        bank.getTransactions().find(t => t.getTransactionId() === transactionId)
    );

    if (transactions.length === 0) {
        const noTransactionItem = document.createElement("li");
        noTransactionItem.textContent = "Không có giao dịch nào.";
        dwTransactionList.appendChild(noTransactionItem);
        return;
    }

    // Hiển thị danh sách giao dịch
    transactions.forEach(transaction => {
        if (transaction) {
            const li = document.createElement("li");
            li.textContent = `ID: ${transaction.getTransactionId()} | Loại: ${transaction.getType()} | Số tiền: ${transaction.getAmount()} | Thời gian: ${transaction.getTimestamp()}`;
            dwTransactionList.appendChild(li);
        }
    });
}


