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