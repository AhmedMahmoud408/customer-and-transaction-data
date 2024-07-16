const express = require('express');
const cors = require('cors'); // إضافة حزمة cors
const app = express();
const port = 3000;

// استخدام cors middleware
app.use(cors());

// Middleware لتحليل JSON
app.use(express.json());

// البيانات الثابتة
const data = {
  customers: [
    { id: 1, name: "Ahmed Ali" },
    { id: 2, name: "Aya Elsayed" },
    { id: 3, name: "Mina Adel" },
    { id: 4, name: "Sarah Reda" },
    { id: 5, name: "Mohamed Sayed" }
  ],
  transactions: [
    { id: 1, customer_id: 1, date: "2022-01-01", amount: 1000 },
    { id: 2, customer_id: 1, date: "2022-01-02", amount: 2000 },
    { id: 3, customer_id: 2, date: "2022-01-01", amount: 550 },
    { id: 4, customer_id: 3, date: "2022-01-01", amount: 500 },
    { id: 5, customer_id: 2, date: "2022-01-02", amount: 1300 },
    { id: 6, customer_id: 4, date: "2022-01-01", amount: 750 },
    { id: 7, customer_id: 3, date: "2022-01-02", amount: 1250 },
    { id: 8, customer_id: 5, date: "2022-01-01", amount: 2500 },
    { id: 9, customer_id: 5, date: "2022-01-02", amount: 875 }
  ]
};

// مسار GET لعرض كل العملاء
app.get('/customers', (req, res) => {
  res.json(data.customers);
});

// مسار GET لعرض عميل محدد بواسطة ID
app.get('/customers/:id', (req, res) => {
  const customer = data.customers.find(c => c.id == req.params.id);
  if (customer) {
    res.json(customer);
  } else {
    res.status(404).json({ message: 'Customer not found' });
  }
});

// مسار GET لعرض كل المعاملات
app.get('/transactions', (req, res) => {
  res.json(data.transactions);
});

// مسار GET لعرض معاملات عميل محدد بواسطة customer_id
app.get('/transactions/customer/:customer_id', (req, res) => {
  const transactions = data.transactions.filter(t => t.customer_id == req.params.customer_id);
  if (transactions.length > 0) {
    res.json(transactions);
  } else {
    res.status(404).json({ message: 'Transactions not found for this customer' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
