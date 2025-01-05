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
            noteList.innerHTML = '';
            notes.forEach(note => {
                const noteItem = document.createElement('div');
                noteItem.className = 'note-item';
                noteItem.textContent = `${note.content.substring(0, 20)}... (Saved: ${new Date(note.timestamp).toLocaleString()})`;
                noteItem.onclick = () => loadNoteById(note.id);
                noteList.appendChild(noteItem);
            });
}


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

document.addEventListener('DOMContentLoaded', () => {
    // Load the note content if available
    const currentNote = localStorage.getItem('currentNote');
    if (currentNote) {
        document.getElementById('current_note').value = currentNote;
        localStorage.removeItem('currentNote'); // Clear the temporary storage
    }
});