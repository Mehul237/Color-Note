import React, { useState } from "react";
import "./NoteContainer.css";
import Notes from "./Notes";
import SearchBar from "./SearchBar";

function NoteContainer(props) {
  const reverseArray = (arr) => {
    const array = [];
    for (let i = arr.length - 1; i >= 0; i--) {
      array.push(arr[i]);
    }
    return array;
  };

  const notes = reverseArray(props.notes);

  const [displayNotes, setDisplayNotes] = useState(notes);

  const searchHandler = (event) => {
    event.preventDefault();
    let searchQuery = event.target.value.toLowerCase();
    let filteredNotes = notes.filter((el) => {
      let searchValue = el.text.toLowerCase();
      return searchValue.indexOf(searchQuery) !== -1;
    });
    setDisplayNotes(filteredNotes);
  };

  const deleteNote = (id) => {
    let updatedNotes = notes.filter((note) => note.id !== id);
    setDisplayNotes(updatedNotes);
    props.deleteNote(id);
  };

  const updateText = (text, id) => {
    props.updateText(text, id);
  };

  return (
    <>
      <div className="note-container">
        <SearchBar notes={notes} searchHandler={searchHandler} />
        <h2>My Notes</h2>
        <div className="note-container-notes custom-scroll">
          {displayNotes.length > 0 ? (
            displayNotes.map((note) => (
              <div className="note-container-note" key={note.id}>
                <Notes
                  note={note}
                  deleteNote={() => deleteNote(note.id)}
                  updateText={() => updateText(note.text, note.id)}
                />
              </div>
            ))
          ) : (
            <div className="note-container-note">
              <h3>No Notes Present</h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default NoteContainer;