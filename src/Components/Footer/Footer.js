import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import GitHubIcon from '@material-ui/icons/GitHub';
import CallMade from '@material-ui/icons/CallMade';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
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
	}
}));

export default function ButtonAppBar() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position="sticky" color="dark">
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
			</AppBar>
		</div>
	);
}
