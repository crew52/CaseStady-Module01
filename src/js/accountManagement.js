// Hiển thị tài khoản của khách hàng
function showAccounts(customerId) {
    console.log("Customer ID clicked: ", customerId); // Debugging

    // Ẩn thông báo lỗi nếu có
    const messageDiv = document.getElementById("message");
    if (messageDiv) {
        messageDiv.style.display = "none"; // Ẩn thông báo lỗi
    }

    // Tìm khách hàng theo ID
    const customer = bank.findCustomerById(customerId);
    if (!customer) {
        console.log(`Customer with ID ${customerId} not found.`);
        if (messageDiv) {
            messageDiv.style.display = "block";
            messageDiv.textContent = "Customer not found.";
        }
        return;
    }

    // Lấy tài khoản của khách hàng (customer._account)
    const account = customer._account;
    const accountList = document.getElementById("account-list");

    // Kiểm tra nếu khách hàng không có tài khoản
    if (!account || account.length === 0) {
        console.log(`Customer with ID ${customerId} does not have an account.`);
        if (accountList) {
            accountList.innerHTML = ""; // Xóa danh sách tài khoản cũ
            const noAccountItem = document.createElement("li");
            noAccountItem.textContent = "No account found for this customer.";
            accountList.appendChild(noAccountItem);
        }
        if (messageDiv) {
            messageDiv.style.display = "block";
            messageDiv.textContent = "No account found for this customer.";
        }

        // Hiển thị nút thêm tài khoản nếu không có tài khoản
        const addAccountButton = document.querySelector("#account-actions button");
        if (addAccountButton) {
            addAccountButton.style.display = "block"; // Hiển thị nút thêm tài khoản
        }
    } else {
        // Nếu khách hàng có tài khoản, hiển thị thông tin tài khoản
        if (accountList) {
            accountList.innerHTML = ""; // Xóa danh sách cũ
            const listItem = document.createElement("li");
            listItem.textContent = `ID: ${account._accountNumber} || ${account._accountType}: ${account._balance} VND`;
            accountList.appendChild(listItem);
        }

        // Ẩn nút thêm tài khoản nếu khách hàng đã có tài khoản
        const addAccountButton = document.querySelector("#account-actions button");
        if (addAccountButton) {
            addAccountButton.style.display = "none"; // Ẩn nút thêm tài khoản
        }
    }

    // Hiển thị khu vực thao tác với tài khoản
    const accountActions = document.getElementById("account-actions");
    if (accountActions) {
        accountActions.style.display = "block";
        document.getElementById("account-customer").value = customerId;
    }
}

function showAccountForm() {
    const form = document.getElementById('account-form');
    // Kiểm tra trạng thái hiển thị hiện tại của form
    if (form.style.display === 'none' || form.style.display === '') {
        form.style.display = 'block'; // Hiển thị form
    } else {
        form.style.display = 'none'; // Ẩn form
    }
}

// Thêm tài khoản cho khách hàng
function addAccount() {
    const customerId = document.getElementById("account-customer").value;
    const accountType = document.getElementById("account-type").value.toUpperCase(); // Kiểm tra loại tài khoản
    const customer = bank.findCustomerById(customerId);
    if (customer) {
        if (customer._account != null) {
            showErrorMessage(`Khách hàng ${customer._customerName} không thể mở thêm tài khoản.`);
            return;
        }
        const accountNumber = Account.generateAccountId();
        const newAccount = new Account(accountNumber, customerId, accountType);
        customer.setAccount(newAccount); // Thêm tài khoản mới vào khách hàng
        document.getElementById("account-type").value = ""; // Xóa nội dung ô nhập

        // Ẩn form thêm tài khoản sau khi thêm thành công
        const form = document.getElementById('account-form');
        if (form) {
            form.style.display = 'none'; // Ẩn form
        }

        // Hiển thị lại danh sách tài khoản của khách hàng
        showAccounts(customerId);
    } else {
        console.error("Customer not found");
    }
}