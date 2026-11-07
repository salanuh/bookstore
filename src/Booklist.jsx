import { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import AddBook from './AddBook';

const databaseUrl = 'https://bookstore-d0062-default-rtdb.europe-west1.firebasedatabase.app';

function Booklist() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    fetch(`${databaseUrl}/books.json`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error in fetch: ' + response.statusText);
      }
    })
    .then(data => {
      if (data) {
        setBooks(Object.entries(data).map(([id, book]) => ({...book, id: id})));
      } else {
        setBooks([]);
      }
    })
    .catch(err => console.error(err));
  }

  const addBook = (newBook) => {
    fetch(`${databaseUrl}/books.json`, {
      method: 'POST',
      body: JSON.stringify(newBook)
    })
    .then(response => {
      if (response.ok) {
        fetchBooks();
      } else {
        throw new Error('Error in fetch: ' + response.statusText);
      }
    })
    .catch(err => console.error(err));
  }

  const deleteBook = (id) => {
    fetch(`${databaseUrl}/books/${id}.json`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        fetchBooks();
      } else {
        throw new Error('Error in fetch: ' + response.statusText);
      }
    })
    .catch(err => console.error(err));
  }

  const columns = [
    {field: 'title', headerName: 'Title', width: 250},
    {field: 'author', headerName: 'Author', width: 200},
    {field: 'year', headerName: 'Year', width: 100},
    {field: 'isbn', headerName: 'Isbn', width: 160},
    {field: 'price', headerName: 'Price', width: 100},
    {
      field: 'delete',
      headerName: '',
      width: 80,
      sortable: false,
      filterable: false,
      renderCell: (params) =>
        <Tooltip title="Delete book">
          <IconButton color="error" onClick={() => deleteBook(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
    }
  ];

  return (
    <>
      <div style={{textAlign: 'center', margin: '10px'}}>
        <AddBook addBook={addBook} />
      </div>
      <div style={{height: 500, width: 900, maxWidth: '100%', margin: 'auto'}}>
        <DataGrid
          rows={books}
          columns={columns}
          getRowId={(row) => row.id}
          disableRowSelectionOnClick />
      </div>
    </>
  );
}

export default Booklist;
