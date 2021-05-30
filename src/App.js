import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
/** material-ui **/
import { fade, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import SearchAppBar from './SearchAppBar';

let people = [];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    width: 400,
  },  
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function App() {

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const classes = useStyles();
  const handleChange = event => {
    setSearchTerm(event.target.value);
  };
  
  useEffect(() => {
    fetch('http://starlord.hackerearth.com/gamesarena')
            .then(
                function (response) {
                    if (response.status !== 200) {
                        return;
                    }                    
                    response.json().then(function (data) {
                      console.log(data);
                      people = data.filter(person => person.title);
                      setSearchResults(people);
                    });
                }
            )
            .catch(function (err) {
            });
  }, []);

  useEffect(() => {
    const results = people.length > 0 ? people.filter(person =>
      person.title && person.title.toLowerCase().includes(searchTerm)
    ) : [];
    setSearchResults(results);
  }, [searchTerm]);



  return (
    <div className="App">
      <header className="App-header">
        <AppBar position="sticky">
          <Toolbar>          
            <Typography className={classes.title} variant="h6" noWrap>
              Material-UI
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                value={searchTerm}
                onChange={handleChange}
              />
            </div>
          </Toolbar>
        </AppBar>
         
        <br/>

        <div className={classes.root}>
             <Grid container spacing={1}>
                <Grid container item spacing={3}>
                  {searchResults.map((data, index) => (
                      <Grid key={index} item>
                        <Paper className={classes.paper}>
                           <Typography gutterBottom variant="subtitle1">
                              {data.title}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {data.platform}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {data.genre}
                            </Typography>                      
                        </Paper>
                      </Grid>
                    ))}
                </Grid>
             </Grid>
          </div>   

      </header>
    </div>
  );
}

export default App;
