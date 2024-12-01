
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