import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';

function AddBook(props) {
  const [open, setOpen] = useState(false);
  const [book, setBook] = useState({title: '', author: '', year: '', isbn: '', price: ''});

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const inputChanged = (event) => {
    setBook({...book, [event.target.name]: event.target.value});
  }

  const handleSave = () => {
    props.addBook(book);
    setBook({title: '', author: '', year: '', isbn: '', price: ''});
    handleClose();
  }

  return (
    <>
      <Button variant="outlined" onClick={handleOpen}>
        Add book
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New book</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="title"
            label="Title"
            value={book.title}
            onChange={inputChanged}
            fullWidth
            variant="standard" />
          <TextField
            margin="dense"
            name="author"
            label="Author"
            value={book.author}
            onChange={inputChanged}
            fullWidth
            variant="standard" />
          <TextField
            margin="dense"
            name="year"
            label="Year"
            value={book.year}
            onChange={inputChanged}
            fullWidth
            variant="standard" />
          <TextField
            margin="dense"
            name="isbn"
            label="Isbn"
            value={book.isbn}
            onChange={inputChanged}
            fullWidth
            variant="standard" />
          <TextField
            margin="dense"
            name="price"
            label="Price"
            value={book.price}
            onChange={inputChanged}
            fullWidth
            variant="standard" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddBook;
