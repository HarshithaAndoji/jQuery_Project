let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function saveAndRender() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
  renderList();
  renderChart();
}

function renderList() {
  const month = $('#filterMonth').val();
  const category = $('#filterCategory').val();
  $('#expenseList').empty();

  expenses
    .filter(e => {
      const matchesMonth = !month || e.date.startsWith(month);
      const matchesCategory = !category || e.category === category;
      return matchesMonth && matchesCategory;
    })
    .forEach((exp, i) => {
      $('#expenseList').append(`
        <li>
          <span>${exp.date} - ${exp.category} - ${exp.description} : ₹${exp.amount}</span>
          <button class="delete-btn" data-id="${i}">Delete</button>
        </li>
      `);
    });
}

function renderChart() {
  const summary = {};
  expenses.forEach(exp => {
    summary[exp.category] = (summary[exp.category] || 0) + parseFloat(exp.amount);
  });

  const ctx = document.getElementById('expenseChart').getContext('2d');
  if (window.myChart) window.myChart.destroy();
  window.myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: Object.keys(summary),
      datasets: [{
        data: Object.values(summary),
        backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0']
      }]
    }
  });
}

$('#addExpense').click(() => {
  const newExp = {
    description: $('#desc').val(),
    amount: $('#amount').val(),
    date: $('#date').val(),
    category: $('#category').val()
  };
  if (newExp.description && newExp.amount && newExp.date) {
    expenses.push(newExp);
    saveAndRender();
    $('#desc, #amount, #date').val('');
  }
});

$('#expenseList').on('click', '.delete-btn', function () {
  const id = $(this).data('id');
  expenses.splice(id, 1);
  saveAndRender();
});

$('#filterMonth, #filterCategory').on('change', renderList);

$(document).ready(saveAndRender);
