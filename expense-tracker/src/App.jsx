import { useState } from "react";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);

  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "Food",
  });

  const addTransaction = (e) => {
    e.preventDefault();

    if (!form.title || !form.amount) {
      alert("Please fill all fields");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      title: form.title,
      amount: Number(form.amount),
      type: form.type,
      category: form.category,
    };

    setTransactions([newTransaction, ...transactions]);

    setForm({
      title: "",
      amount: "",
      type: "expense",
      category: "Food",
    });
  };

  const deleteTransaction = (id) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };

  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const balance = income - expenses;

  return (
    <div className="app">
      <header>
        <h1>Expense Tracker</h1>
        
      </header>

      <main>
        <div className="summary">
          <div className="card balance">
            <span>Balance</span>
            <h2>Rs. {balance.toLocaleString()}</h2>
          </div>

          <div className="card income">
            <span>Income</span>
            <h2>Rs. {income.toLocaleString()}</h2>
          </div>

          <div className="card expense">
            <span>Expenses</span>
            <h2>Rs. {expenses.toLocaleString()}</h2>
          </div>
        </div>

        <div className="content">
          <div className="panel">
            <h2>Add Transaction</h2>

            <form onSubmit={addTransaction}>
              <label>Title</label>

              <input
                type="text"
                placeholder="e.g. Grocery"
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
              />

              <label>Amount</label>

              <input
                type="number"
                placeholder="Enter amount"
                value={form.amount}
                onChange={(e) =>
                  setForm({
                    ...form,
                    amount: e.target.value,
                  })
                }
              />

              <label>Type</label>

              <select
                value={form.type}
                onChange={(e) =>
                  setForm({
                    ...form,
                    type: e.target.value,
                  })
                }
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>

              <label>Category</label>

              <select
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category: e.target.value,
                  })
                }
              >
                <option>Food</option>
                <option>Bills</option>
                <option>Transport</option>
                <option>Shopping</option>
                <option>Entertainment</option>
                <option>Salary</option>
                <option>Other</option>
              </select>

              <button type="submit">
                Add Transaction
              </button>
            </form>
          </div>

          <div className="panel">
            <h2>Transactions</h2>

            {transactions.length === 0 ? (
              <p className="empty">
                No transactions yet.
              </p>
            ) : (
              transactions.map((transaction) => (
                <div
                  className="transaction"
                  key={transaction.id}
                >
                  <div>
                    <h3>{transaction.title}</h3>
                    <p>{transaction.category}</p>
                  </div>

                  <div>
                    <strong
                      className={
                        transaction.type === "income"
                          ? "positive"
                          : "negative"
                      }
                    >
                      {transaction.type === "income"
                        ? "+"
                        : "-"}{" "}
                      Rs. {transaction.amount.toLocaleString()}
                    </strong>

                    <button
                      className="delete"
                      onClick={() =>
                        deleteTransaction(transaction.id)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;