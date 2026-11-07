import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Booklist from './Booklist';
import './App.css';

function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Bookstore</Typography>
        </Toolbar>
      </AppBar>
      <Booklist />
    </>
  );
}

export default App;
