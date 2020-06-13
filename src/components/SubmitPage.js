import React from 'react';
import { Grid, Typography } from '@material-ui/core';

function SubmitPage({ post }) {
	return (
		<Grid container direction='column' alignItems='center'>
			<Grid item>
				<Typography>Thank You, your order has been received</Typography>
			</Grid>
			<Grid item>
				<pre>{JSON.stringify(post, null, 2)}</pre>
			</Grid>
		</Grid>
	);
}

export default SubmitPage;
