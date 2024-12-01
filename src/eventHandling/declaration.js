// Khởi tạo dữ liệu mẫu
const bank = new Bank();

// Khởi tạo danh sách giao dịch
let cus1 = new Customer("1", "MCK");
let cus2 = new Customer("2", "Son Tung MTP");

// add new Customer
bank.addCustomer(cus1);
bank.addCustomer(cus2);

// create account
let rew2 = new Account("22", "rew2", AccountType.CHECKING);
let son2 = new Account("44", "son", AccountType.CHECKING);

// add account
cus1.setAccount(rew2);
cus2.setAccount(son2);

// nap tien
rew2.deposit(200000);
son2.deposit(100000);

showCustomers();