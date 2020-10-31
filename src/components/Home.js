import React from 'react';
import pizza from '../Assets/Pizza.jpg';
import { Grid, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
	image: {
		width: '100%',
	},
	gridItem: {
		marginTop: '5rem',
	},
});

function Home(props) {
	const classes = useStyles();
	return (
		<Grid container direction='column' alignItems='center'>
			<Grid item className={classes.gridItem}>
				<Typography variant='h1' align='center'>
					Hungry?{' '}
				</Typography>
			</Grid>
			<Grid item className={classes.gridItem}>
				<img src={pizza} alt='Delicious Pizza' className={classes.image} />
			</Grid>

			<Grid item className={classes.gridItem}>
				<Button
					size='large'
					variant='contained'
					color='secondary'
					component={Link}
					to='/order'
				>
					Order Now!
				</Button>
			</Grid>
		</Grid>
	);
}

export default Home;
