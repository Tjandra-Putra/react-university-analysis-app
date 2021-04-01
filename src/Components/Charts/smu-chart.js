import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
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
	}
}));

const CustomizedSelects = () => {
	const classes = useStyles();

	const [ data_year, set_year ] = useState([]);
	const [ data_employment_rate_overall, set_employment_rate_overall ] = useState([]);
	const [ data_employment_rate_ft_perm, set_employment_rate_ft_perm ] = useState([]);
	const [ data_gross_monthly_mean, set_gross_monthly_mean ] = useState([]);
	const [ data_gross_monthly_median, set_gross_monthly_median ] = useState([]);

	useEffect(() => {
		Axios.get(
			'https://data.gov.sg/api/action/datastore_search?resource_id=9326ca53-9153-4a9c-b93f-8ae032637b70&limit=1000'
		).then((response) => {
			// console.log(response.data.result.records[0].university);
			console.log(response.data.result.records);

			let fetchedDataEmploymentRateOverall = [];
			let fetchedDataFullTimeEmploymentRate = [];
			let fetchedDataYears = [];
			let fetchedDataGrossMonthlyMean = [];
			let fetchedDataGrossMonthlyMedian = [];

			response.data.result.records.map((item) => {
				// Getting the years unique - All years
				// fetchedDataYears.push(item.year);

				if (
					item.university === 'Singapore Management University' &&
					(item.degree === 'Information Systems Management' ||
						item.degree === 'Information Systems Management (4-years programme)' ||
						'Information Systems Management (4-years programme) Cum Laude and above')
				) {
					fetchedDataYears.push(item.year);
					fetchedDataEmploymentRateOverall.push(item.employment_rate_overall);
					fetchedDataFullTimeEmploymentRate.push(item.employment_rate_ft_perm);
					fetchedDataGrossMonthlyMean.push(item.gross_monthly_mean);
					fetchedDataGrossMonthlyMedian.push(item.gross_monthly_median);
					console.log(item.year, item.gross_monthly_median);
				}
			});

			let fetchedDataYearsUnique = [ ...new Set(fetchedDataYears) ];

			set_employment_rate_overall(fetchedDataEmploymentRateOverall);
			set_employment_rate_ft_perm(fetchedDataFullTimeEmploymentRate);
			set_year(fetchedDataYearsUnique);
			set_gross_monthly_mean(fetchedDataGrossMonthlyMean);
			set_gross_monthly_median(fetchedDataGrossMonthlyMedian);
		});
	}, []);

	let smu_is_overall_employment_rate = {
		labels: data_year, // Array of Strings Unqiue Value
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

	let smu_is_fulltime_permanent_employment_rate = {
		labels: data_year, // Array of Strings Unqiue Value
		datasets: [
			{
				label: 'Full-Time Permanent Employment Rate (%)',
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

	let smu_is_gross_montly_mean = {
		labels: data_year, // Array of Strings Unqiue Value
		datasets: [
			{
				label: 'Basic Monthly Salary - Mean (S$)',
				data: data_gross_monthly_mean, // Array of Objects
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)'
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)'
				],
				borderWidth: 1
			}
		]
	};

	let smu_is_gross_monthly_median = {
		labels: data_year, // Array of Strings Unqiue Value
		datasets: [
			{
				label: 'Basic Monthly Salary - Median (S$)',
				data: data_gross_monthly_median, // Array of Objects
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)'
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)'
				],
				borderWidth: 1
			}
		]
	};

	return (
		<Container>
			<Box mt={2}>
				<Typography variant="h4" color="secondary">
					Singapore Management University (SMU) | Information System
				</Typography>
			</Box>
			<div className={classes.root}>
				<Box my={1}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={6}>
							<Box my={2}>
								<Typography variant="h7">Overall Employment Rate (%)</Typography>
							</Box>
							<Bar data={smu_is_overall_employment_rate} />
						</Grid>
						<Grid item xs={12} md={6}>
							<Box my={2}>
								<Typography variant="h7">Full-Time Permanent Employment Rate (%)</Typography>
							</Box>
							<Bar data={smu_is_fulltime_permanent_employment_rate} />
						</Grid>
					</Grid>
				</Box>

				<Box my={1}>
					<Grid container spacing={3}>
						<Grid item xs={12} md={6}>
							<Box my={2}>
								<Typography variant="h7">Basic Monthly Salary - Mean (S$)</Typography>
							</Box>
							<Line data={smu_is_gross_montly_mean} />
						</Grid>
						<Grid item xs={12} md={6}>
							<Box my={2}>
								<Typography variant="h7">Basic Monthly Salary - Median (S$)</Typography>
							</Box>
							<Line data={smu_is_gross_monthly_median} />
						</Grid>
					</Grid>
				</Box>
			</div>
		</Container>
	);
};
export default CustomizedSelects;
