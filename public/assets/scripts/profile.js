//Loader
function showLoader() {
    document.getElementById('loader').style.display = 'flex';
}

function hideLoader() {
    document.getElementById('loader').style.display = 'none';
}

//We request all notes from the user
async function fetchNotes() {
    const response = await fetch('/notes/all', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const notes = await response.json();
    renderNotes(notes);
}

//We render the notes obtained
function renderNotes(notes) {
    const notesContainer = document.querySelector('.notes-container');
    notesContainer.innerHTML = '';

    notes.forEach(note => {
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note');
        noteDiv.style.backgroundColor = 'rgb(255, 250, 119)';

        const deleteForm = document.createElement('form');
        deleteForm.classList.add('delete-form');
        deleteForm.onsubmit = (e) => {
            e.preventDefault();
            deleteNote(note._id);
        };

        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = 'id';
        hiddenInput.value = note._id;

        const deleteButton = document.createElement('button');
        deleteButton.type = 'submit';
        deleteButton.innerHTML = '✕';
        deleteButton.classList.add('delete-btn');

        deleteForm.appendChild(hiddenInput);
        deleteForm.appendChild(deleteButton);

        const title = document.createElement('h3');
        title.textContent = note.title;

        const content = document.createElement('p');
        content.textContent = note.content;

        noteDiv.appendChild(deleteForm);
        noteDiv.appendChild(title);
        noteDiv.appendChild(content);

        notesContainer.appendChild(noteDiv);
    });
}

//Load page
async function initializePage() {
    showLoader();
    try {
        await fetchNotes();
    } catch (error) {
        console.error('Error:', error);
    } finally {
        hideLoader();
    }
}

initializePage()

//Log out user
function logout(event) {
    event.preventDefault()

    fetch('/logout', {
        method: 'POST',
        credentials: 'include'
    }).then(response => response.json())
        .then(data => {
            if (data.success) {
                window.location.href = data.redirect;
            }
        }).catch(error => console.error('Error de red:', error));

}

document.querySelector('.nav-icon img[src="/assets/images/icons8-plus-math-50.png"]').parentElement.addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('popup').style.display = 'flex';
});

document.getElementById('popup').addEventListener('click', function (event) {
    if (event.target.classList.contains('popup-overlay')) {
        this.style.display = 'none';
    }
});

document.getElementById('noteForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    const response = await fetch('/notes/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, content })
    });

    const data = await response.json();

    if (response.ok) {
        fetchNotes()
        document.getElementById('popup').style.display = 'none';
        document.getElementById('noteForm').reset();
    } else {
        alert(data.error || 'Error creating the note');
    }
});

async function deleteNote(noteId) {
    try {
        const response = await fetch('/notes/delete', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: noteId })
        });

        if (response.ok) {
            await fetchNotes();
        } else {
            console.error('Error deleting the note:', await response.text());
        }
    } catch (error) {
        console.error('Internal error', error);
    }
}