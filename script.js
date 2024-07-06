        let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
        let totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

        const categorySelect = document.getElementById('category-select');
        const amountInput = document.getElementById('amount-input');
        const dateInput = document.getElementById('date-input');
        const addBtn = document.getElementById('add-btn');
        const expensesTableBody = document.getElementById('expense-table-body');
        const totalAmountCell = document.getElementById('total-amount');

        const amountFilterInput = document.getElementById('amount-filter');
        const dateFilterInput = document.getElementById('date-filter');
        const filterBtn = document.getElementById('filter-btn');
        const resetFilterBtn = document.getElementById('reset-filter-btn');


        addBtn.addEventListener('click', function() {
            const category = categorySelect.value;
            const amount = Number(amountInput.value);
            const date = dateInput.value;

            if (category === '') {
                alert('Please select a category');
                return;
            }
            if (isNaN(amount) || amount <= 0) {
                alert('Please enter a valid amount');
                return;
            }
            if (date === '') {
                alert('Please select a date');
                return;
            }

            const expense = { category, amount, date };
            expenses.push(expense);
            localStorage.setItem('expenses', JSON.stringify(expenses));

            totalAmount += amount;
            totalAmountCell.textContent = totalAmount;

            const newRow = createExpenseRow(expense);
            expensesTableBody.appendChild(newRow);

            amountInput.value = '';
            dateInput.value = '';
        });

        function createExpenseRow(expense) {
            const newRow = document.createElement('tr');

            const categoryCell = document.createElement('td');
            categoryCell.textContent = expense.category;

            const amountCell = document.createElement('td');
            amountCell.textContent = expense.amount;

            const dateCell = document.createElement('td');
            dateCell.textContent = expense.date;

            const editCell = document.createElement('td');
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.classList.add('edit-btn');
            editBtn.addEventListener('click', function() {
                editExpense(expense, newRow);
            });
            editCell.appendChild(editBtn);

            const deleteCell = document.createElement('td');
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', function() {
                deleteExpense(expense, newRow);
            });
            deleteCell.appendChild(deleteBtn);

            newRow.appendChild(categoryCell);
            newRow.appendChild(amountCell);
            newRow.appendChild(dateCell);
            newRow.appendChild(editCell);
            newRow.appendChild(deleteCell);

            return newRow;
        }

        function deleteExpense(expense, row) {
            const index = expenses.indexOf(expense);
            expenses.splice(index, 1);
            localStorage.setItem('expenses', JSON.stringify(expenses));

            totalAmount -= expense.amount;
            totalAmountCell.textContent = totalAmount;

            expensesTableBody.removeChild(row);
        }

        function editExpense(expense, row) {
            categorySelect.value = expense.category;
            amountInput.value = expense.amount;
            dateInput.value = expense.date;

            deleteExpense(expense, row);
        }

        expenses.forEach(expense => {
            const newRow = createExpenseRow(expense);
            expensesTableBody.appendChild(newRow);
        });

totalAmountCell.textContent = totalAmount;
        
filterBtn.addEventListener('click', function() {
    const amountFilter = parseFloat(amountFilterInput.value);
    const dateFilter = dateFilterInput.value;

    let filteredExpenses = expenses;

    if (!isNaN(amountFilter) && amountFilter > 0) {
        filteredExpenses = filteredExpenses.filter(expense => expense.amount >= amountFilter);
    }

    if (dateFilter !== '') {
        filteredExpenses = filteredExpenses.filter(expense => expense.date === dateFilter);
    }

    expensesTableBody.innerHTML = '';
    filteredExpenses.forEach(expense => {
        const newRow = createExpenseRow(expense);
        expensesTableBody.appendChild(newRow);
    });

    totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalAmountCell.textContent = totalAmount;
});


filterBtn.addEventListener('click', function() {
    filterExpenses();
});

resetFilterBtn.addEventListener('click', function() {
    amountFilterInput.value = '';
    dateFilterInput.value = '';
    filterExpenses();
});

function filterExpenses() {
    const amountFilter = parseFloat(amountFilterInput.value);
    const dateFilter = dateFilterInput.value;

    let filteredExpenses = expenses;

    if (!isNaN(amountFilter) && amountFilter > 0) {
        filteredExpenses = filteredExpenses.filter(expense => expense.amount >= amountFilter);
    }

    if (dateFilter !== '') {
        filteredExpenses = filteredExpenses.filter(expense => expense.date === dateFilter);
    }

    expensesTableBody.innerHTML = '';
    filteredExpenses.forEach(expense => {
        const newRow = createExpenseRow(expense);
        expensesTableBody.appendChild(newRow);
    });

    totalAmount = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalAmountCell.textContent = totalAmount;
}