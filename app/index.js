const storageKey = 'NPC';

//loading notes when the page loads
document.addEventListener('DOMContentLoaded', load_list);

//saving notes function
function save(){
    const note_content = document.getElementById("current_note").value;
    if (note_content.trim() === '') {
        alert('Cannot save an empty note');
        return;
    }
    const notes = JSON.parse(localStorage.getItem(storageKey)) || [];
            const note = { id: Date.now(), content: note_content, timestamp: new Date().toISOString() };
            notes.push(note);
            localStorage.setItem(storageKey, JSON.stringify(notes));
            document.getElementById('current_note').value = '';
            alert('Note saved!');
}

//loading note list
function load_list(){
    const notes = JSON.parse(localStorage.getItem(storageKey)) || [];
            const noteList = document.getElementById('notes_container');
            if (!noteList) return; // Prevent errors if the container does not exist
            noteList.innerHTML = '';
            notes.forEach(note => {
                const noteItem = document.createElement('div');
                const delete_button = document.createElement('button');
                noteItem.className = 'note-item';
                delete_button.className = 'delete-button';
                noteItem.textContent = `${note.content.substring(0, 20)}... (Saved: ${new Date(note.timestamp).toLocaleString()})`;
                noteItem.onclick = () => loadNoteById(note.id);
                delete_button.textContent = 'Delete';
                delete_button.onclick = (event) => {
                    event.stopPropagation();
                    deleteNoteById(note.id);
                }
                noteItem.appendChild(delete_button);
                noteList.appendChild(noteItem);
            });
}

//loading note into index
function loadNoteById(noteId) {
    const notes = JSON.parse(localStorage.getItem(storageKey)) || [];
    const note = notes.find(n => n.id === noteId);
    if (note) {
        localStorage.setItem('currentNote', note.content);
        window.location.href = "index.html";
    } else {
        alert('Note not found!');
    }
}

//deleting a note
function deleteNoteById(noteId) {
    const notes = JSON.parse(localStorage.getItem(storageKey)) || [];
    const updatedNotes = notes.filter(note => note.id !== noteId);
    localStorage.setItem(storageKey, JSON.stringify(updatedNotes));
    alert('Note deleted!');
    load_list(); // Reload the updated note list
}

document.addEventListener('DOMContentLoaded', () => {
    // Load the note content if available
    const currentNote = localStorage.getItem('currentNote');
    if (currentNote) {
        document.getElementById('current_note').value = currentNote;
        localStorage.removeItem('currentNote'); // Clear the temporary storage
    }
});

function back(){
    location.replace('index.html');
}

function saved_page(){
    location.replace('save.html');
}