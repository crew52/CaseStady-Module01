// Khởi tạo dữ liệu mẫu
const bank = new Bank();
// Khởi tạo danh sách giao dịch
//
let cus1 = new Customer("1","MCK");
let cus2 = new Customer("2","Son Tung MTP");
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

rew2.deposit(100000);
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
        // listItem.onclick = () => showAccounts(customer._customerId);
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
    // updateCustomerDropdown();
}







