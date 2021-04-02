import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
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
	const [ valueSelectDegree, setValueSelectDegree ] = useState('');

	// States - API data
	const [ data_api, set_data_api ] = useState('');
	const [ data_university, set_university ] = useState([]);
	const [ data_year, set_year ] = useState([]);
	const [ data_degree, set_degree ] = useState([]);
	const [ data_employment_rate_overall, set_employment_rate_overall ] = useState([]);
	const [ data_employment_rate_ft_perm, set_employment_rate_ft_perm ] = useState([]);

	// Handler
	const handleChangeUniversity = (e) => {
		setValueSelectUniversity(e.target.value);
	};

	const handleChangeDegree = (e) => setValueSelectDegree(e.target.value);

	useEffect(() => {
		Axios.get(
			'https://data.gov.sg/api/action/datastore_search?resource_id=9326ca53-9153-4a9c-b93f-8ae032637b70&limit=1000'
		).then((response) => {
			console.log(response.data.result.records);

			set_data_api(response.data.result.records);

			//Arrays
			let arrayUniversity = [];
			// let arrayYear = [];

			response.data.result.records.map((item) => {
				arrayUniversity.push(item.university);
				// arrayYear.push(item.year);
			});

			// Array with Unique Value
			let arrayUniversityUnique = [ ...new Set(arrayUniversity) ];
			// let arrayYearUnique = [ ...new Set(arrayYear) ];

			// Set State
			set_university(arrayUniversityUnique);
			// set_year(arrayYearUnique);
		});
	}, []);

	// Display the specific Degrees for chosen University
	const handleSubmitForm = (event) => {
		event.preventDefault();
		if (valueSelectUniversity !== '') {
			let arrayDegree = [];
			// let arrayEmploymentRateOverall = [];
			// let arrayYear = [];

			// Filter Array of API Data Logic
			data_university.map((university) => {
				if (valueSelectUniversity === university) {
					data_api.map((item) => {
						// Conditions
						if (item.university === valueSelectUniversity) {
							arrayDegree.push(item.degree);
							// arrayYear.push(item.year);
						}
						let arrayDegreeUnique = [ ...new Set(arrayDegree) ];
						// let arrayYearUnique = [ ...new Set(arrayYear) ];

						// Set State
						set_degree(arrayDegreeUnique);
						// set_employment_rate_overall(arrayEmploymentRateOverall);
						// set_year(arrayYearUnique);
					});
				}
			});

			// Filter by selected University and Degree
			let arrayEmploymentRateOverall = [];
			let arrayEmploymentFtPerm = [];
			let arrayYear = [];

			data_api.map((obj) => {
				if (valueSelectUniversity === obj.university && valueSelectDegree === obj.degree) {
					// Add to Array
					arrayEmploymentRateOverall.push(obj.employment_rate_overall);
					arrayEmploymentFtPerm.push(obj.employment_rate_ft_perm);
					arrayYear.push(obj.year);

					//Set State
					set_employment_rate_overall(arrayEmploymentRateOverall);
					set_employment_rate_ft_perm(arrayEmploymentFtPerm);
					set_year(arrayYear);

					console.log(obj.degree, obj.year, obj.employment_rate_overall);
				}
			});

			console.log(arrayYear);

			// Reset filter if empty
			if (valueSelectUniversity === '' || valueSelectDegree === '') {
				set_employment_rate_overall('');
				set_employment_rate_ft_perm('');
			}

			// Enable second field input degree
			setIsSelectDisabled(false);
		}
	};

	// Charts
	let chart_employment_rate_overall = {
		labels: data_year, // Array of Strings Unique Value
		datasets: [
			{
				label: 'Overall Employment Rate (%)',
				data: data_employment_rate_overall, // Array of Objects
				backgroundColor: [
					'rgba(255,99, 132, 0.6)',
					'rgba(54,162,235, 0.6)',
					'rgba(255,206,86, 0.6)',
					'rgba(75,192,192, 0.6)',
					'rgba(153,102,255, 0.6)',
					'rgba(255,159,64, 0.6)'
				]
			}
		]
	};

	let chart_employment_rate_ft_perm = {
		labels: data_year, // Array of Strings Unique Value
		datasets: [
			{
				label: 'Full Time Permanent Employment Rate(%)',
				data: data_employment_rate_ft_perm, // Array of Objects
				backgroundColor: [
					'rgba(255,99, 132, 0.6)',
					'rgba(54,162,235, 0.6)',
					'rgba(255,206,86, 0.6)',
					'rgba(75,192,192, 0.6)',
					'rgba(153,102,255, 0.6)',
					'rgba(255,159,64, 0.6)'
				]
			}
		]
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

					<Button variant="contained" color="primary" type="submit" className={classes.customButtomSearch}>
						Filter
					</Button>

					<Button variant="contained" color="secondary" type="submit" className={classes.customButtomSearch}>
						Reset
					</Button>
				</form>
			</Box>

			{valueSelectUniversity !== '' && valueSelectDegree !== '' ? (
				<p>
					Filter by: {valueSelectUniversity} | {valueSelectDegree}
				</p>
			) : null}

			<div className={classes.root}>
				<Box my={1}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={6}>
							<Box my={2}>
								<Typography variant="h7">Overall Employment Rate (%)</Typography>
							</Box>
							<Bar data={chart_employment_rate_overall} />
						</Grid>
						<Grid item xs={12} md={6}>
							<Box my={2}>
								<Typography variant="h7">Full Time Permanent Employment Rate(%)</Typography>
							</Box>
							<Bar data={chart_employment_rate_ft_perm} />
						</Grid>
					</Grid>
				</Box>
			</div>
		</Container>
	);
};
export default CustomizedSelects;
