$(document).ready(function () {
  $('#addTask').click(function () {
    let taskText = $('#taskInput').val();
    if (taskText.trim() !== '') {
      $('#taskList').append(`
        <li>
          <span class="task">${taskText}</span>
          <span>
            <button class="completeBtn">✔️</button>
            <button class="deleteBtn">🗑️</button>
          </span>
        </li>
      `);
      $('#taskInput').val('');
    }
  });

  $('#taskList').on('click', '.completeBtn', function () {
    $(this).closest('li').find('.task').toggleClass('completed');
  });

  $('#taskList').on('click', '.deleteBtn', function () {
    $(this).closest('li').remove();
  });
});
