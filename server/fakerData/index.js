export default {
  authors: [
    {
      id: 123,
      name: "Tam Nguyen",
    },
    {
      id: 999,
      name: "Nhu Tran",
    },
  ],
  folders: [
    {
      id: "1",
      name: "Home",
      createAt: "2022-11-18T03:42:13Z",
      authorId: 123,
    },
    {
      id: "2",
      name: "Work",
      createAt: "2023-01-15T10:30:00Z",
      authorId: 999,
    },
    {
      id: "3",
      name: "Shopping",
      createAt: "2023-03-22T14:12:45Z",
      authorId: 123,
    },
  ],
  notes: [
    {
      id: "123",
      content: "<p>Go to supermarket <p>",
      folderId: "1",
    },
    {
      id: "234",
      content: "<p>Go to park <p>",
      folderId: "2",
    },
    {
      id: "567",
      content: "<p>Go to school <p>",
      folderId: "3",
    },
  ],
};
