import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CallMade from '@material-ui/icons/CallMade';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginTop: '8vh',
		backgroundColor: '#272c34',
		color: 'white'
	},
	menuButton: {
		marginRight: theme.spacing(1)
	},
	title: {
		flexGrow: 1
	},
	hamburgerIcon: {
		marginLeft: '-2rem'
	},
	toolBar: {
		backgroundColor: '#272c34'
	},
	textWhite: {
		color: 'white',
		textTransform: 'unset'
	},
	bgWhite: {
		color: 'white'
	},
	callBackIcon: {
		transform: ' scale(0.7)',
		textAlign: 'right'
	},
	footerLink: {
		paddingTop: '3.5vh',
		paddingBottom: '3.5vh',

		color: 'white',
		textTransform: 'unset'
	}
}));

export default function ButtonAppBar() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			{/* <AppBar position="sticky" color="dark">
				<Toolbar className={classes.toolBar}>
					<Button className={classes.textWhite} href="https://github.com/Tjandra-Putra" target="_blank">
						Github
					</Button>
					<Button className={classes.textWhite} href="https://github.com/Tjandra-Putra" target="_blank">
						LinkedIn
					</Button>
					<Button className={classes.textWhite} href="https://github.com/Tjandra-Putra" target="_blank">
						Mail
					</Button>

					<Button
						className={classes.textWhite}
						href="https://data.gov.sg/dataset/graduate-employment-survey-ntu-nus-sit-smu-suss-sutd?view_id=99958a50-6788-4155-bb45-dc0043023cd5&resource_id=9326ca53-9153-4a9c-b93f-8ae032637b70"
						target="_blank"
					>
						API
						<IconButton
							className={(classes.menuButton, classes.bgWhite, classes.callBackIcon)}
							color="inherit"
						>
							<CallMade />
						</IconButton>
					</Button>
				</Toolbar>
			</AppBar> */}

			{/* <AppBar position="sticky" color="dark">
				<Toolbar className={classes.toolBar}>
					<Button className={classes.textWhite} href="https://github.com/Tjandra-Putra" target="_blank">
						Github
					</Button>
					<Button className={classes.textWhite} href="https://github.com/Tjandra-Putra" target="_blank">
						LinkedIn
					</Button>
					<Button className={classes.textWhite} href="https://github.com/Tjandra-Putra" target="_blank">
						Mail
					</Button>

					<Button
						className={classes.textWhite}
						href="https://data.gov.sg/dataset/graduate-employment-survey-ntu-nus-sit-smu-suss-sutd?view_id=99958a50-6788-4155-bb45-dc0043023cd5&resource_id=9326ca53-9153-4a9c-b93f-8ae032637b70"
						target="_blank"
					>
						API
						<IconButton
							className={(classes.menuButton, classes.bgWhite, classes.callBackIcon)}
							color="inherit"
						>
							<CallMade />
						</IconButton>
					</Button>
				</Toolbar>
			</AppBar> */}
			<Container>
				<Box display="flex">
					<Box>
						<Button href="https://github.com/Tjandra-Putra" target="_blank" className={classes.footerLink}>
							Github
						</Button>
					</Box>
					<Box>
						<Button
							className={classes.footerLink}
							href="https://www.linkedin.com/in/tjandra-putra/"
							target="_blank"
						>
							LinkedIn
						</Button>
					</Box>
					<Box flexGrow={1}>
						<Button
							className={classes.footerLink}
							href="mailto:tjandraputra2000@gmailz.com"
							target="_blank"
						>
							Mail
						</Button>
					</Box>
					<Box>
						<Button
							className={classes.footerLink}
							href="https://data.gov.sg/dataset/graduate-employment-survey-ntu-nus-sit-smu-suss-sutd?view_id=99958a50-6788-4155-bb45-dc0043023cd5&resource_id=9326ca53-9153-4a9c-b93f-8ae032637b70"
							target="_blank"
						>
							API<IconButton
								className={classes.bgWhite}
								color="inherit"
								style={{
									transform: ' scale(0.7)',
									padding: 'unset'
								}}
							>
								<CallMade />
							</IconButton>
						</Button>
					</Box>
				</Box>
			</Container>
		</div>
	);
}
