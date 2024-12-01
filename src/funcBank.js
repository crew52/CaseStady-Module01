// Khởi tạo dữ liệu mẫu
const bank = new Bank();
// Khởi tạo danh sách giao dịch
//
let cus1 = new Customer("1", "MCK");
let cus2 = new Customer("2", "Son Tung MTP");
bank.addCustomer(cus1);
bank.addCustomer(cus2);

// let rew1 = new Account("111111111", "rew1", AccountType.SAVINGS);
let rew2 = new Account("22", "rew2", AccountType.CHECKING);
//
// let son1 = new Account("333333333", "rew52", AccountType.SAVINGS);
let son2 = new Account("44", "son", AccountType.CHECKING);
//
// cus1.addAccount(rew1);
cus1.setAccount(rew2);
// cus2.addAccount(son1);
cus2.setAccount(son2);

rew2.deposit(200000);
son2.deposit(100000);

showCustomers();

function showErrorMessage(message) {
    const messageDiv = document.getElementById("message");
    messageDiv.textContent = message;
    messageDiv.style.display = "block"; // Hiển thị thông báo lỗi
}

// show customer form
function showCustomerForm() {
    const form = document.getElementById('customer-form');
    // Kiểm tra trạng thái hiển thị hiện tại của form
    if (form.style.display === 'none' || form.style.display === '') {
        form.style.display = 'block'; // Hiển thị form
    } else {
        form.style.display = 'none'; // Ẩn form
    }
}

// display danh sach customer
function showCustomers() {
    const customerList = document.getElementById('customer-list');
    customerList.innerHTML = "";
    bank._customers.forEach(customer => {
        const listItem = document.createElement('li');
        listItem.textContent = `${customer._customerName} (ID: ${customer._customerId})`;
        listItem.onclick = () => showAccounts(customer._customerId);
        customerList.appendChild(listItem);
    })
}

// Thêm khách hàng mới
function addCustomer() {
    const customerName = document.getElementById("customer-name").value;
    const customerId = Bank.generateCustomerId();
    const newCustomer = new Customer(customerId, customerName);
    bank.addCustomer(newCustomer);
    document.getElementById("customer-name").value = ""; // Xóa nội dung ô nhập
    showCustomers();
    updateCustomerDropdown();
}

// Cập nhật danh sách khách hàng vào dropdown
function updateCustomerDropdown() {
    const customerDropdown = document.getElementById('account-customer');
    customerDropdown.innerHTML = ""; // Xóa danh sách cũ

    bank._customers.forEach(customer => {
        const option = document.createElement('option');
        option.value = customer._customerId;
        option.textContent = `${customer._customerName} (ID: ${customer._customerId})`;
        customerDropdown.appendChild(option);
    });

    // Thêm sự kiện onchange vào dropdown khách hàng
    customerDropdown.onchange = function () {
        const selectedCustomerId = customerDropdown.value;
        showAccounts(selectedCustomerId); // Cập nhật thông tin tài khoản khi chọn khách hàng khác
    };
}

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
            listItem.textContent = `${account._accountType}: ${account._balance} VND`;
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

// Chuyển tiền giữa hai tài khoản
function transferMoney() {
    const fromAccount = document.getElementById("from-account").value;
    const toAccount = document.getElementById("to-account").value;
    const amount = parseFloat(document.getElementById("transaction-amount").value);
    const messageElement = document.getElementById("transaction-message"); // Get message element

    // Kiểm tra các giá trị đầu vào hợp lệ
    if (fromAccount && toAccount && amount > 0) {
        // Gọi phương thức transfer từ bank để thực hiện chuyển tiền
        const transferSuccess = bank.transferMoney(fromAccount, toAccount, amount);

        // Nếu chuyển tiền thành công
        if (transferSuccess) {
            messageElement.textContent = `Chuyển tiền thành công từ tài khoản ${fromAccount} đến tài khoản ${toAccount}. Số tiền: ${amount} VND.`;
            messageElement.style.color = "green"; // Hiển thị màu xanh cho thông báo thành công
            showTransactions();  // Hiển thị lại danh sách giao dịch

            // Xóa hết dữ liệu trong các ô input sau khi giao dịch thành công
            document.getElementById("from-account").value = "";
            document.getElementById("to-account").value = "";
            document.getElementById("transaction-amount").value = "";
        } else {
            // Nếu chuyển tiền thất bại (ví dụ: số dư không đủ hoặc lỗi khác)
            messageElement.textContent = "Giao dịch không thành công. Vui lòng kiểm tra lại thông tin!";
            messageElement.style.color = "red"; // Hiển thị màu đỏ cho thông báo lỗi
        }
    } else {
        // Nếu thiếu thông tin nhập
        messageElement.textContent = "Vui lòng nhập đầy đủ thông tin hợp lệ!";
        messageElement.style.color = "red"; // Màu đỏ cho thông báo lỗi
    }
}

// Hiển thị lịch sử giao dịch
function showTransactions() {
    const transactionList = document.getElementById("transaction-list");
    transactionList.innerHTML = ""; // Xóa danh sách cũ

    // Duyệt qua các giao dịch và hiển thị
    bank._transactions.forEach(transaction => {
        const listItem = document.createElement("li");
        const transactionData = transaction.display();  // Lấy thông tin giao dịch

        // Kiểm tra xem thông tin giao dịch có đầy đủ không
        if (transactionData && transactionData.transactionId) {
            // Chỉ hiển thị ID giao dịch
            const transactionIdElement = document.createElement("span");
            transactionIdElement.textContent = `Mã giao dịch: ${transactionData.transactionId}`;
            transactionIdElement.style.cursor = "pointer"; // Thêm con trỏ chuột khi hover
            listItem.appendChild(transactionIdElement);

            // Tạo một div để chứa chi tiết giao dịch (ẩn ban đầu)
            const detailElement = document.createElement("div");
            detailElement.style.display = "none"; // Ẩn chi tiết ban đầu
            detailElement.innerHTML = `
                <strong>ID giao dịch:</strong> ${transactionData.transactionId}<br>
                <strong>Loại giao dịch:</strong> ${transactionData.type}<br>
                <strong>Người gửi:</strong> ${transactionData.fromAccount}<br>
                <strong>Người nhận:</strong> ${transactionData.toAccount}<br>
                <strong>Số tiền:</strong> ${transactionData.amount} VND<br>
                <strong>Thời gian:</strong> ${transactionData.timestamp}
            `;
            listItem.appendChild(detailElement);

            // Thêm sự kiện click để hiển thị hoặc ẩn chi tiết
            transactionIdElement.addEventListener("click", function () {
                // Kiểm tra nếu chi tiết đang ẩn hoặc hiển thị
                if (detailElement.style.display === "none") {
                    detailElement.style.display = "block"; // Hiển thị chi tiết
                } else {
                    detailElement.style.display = "none"; // Ẩn chi tiết
                }
            });
        } else {
            listItem.textContent = "Thông tin giao dịch không đầy đủ.";
        }

        transactionList.appendChild(listItem);
    });
}










