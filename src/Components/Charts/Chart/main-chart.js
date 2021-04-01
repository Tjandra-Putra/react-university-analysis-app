import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import { Bar, Line, Pie, Doughnut, Scatter } from 'react-chartjs-2';

const useStyles = makeStyles((theme) => ({
	margin: {
		marginTop: theme.spacing(1)
	},
	root: {
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary,
		marginTop: '2vh'
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120
	},
	customFormUniversity: {
		margin: theme.spacing(1),
		minWidth: 364
	},
	customFormDegree: {
		margin: theme.spacing(1),
		minWidth: 400,
		maxWidth: 400
	},
	customButtomSearch: {
		marginTop: '1.3rem',
		marginLeft: '0.7rem'
	}
}));

const CustomizedSelects = () => {
	const classes = useStyles();

	// Init
	const [ isSelectDisable, setIsSelectDisabled ] = useState(true);

	// States - Select Input Component
	const [ valueSelectUniversity, setValueSelectUniversity ] = useState('');
	const [ valueSelectYear, setValueSelectYear ] = useState('');
	const [ valueSelectDegree, setValueSelectDegree ] = useState('');

	// States - API data
	const [ data_api, set_data_api ] = useState('');
	const [ data_university, set_university ] = useState([]);
	const [ data_year, set_year ] = useState([]);
	const [ data_degree, set_degree ] = useState([]);

	// Handler
	const handleChangeUniversity = (e) => setValueSelectUniversity(e.target.value);

	const handleChangeYear = (e) => setValueSelectYear(e.target.value);

	const handleChangeDegree = (e) => setValueSelectDegree(e.target.value);

	useEffect(() => {
		Axios.get(
			'https://data.gov.sg/api/action/datastore_search?resource_id=9326ca53-9153-4a9c-b93f-8ae032637b70&limit=1000'
		).then((response) => {
			console.log(response.data.result.records);

			set_data_api(response.data.result.records);

			//Arrays
			let arrayUniversity = [];
			let arrayYear = [];
			// let arrayDegree = [];

			response.data.result.records.map((item) => {
				arrayUniversity.push(item.university);
				arrayYear.push(item.year);
			});

			// Array with Unique Value
			let arrayUniversityUnique = [ ...new Set(arrayUniversity) ];
			let arrayYearUnique = [ ...new Set(arrayYear) ];

			// Set State
			set_university(arrayUniversityUnique);
			set_year(arrayYearUnique);
		});
	}, []);

	// Display the specific Degrees for chosen University
	const handleSubmitForm = (event) => {
		event.preventDefault();
		if (valueSelectUniversity !== '') {
			let arrayDegree = [];

			// Filter API Data Logic
			data_university.map((university) => {
				if (valueSelectUniversity === university) {
					data_api.map((item) => {
						if (item.university === valueSelectUniversity) {
							arrayDegree.push(item.degree);
						}
						let arrayDegreeUnique = [ ...new Set(arrayDegree) ];

						set_degree(arrayDegreeUnique);
					});
				}
			});

			// Enable second field input degree
			setIsSelectDisabled(false);
		}
	};

	return (
		<Container>
			<Box my={2}>
				<form onSubmit={handleSubmitForm}>
					<FormControl className={classes.customFormUniversity}>
						<InputLabel htmlFor="grouped-native-select">University</InputLabel>
						<Select
							native
							defaultValue=""
							id="grouped-native-select"
							onChange={handleChangeUniversity}
							autoFocus
						>
							<option aria-label="None" value="" />
							{data_university.map((optionValue) => (
								<option value={optionValue} key={optionValue}>
									{optionValue}
								</option>
							))}
						</Select>
					</FormControl>
					<FormControl className={classes.customFormDegree}>
						<InputLabel htmlFor="grouped-native-select">Degree</InputLabel>
						<Select
							native
							defaultValue=""
							id="grouped-native-select"
							disabled={isSelectDisable}
							onChange={handleChangeDegree}
						>
							<option aria-label="None" value="" />
							{data_degree.map((optionValue) => (
								<option value={optionValue} key={optionValue}>
									{optionValue}
								</option>
							))}
						</Select>
					</FormControl>
					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="grouped-select">Year</InputLabel>
						<Select
							defaultValue=""
							id="grouped-select"
							onChange={handleChangeYear}
							disabled={isSelectDisable}
						>
							<MenuItem value="">
								<em>None</em>
							</MenuItem>
							{data_year.map((menuValue) => (
								<MenuItem value={menuValue} key={menuValue}>
									{menuValue}
								</MenuItem>
							))}
						</Select>
					</FormControl>
					<Button variant="contained" color="primary" type="submit" className={classes.customButtomSearch}>
						Filter
					</Button>
				</form>
			</Box>

			{valueSelectUniversity !== '' && valueSelectDegree !== '' && valueSelectYear !== '' ? (
				<p>
					Filter by: {valueSelectUniversity} | {valueSelectDegree} | {valueSelectYear}
				</p>
			) : null}
		</Container>
	);
};
export default CustomizedSelects;
