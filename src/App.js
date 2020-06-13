import React from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar';
import Form from './components/Form';
import Home from './components/Home';

const useStyles = makeStyles({
	container: {
		maxWidth: '100vw',
	},
});
function App() {
	const classes = useStyles();
	return (
		<Container className={classes.container}>
			<Navbar />
			<Switch>
				<Route exact path='/'>
					<Home />
				</Route>
				<Route path='/order'>
					<Form />
				</Route>
			</Switch>
		</Container>
	);
}

export default App;
