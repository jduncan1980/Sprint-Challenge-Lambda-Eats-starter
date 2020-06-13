import React, { useState, useEffect } from 'react';
import {
	FormGroup,
	TextField,
	Checkbox,
	InputLabel,
	Select,
	Switch,
	MenuItem,
	Radio,
	RadioGroup,
	FormControlLabel,
	FormControl,
	FormLabel,
	FormHelperText,
	Typography,
	Zoom,
	useMediaQuery,
	Grid,
	Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import * as yup from 'yup';
import theme from '../theme';
import pizza from '../Assets/Pizza.jpg';

const useStyles = makeStyles({
	heading: {
		marginTop: '1rem',
	},
	image: {
		width: '95%',
		height: 'auto',
	},
	formControl: {
		marginBottom: theme.spacing(6),
		minWidth: '90%',
		// marginTop: theme.spacing(6),
	},
	toppings: {
		// marginTop: '5rem',
	},
	sauce: {
		marginBottom: '2rem',
	},
	gluten: {
		marginBottom: '2rem',
	},
	submit: {
		marginTop: '2rem',
	},
	name: {
		margin: '2rem 0',
	},
});

function Form() {
	const [post, setPost] = useState([]);
	const [buttonDisabled, setButtonDisabled] = useState(true);
	const [formState, setFormState] = useState({
		name: '',
		size: '',
		sauce: '',
		pepperoni: false,
		sausage: false,
		mushroom: false,
		extracheese: false,
		glutenFree: false,
		comments: '',
	});

	const [errors, setErrors] = useState({
		name: '',
		size: '',
		sauce: '',
		pepperoni: '',
		sausage: '',
		mushroom: '',
		extracheese: '',
		glutenFree: '',
		comments: '',
	});

	const formSchema = yup.object().shape({
		name: yup.string().min(2).required('Name is a required field'),
		sauce: yup
			.mixed()
			.oneOf(['Marinara', 'Garlic Ranch', 'BBQ Sauce', 'Spinach Alfredo'])
			.defined(),
		size: yup.mixed().oneOf(['Small', 'Medium', 'Large']).defined(),
		pepperoni: yup.bool(),
		sausage: yup.bool(),
		mushroom: yup.bool(),
		extracheese: yup.bool(),
		glutenFree: yup.bool(),
		comments: yup.string(),
	});

	useEffect(() => {
		console.log('checking to see if form is valid yet');
		formSchema.isValid(formState).then((isFormValid) => {
			console.log('is form valid?', isFormValid);
			setButtonDisabled(!isFormValid); // disabled= false if form is valid
		});
	}, [formState]);

	const handleChange = (e) => {
		e.persist();
		const newFormData = {
			...formState,
			[e.target.name]: e.target.value,
		};
		validateChange(e);
		// console.log(newFormData);
		setFormState(newFormData);
	};

	const handleCheckbox = (e) => {
		e.persist();
		const newFormData = {
			...formState,
			[e.target.name]: e.target.checked,
		};
		validateChange(e);
		// console.log(newFormData);
		setFormState(newFormData);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		axios
			.post('https://reqres.in/api/users', formState)
			.then((res) => {
				setPost(res.data);
				console.log('success');
				setFormState({
					name: '',
					size: '',
					sauce: '',
					pepperoni: false,
					sausage: false,
					mushroom: false,
					extracheese: false,
					glutenFree: false,
					comments: '',
				});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const validateChange = (e) => {
		yup
			.reach(formSchema, e.target.name)
			.validate(e.target.value)
			.then(() => {
				setErrors({
					...errors,
					[e.target.name]: '',
				});
			})
			.catch((err) => {
				setErrors({
					...errors,
					[e.target.name]: err.errors[0],
				});
			});
	};

	const smallUp = useMediaQuery(theme.breakpoints.up('sm'));
	const classes = useStyles();
	return (
		<Grid container spacing={4} direction='column'>
			<Grid item>
				<Typography
					variant={smallUp ? 'h2' : 'h4'}
					component='h3'
					color='initial'
					align='center'
					className={classes.heading}
				>
					Build Your Own Pizza!
				</Typography>
			</Grid>
			<Grid item container justify='center'>
				<Zoom in timeout={1000}>
					<img
						src={pizza}
						className={classes.image}
						alt='delicious pizza'
					></img>
				</Zoom>
			</Grid>
			{/* Name Field */}
			<Grid item container direction='column' alignItems='center' spacing={10}>
				<form onSubmit={handleSubmit}>
					<Grid item className={classes.name}>
						<TextField
							id='name'
							name='name'
							onChange={handleChange}
							value={formState.name}
							inputProps={{ 'data-cy': 'name' }}
							label='Your Name'
							variant='filled'
							error={errors.name}
							helperText={errors.name}
						/>
					</Grid>
					<Grid item>
						{/* Choose a size... */}
						<FormControl className={classes.formControl} error={errors.size}>
							<InputLabel id='sizeLabel'>Choose Size</InputLabel>
							<Select
								native
								labelId='choose-sauce'
								name='size'
								id='size'
								inputProps={{ 'data-cy': 'size' }}
								value={formState.size}
								onChange={handleChange}
							>
								<option value='Small'>Small</option>
								<option value='Medium'>Medium</option>
								<option value='Large'>Large</option>
							</Select>
							{/* <FormHelperText>Must Choose Size</FormHelperText> */}
						</FormControl>
					</Grid>

					<Grid item>
						{/* Choose A Sauce... */}
						<FormControl
							component='fieldset'
							className={classes.sauce}
							error={errors.sauce}
						>
							<FormLabel component='legend'>Choose a sauce.</FormLabel>
							<RadioGroup
								aria-label='choose sauce'
								name='sauce'
								value={formState.sauce}
								onChange={handleChange}
								data-cy='sauce'
							>
								<FormControlLabel
									value='Marinara'
									control={<Radio />}
									label='Marinara'
								/>
								<FormControlLabel
									value='Garlic Ranch'
									control={<Radio />}
									label='Garlic Ranch'
								/>
								<FormControlLabel
									value='BBQ Sauce'
									control={<Radio />}
									label='BBQ Sauce'
								/>
								<FormControlLabel
									value='Spinach Alfredo'
									control={<Radio />}
									label='Spinach Alfredo'
								/>
							</RadioGroup>
							<FormHelperText>Must Choose A Sauce</FormHelperText>
						</FormControl>
					</Grid>

					<Grid item>
						<FormControl component='fieldset' className={classes.formControl}>
							<FormLabel component='legend'>Pick Toppings</FormLabel>
							<FormGroup data-cy='toppings'>
								<FormControlLabel
									control={
										<Checkbox
											checked={formState.pepperoni}
											onChange={handleCheckbox}
											name='pepperoni'
											id='pepperoni'
										/>
									}
									label='Pepperoni'
								/>
								<FormControlLabel
									control={
										<Checkbox
											checked={formState.sausage}
											onChange={handleCheckbox}
											name='sausage'
											id='sausage'
										/>
									}
									label='Sausage'
								/>
								<FormControlLabel
									control={
										<Checkbox
											checked={formState.mushrooms}
											onChange={handleCheckbox}
											name='mushroom'
											id='mushroom'
										/>
									}
									label='Mushroom'
								/>
								<FormControlLabel
									control={
										<Checkbox
											checked={formState.extraCheese}
											onChange={handleCheckbox}
											name='extracheese'
											id='extracheese'
										/>
									}
									label='Extra Cheese'
								/>
							</FormGroup>
						</FormControl>
					</Grid>

					<Grid item>
						<FormGroup className={classes.gluten}>
							<FormControlLabel
								control={
									<Switch
										checked={formState.glutenFree}
										onChange={handleCheckbox}
										name='glutenFree'
										id='glutenFree'
									/>
								}
								label='Gluten Free Crust?'
							/>
						</FormGroup>
					</Grid>
					<Grid item>
						<TextField
							id='comments'
							name='comments'
							onChange={handleChange}
							value={formState.comments}
							inputProps={{ 'data-cy': 'comments' }}
							label='Additional Requests'
							multiline
							rows={4}
							variant='filled'
						/>
					</Grid>
					<Grid item className={classes.submit}>
						<Button
							variant='contained'
							color='primary'
							type='submit'
							fullWidth
							data-cy='submit'
							disabled={buttonDisabled}
						>
							Add to cart
						</Button>
					</Grid>
				</form>
			</Grid>
			<pre>{JSON.stringify(post, null, 2)}</pre>
		</Grid>
	);
}

export default Form;
