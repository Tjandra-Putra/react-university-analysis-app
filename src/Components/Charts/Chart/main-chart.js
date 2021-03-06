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
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Chip from '@material-ui/core/Chip';
import { DataGrid } from '@material-ui/data-grid';

import { Bar, Line, Pie, Doughnut, HorizontalBar } from 'react-chartjs-2';

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
		marginTop: '0.5rem',
		margin: theme.spacing(1),
		// minWidth: 350
		width: '100%'
	},
	customFormDegree: {
		marginTop: '0.5rem',
		margin: theme.spacing(1),
		// minWidth: 350
		width: '100%'
	},
	customButtomSearch: {
		marginTop: '1.5rem',
		marginLeft: '0.7rem'
	},
	chip: {
		marginRight: '0.5rem'
	},
	chipWarning: {
		backgroundColor: 'rgba(255, 205, 58, 0.2)',
		color: '#886701',
		marginRight: '0.5rem',
		marginTop: '0.5rem',
		maxWidth: '25em'
	},
	chipDanger: {
		backgroundColor: 'rgb(250, 235, 235)',
		color: '#BB2E3E',
		marginRight: '0.5rem',
		marginTop: '0.5rem',
		maxWidth: '25em'
	},
	chipPink: {
		backgroundColor: 'rgb(250, 235, 235)',
		color: 'rgb(120, 33, 117)',
		marginRight: '0.5rem',
		marginTop: '0.5rem',
		maxWidth: '25em'
	},
	chipPurple: {
		backgroundColor: 'rgba(41, 0, 138, 0.2)',
		color: 'rgb(41, 0, 138)',
		marginRight: '0.5rem',
		marginTop: '0.5rem',
		maxWidth: '25em'
	},
	chipPrimary: {
		backgroundColor: 'rgba(20, 106, 144, 0.2)',
		color: 'rgb(20, 106, 144)',
		marginRight: '0.5rem',
		marginTop: '0.5rem',
		maxWidth: '25em'
	}
}));

