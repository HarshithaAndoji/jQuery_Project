$(document).ready(function () {
  let expression = "";

  $('.btn').not('#clear, #equals, #backspace').click(function () {
    expression += $(this).data('val');
    $('#display').val(expression);
  });

  $('#clear').click(function () {
    expression = "";
    $('#display').val('');
  });

  $('#backspace').click(function () {
    expression = expression.slice(0, -1);
    $('#display').val(expression);
  });

  $('#equals').click(function () {
    try {
      expression = eval(expression).toString();
      $('#display').val(expression);
    } catch {
      $('#display').val("Error");
      expression = "";
    }
  });
});
