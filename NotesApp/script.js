$(document).ready(function () {
  function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    $('#notesContainer').empty();
    notes.forEach((note, index) => {
      $('#notesContainer').append(`
        <div class="note" data-index="${index}">
          <p>${note}</p>
          <button class="delete-btn">Delete</button>
          <button class="edit-btn">Edit</button>
        </div>
      `);
    });
  }

  function saveNotes(notes) {
    localStorage.setItem('notes', JSON.stringify(notes));
  }

  $('#addNote').click(function () {
    const newNote = $('#noteInput').val().trim();
    if (newNote !== '') {
      const notes = JSON.parse(localStorage.getItem('notes')) || [];
      notes.push(newNote);
      saveNotes(notes);
      loadNotes();
      $('#noteInput').val('');
    }
  });

  $('#notesContainer').on('click', '.delete-btn', function () {
    const index = $(this).parent().data('index');
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1);
    saveNotes(notes);
    loadNotes();
  });

  $('#notesContainer').on('click', '.edit-btn', function () {
    const index = $(this).parent().data('index');
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const updatedText = prompt('Edit your note:', notes[index]);
    if (updatedText !== null) {
      notes[index] = updatedText;
      saveNotes(notes);
      loadNotes();
    }
  });

  $('#searchBox').on('input', function () {
    const searchTerm = $(this).val().toLowerCase();
    $('.note').each(function () {
      const noteText = $(this).text().toLowerCase();
      $(this).toggle(noteText.includes(searchTerm));
    });
  });

  // Load notes on page load
  loadNotes();
});
