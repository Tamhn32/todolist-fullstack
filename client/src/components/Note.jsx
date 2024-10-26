import React, { useEffect, useState } from "react";
import {
  ContentState,
  convertFromHTML,
  convertFromRaw,
  EditorState,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { draftToHtml } from "draftjs-to-html";
export default function Note() {
  const note = {
    id: "9999",
    content: "<p> this is new note",
  };
  const [editorState, setEditorState] = useState(() => {
    return EditorState.createEmpty();
  });
  const [rawHTML, setRawHTML] = useState(note.content);

  useEffect(() => {
    const blocksFromHTML = convertFromHTML(note.content);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    setEditorState(EditorState.createWithContent(state));
  }, [note.id]);

  useEffect(() => {
    setRawHTML(note.content);
  }, [note.content]);

  const handleOnChange = (e) => {
    setEditorState(e);
    setRawHTML(draftToHtml(convertFromRaw(e.getCurrentContent())));
  };

  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleOnChange}
      placeholder="Write Some Thing"
    />
  );
}
