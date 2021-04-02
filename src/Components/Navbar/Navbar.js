import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import MailIcon from '@material-ui/icons/Mail';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		// marginRight: theme.spacing(1)
	},
	title: {
		flexGrow: 1
	},
	hamburgerIcon: {
		marginLeft: '-2rem'
	},
	linkedInIcon: {
		transform: ' scale(1.20)',
		marginTop: '0.2vh'
	},
	mailIcon: {
		transform: ' scale(1.20)',
		marginTop: '0.2vh'
	},
	appBar: {
		marginBottom: '10rem'
	}
}));

export default function ButtonAppBar() {
	const classes = useStyles();

	const [ state, setState ] = React.useState(false);

	const toggleDrawer = (open) => (event) => {
		setState(open);
	};

	return (
		<div className={classes.root}>
			<AppBar position="sticky">
				<Container>
					<Toolbar>
						<IconButton
							edge="start"
							className={(classes.menuButton, classes.hamburgerIcon)}
							color="inherit"
							aria-label="menu"
							onClick={toggleDrawer(true)}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							Graduate Employment Survey
						</Typography>
						<IconButton
							className={(classes.menuButton, classes.linkedInIcon)}
							color="inherit"
							href="https://www.linkedin.com/in/tjandra-putra/"
							target="_blank"
						>
							<LinkedInIcon />
						</IconButton>
						<IconButton
							className={classes.menuButton}
							color="inherit"
							href="https://github.com/Tjandra-Putra"
							target="_blank"
						>
							<GitHubIcon />
						</IconButton>
						<IconButton
							className={(classes.menuButton, classes.mailIcon)}
							color="inherit"
							href="https://github.com/Tjandra-Putra"
							target="_blank"
						>
							<MailIcon />
						</IconButton>
					</Toolbar>
				</Container>
				<Drawer />
			</AppBar>
			<Drawer anchor={'top'} open={state} onClose={toggleDrawer(false)}>
				<Container>
					<List component="nav" className={classes.root} aria-label="mailbox folders">
						<ListItem button>
							<ListItemText>
								<Typography variant="h6">Objective: </Typography>
								<Typography>
									The purpose of this project is to provide students from any level of institution a
									clear and informative visualisation of the trends and analytics of "Graduate
									Employment Survey" from the 5 Local University in Singapore - NTU, NUS, SIT, SMU,
									SUSS & SUTD.
								</Typography>
							</ListItemText>
						</ListItem>

						<ListItem button>
							<ListItemText>
								<Typography variant="h6">Project: </Typography>
								<Typography>
									This project was created using React.js, Chart.js, Axios & API
									(https://data.gov.sg/)
								</Typography>
							</ListItemText>
						</ListItem>
						<ListItem button>
							<ListItemText>
								<Typography variant="h6">About: </Typography>
								<Typography>
									Find out more about me! :D
									<br />
									<a href="https://tjandra-putra.github.io/" target="_blank">
										https://tjandra-putra.github.io/
									</a>
								</Typography>
							</ListItemText>
						</ListItem>
					</List>
				</Container>
			</Drawer>
		</div>
	);
}
