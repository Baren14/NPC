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
            load_list();
            alert('Note saved!');
}

//loading note list
function load_list(){
    const notes = JSON.parse(localStorage.getItem(storageKey)) || [];
            const noteList = document.getElementById('list');
            noteList.innerHTML = '';
            notes.forEach(note => {
                const noteItem = document.createElement('div');
                noteItem.className = 'note-item';
                noteItem.textContent = `${note.content.substring(0, 20)}... (Saved: ${new Date(note.timestamp).toLocaleString()})`;
                noteItem.onclick = () => loadNoteById(note.id);
                noteList.appendChild(noteItem);
            });
}