const CustomizedSelects = () => {
	// SnackBar
	const [ open, setOpen ] = React.useState(false);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	const classes = useStyles();

	// Init
	const [ isSelectDisable, setIsSelectDisabled ] = useState(false);
	const [ snackBarMsg, setSnackBarMsg ] = useState('Please Provide Input');

	// States - Select Input Component
	const [ valueSelectUniversity, setValueSelectUniversity ] = useState('');
	const [ valueSelectDegree, setValueSelectDegree ] = useState('');
	const [ valueSchool, setValueSelectSchool ] = useState('');

	// States - API data
	const [ data_api, set_data_api ] = useState('');
	const [ data_university, set_university ] = useState([]);
	const [ data_year, set_year ] = useState([]);
	const [ data_degree, set_degree ] = useState([]);
	const [ data_employment_rate_overall, set_employment_rate_overall ] = useState([]);
	const [ data_employment_rate_ft_perm, set_employment_rate_ft_perm ] = useState([]);
	const [ data_basic_monthly_mean, set_basic_monthly_mean ] = useState([]);
	const [ data_basic_monthly_median, set_basic_monthly_median ] = useState([]);
	const [ data_gross_mthly_25_percentile, set_gross_mthly_25_percentile ] = useState([]);
	const [ data_gross_mthly_75_percentile, set_gross_mthly_75_percentile ] = useState([]);
	const [ data_grid, set_data_grid ] = useState([]);

	useEffect(() => {
		Axios.get(
			'https://data.gov.sg/api/action/datastore_search?resource_id=9326ca53-9153-4a9c-b93f-8ae032637b70&limit=1000'
		).then((response) => {
			console.log(response.data.result.records);

			set_data_api(response.data.result.records);

			//Arrays
			let arrayUniversity = [];

			response.data.result.records.map((item) => {
				arrayUniversity.push(item.university);
			});

			// Array with Unique Value
			let arrayUniversityUnique = [ ...new Set(arrayUniversity) ];

			// Set State
			set_university(arrayUniversityUnique);
		});
	}, []);

	// Handler
	const handleChangeUniversity = (e) => {
		setValueSelectUniversity(e.target.value);
		let arrayDegree = [];

		// Filter Array of API Data Logic
		data_university.map((university) => {
			if (e.target.value === university) {
				data_api.map((item) => {
					// Conditions
					if (item.university === e.target.value) {
						arrayDegree.push(item.degree);
					}
					let arrayDegreeUnique = [ ...new Set(arrayDegree) ];

					// Set State
					set_degree(arrayDegreeUnique.sort());
				});
			}
		});

		console.log('Onchange ' + valueSelectUniversity);
	};

	const handleChangeDegree = (e) => {
		setValueSelectDegree(e.target.value);

		// Filter by selected University and Degree
		let arraySchool = [];
		let arrayEmploymentRateOverall = [];
		let arrayEmploymentFtPerm = [];
		let arrayYear = [];
		let arrayBasicMonthlySalaryMean = [];
		let arrayBasicMonthlySalaryMedian = [];
		let arrayGrossMthly25Percentile = [];
		let arrayGrossMthly75Percentile = [];
		let tableArray = [];

		data_api.map((obj) => {
			if (valueSelectUniversity === obj.university && e.target.value === obj.degree) {
				// Add to Array
				arrayEmploymentRateOverall.push(obj.employment_rate_overall);
				arrayEmploymentFtPerm.push(obj.employment_rate_ft_perm);
				arrayYear.push(obj.year);
				arrayBasicMonthlySalaryMean.push(obj.gross_monthly_mean);
				arrayBasicMonthlySalaryMedian.push(obj.gross_monthly_median);
				arrayGrossMthly25Percentile.push(obj.gross_mthly_25_percentile);
				arrayGrossMthly75Percentile.push(obj.gross_mthly_75_percentile);
				arraySchool.push(obj.school);

				// Set State
				setValueSelectSchool(arraySchool[0]);
				set_employment_rate_overall(arrayEmploymentRateOverall);
				set_employment_rate_ft_perm(arrayEmploymentFtPerm);
				set_year(arrayYear);
				set_basic_monthly_mean(arrayBasicMonthlySalaryMean);
				set_basic_monthly_median(arrayBasicMonthlySalaryMedian);
				set_gross_mthly_25_percentile(arrayGrossMthly25Percentile);
				set_gross_mthly_75_percentile(arrayGrossMthly75Percentile);

				// Set State for Data Grid Table
				tableArray.push({
					id: obj._id,
					year: obj.year,
					university: obj.university,
					school: obj.school,
					degree: obj.degree,
					overall_employment_rate: obj.employment_rate_overall,
					fulltime_employment_rate: obj.employment_rate_ft_perm,
					gross_monthly_salary_mean: obj.gross_monthly_mean,
					gross_monthly_salary_median: obj.gross_monthly_median,
					gross_monthly_salary_25th: obj.gross_mthly_25_percentile,
					gross_monthly_salary_75th: obj.gross_mthly_75_percentile
				});

				set_data_grid(tableArray);

				console.log(obj.degree, obj.year, obj.employment_rate_overall, obj.basic_monthly_mean);
			}
		});

		let msgString = valueSelectUniversity + ' > ' + e.target.value;
		setSnackBarMsg(msgString);

		// // Reset filter if empty
		// if (valueSelectUniversity === '' || valueSelectDegree === '') {
		// 	set_employment_rate_overall('');
		// 	set_employment_rate_ft_perm('');
		// 	set_basic_monthly_mean('');
		// 	set_basic_monthly_median('');
		// 	set_gross_mthly_25_percentile('');
		// 	set_gross_mthly_75_percentile('');
		// }

		setOpen(true);

		// Enable second field input degree
		setIsSelectDisabled(false);
	};

	// Charts
	let chart_employment_rate_overall = {
		labels: data_year, // Array of Strings Unique Value
		datasets: [
			{
				label: 'Overall Employment Rate (%)',
				data: data_employment_rate_overall, // Array of Objects
				backgroundColor: [
					'rgba(255,99, 132, 0.4)',
					'rgba(54,162,235, 0.4)',
					'rgba(255,206,86, 0.4)',
					'rgba(75,192,192, 0.4)',
					'rgba(153,102,255, 0.4)',
					'rgba(255,159,64, 0.4)'
				],
				borderWidth: 2
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
					'rgba(255,99, 132, 0.4)',
					'rgba(54,162,235, 0.4)',
					'rgba(255,206,86, 0.4)',
					'rgba(75,192,192, 0.4)',
					'rgba(153,102,255, 0.4)',
					'rgba(255,159,64, 0.4)'
				],
				borderWidth: 2
			}
		]
	};

	let chart_gross_monthly_mean = {
		labels: data_year, // Array of Strings Unique Value
		datasets: [
			{
				label: 'Basic Monthly Salary Mean (S$)',
				data: data_basic_monthly_mean, // Array of Objects
				backgroundColor: [ 'rgba(75,192,192, 0.6)', 'rgba(153,102,255, 0.6)', 'rgba(255,159,64, 0.6)' ]
			}
		]
	};

	let chart_gross_monthly_median = {
		labels: data_year, // Array of Strings Unique Value
		datasets: [
			{
				label: 'Basic Monthly Salary Median (S$)',
				data: data_basic_monthly_median, // Array of Objects
				backgroundColor: [
					'rgba(54,162,235, 0.6)',
					'rgba(255,206,86, 0.6)',
					'rgba(75,192,192, 0.6)',
					'rgba(153,102,255, 0.6)',
					'rgba(255,159,64, 0.6)'
				]
			}
		]
	};

	let chart_gross_mthly_25_percentile = {
		labels: data_year, // Array of Strings Unique Value
		datasets: [
			{
				label: 'Gross Monthly Salary - 25th Percentile (S$)',
				data: data_gross_mthly_25_percentile, // Array of Objects
				backgroundColor: [
					'rgba(54,162,235, 0.6)',
					'rgba(255,206,86, 0.6)',
					'rgba(75,192,192, 0.6)',
					'rgba(153,102,255, 0.6)',
					'rgba(255,159,64, 0.6)'
				]
			}
		]
	};

	let chart_gross_mthly_75_percentile = {
		labels: data_year, // Array of Strings Unique Value
		datasets: [
			{
				label: 'Gross Monthly Salary - 75th Percentile (S$)',
				data: data_gross_mthly_75_percentile, // Array of Objects
				backgroundColor: [
					'rgba(54,162,235, 0.6)',
					'rgba(255,206,86, 0.6)',
					'rgba(75,192,192, 0.6)',
					'rgba(153,102,255, 0.6)',
					'rgba(255,159,64, 0.6)'
				]
			}
		]
	};

	const resetFormHandler = () => {
		window.location.reload(false);
	};

	// Table
	const columns = [
		{
			field: 'id',
			headerName: 'ID',
			width: 100
		},
		{ field: 'year', headerName: 'Year', width: 120 },
		{
			field: 'university',
			headerName: 'University',
			width: 150,
			sortable: false
		},
		{
			field: 'school',
			headerName: 'School',
			width: 150,
			sortable: false
		},
		{
			field: 'degree',
			headerName: 'Degree',
			width: 160,
			sortable: false
		},
		{
			field: 'overall_employment_rate',
			headerName: 'Overall Employment Rate (%)',
			width: 300,
			description:
				'Overall employment rate refers to the number of graduates working in full-time permanent, part-time, temporary or freelance basis, as a proportion of graduates in the labour force (i.e. those who were working, or not working but actively looking and available for work) approximately 6 months after completing their final examinations.'
		},
		{
			field: 'fulltime_employment_rate',
			headerName: 'Full-Time Employment Rate (%)',
			width: 300,
			description:
				'Full-time permanent employment rate refers to the number of graduates in employment of at least 35 hours a week and where the employment is not temporary (including contracts of one year or more), as a proportion of graduates in the labour force (i.e. those who were working, or not working but actively looking and available for work) approximately 6 months after completing their final examinations.'
		},
		{
			field: 'gross_monthly_salary_mean',
			headerName: 'Gross Monthly Salary - Mean (S$)',
			width: 320,
			description:
				'Gross monthly salary pertains only to full-time permanently employed graduates. It comprises basic salary, overtime payments, commissions, fixed allowances, and other regular cash payments, before deductions of the employee???s CPF contributions and personal income tax. Employer???s CPF contributions, bonuses, stock options, lump sum payments, and payments-in-kind are excluded.'
		},
		{
			field: 'gross_monthly_salary_median',
			headerName: 'Gross Monthly Salary - Median (S$)',
			width: 320,
			description:
				'Gross monthly salary pertains only to full-time permanently employed graduates. It comprises basic salary, overtime payments, commissions, fixed allowances, and other regular cash payments, before deductions of the employee???s CPF contributions and personal income tax. Employer???s CPF contributions, bonuses, stock options, lump sum payments, and payments-in-kind are excluded.'
		},
		{
			field: 'gross_monthly_salary_25th',
			headerName: 'Gross Monthly Salary - 25th Percentile (S$)',
			width: 370,
			description:
				'Gross monthly salary pertains only to full-time permanently employed graduates. It comprises basic salary, overtime payments, commissions, fixed allowances, and other regular cash payments, before deductions of the employee???s CPF contributions and personal income tax. Employer???s CPF contributions, bonuses, stock options, lump sum payments, and payments-in-kind are excluded.'
		},
		{
			field: 'gross_monthly_salary_75th',
			headerName: 'Gross Monthly Salary - 75th Percentile (S$)',
			width: 370,
			description:
				'Gross monthly salary pertains only to full-time permanently employed graduates. It comprises basic salary, overtime payments, commissions, fixed allowances, and other regular cash payments, before deductions of the employee???s CPF contributions and personal income tax. Employer???s CPF contributions, bonuses, stock options, lump sum payments, and payments-in-kind are excluded.'
		}
	];

	const rows = data_grid.map((item) => {
		return {
			id: item.id,
			year: item.year,
			university: item.university,
			school: item.school,
			degree: item.degree,
			overall_employment_rate: item.overall_employment_rate,
			fulltime_employment_rate: item.fulltime_employment_rate,
			gross_monthly_salary_mean: item.gross_monthly_salary_mean,
			gross_monthly_salary_median: item.gross_monthly_salary_median,
			gross_monthly_salary_25th: item.gross_monthly_salary_25th,
			gross_monthly_salary_75th: item.gross_monthly_salary_75th
		};
	});

	return (
		<Container>
			<Typography component="div">
				<Box fontSize="h5.fontSize" letterSpacing={2} mt={1}>
					Graduate Employment Survey
				</Box>
			</Typography>

			<Grid container spacing={3}>
				<Grid item md={6} xs={12}>
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
				</Grid>
				<Grid item md={6} xs={12}>
					<FormControl className={classes.customFormDegree}>
						<InputLabel htmlFor="grouped-native-select">Degree</InputLabel>
						<Select
							native
							defaultValue=""
							id="grouped-native-select"
							disabled={isSelectDisable}
							onChange={handleChangeDegree}
							autoWidth={true}
						>
							<option aria-label="None" value="" />
							{data_degree.map((optionValue) => (
								<option value={optionValue} key={optionValue}>
									{optionValue}
								</option>
							))}
						</Select>
					</FormControl>
				</Grid>
				{/* <Grid item md={2} xs={12}>
					<Button
						variant="outlined"
						color="primary"
						type="submit"
						className={classes.customButtomSearch}
						startIcon={<RefreshIcon />}
						onClick={resetFormHandler}
					>
						Reset
					</Button>
				</Grid> */}
			</Grid>

			{valueSelectUniversity !== '' && valueSelectDegree !== '' ? (
				<React.Fragment>
					<Chip label={valueSelectUniversity} component="a" clickable className={classes.chipWarning} />

					<Chip label={valueSchool} component="a" clickable className={classes.chipDanger} />

					<Chip label={valueSelectDegree} component="a" clickable className={classes.chipPurple} />

					<Chip
						label={'Data Count: ' + data_grid.length}
						component="a"
						clickable
						className={classes.chipPrimary}
					/>
				</React.Fragment>
			) : null}

			<div className={classes.root}>
				<Box my={1}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={6}>
							<Box my={2}>
								<Typography variant="h7">Overall Employment Rate (%)</Typography>
							</Box>
							<HorizontalBar data={chart_employment_rate_overall} />
						</Grid>
						<Grid item xs={12} md={6}>
							<Box my={2}>
								<Typography variant="h7">Full Time Permanent Employment Rate(%)</Typography>
							</Box>
							<Bar data={chart_employment_rate_ft_perm} />
						</Grid>
					</Grid>
				</Box>
				<Box my={1}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={6}>
							<Box my={2}>
								<Typography variant="h7">Gross Monthly Salary Mean (S$)</Typography>
							</Box>
							<Line data={chart_gross_monthly_mean} />
						</Grid>
						<Grid item xs={12} md={6}>
							<Box my={2}>
								<Typography variant="h7">Gross Monthly Salary Median (S$)</Typography>
							</Box>
							<Line data={chart_gross_monthly_median} />
						</Grid>
					</Grid>
				</Box>

				<Box my={1}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={6}>
							<Box my={2}>
								<Typography variant="h7">Gross Monthly Salary - 25th Percentile (S$)</Typography>
							</Box>
							<Doughnut data={chart_gross_mthly_25_percentile} />
						</Grid>
						<Grid item xs={12} md={6}>
							<Box my={2}>
								<Typography variant="h7">Gross Monthly Salary - 75th Percentile (S$)</Typography>
							</Box>
							<Pie data={chart_gross_mthly_75_percentile} />
						</Grid>
					</Grid>
				</Box>
			</div>

			<div style={{ height: 400, width: '100%', marginTop: '5vh' }}>
				<Box my={2}>
					<Typography variant="h7">Grid Data</Typography>
				</Box>
				<DataGrid rows={rows} columns={columns} pageSize={5} />
			</div>

			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right'
				}}
				open={open}
				autoHideDuration={6000}
				onClose={handleClose}
				message={snackBarMsg}
				action={
					<React.Fragment>
						<Button color="secondary" size="small" onClick={handleClose}>
							OKAY
						</Button>
						<IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
							<CloseIcon fontSize="small" />
						</IconButton>
					</React.Fragment>
				}
			/>
		</Container>
	);
};
export default CustomizedSelects;
