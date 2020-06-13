import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Home as HomeIcon } from '@material-ui/icons';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
		width: '100%',
	},
	title: {
		flexGrow: 1,
	},
});

function Navbar() {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<AppBar>
				<Toolbar>
					<Typography variant='h4' component='span' className={classes.title}>
						Lambda Eats
					</Typography>
					<IconButton aria-label='Go to Home page' component={Link} to='/'>
						<HomeIcon />
					</IconButton>
					<IconButton aria-label='go to help page' component={Link} to='/order'>
						<AddShoppingCartIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			<Toolbar />
		</div>
	);
}

export default Navbar;
