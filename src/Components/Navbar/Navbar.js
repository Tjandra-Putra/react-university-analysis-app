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

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1
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
			<AppBar position="sticky" color="primary">
				<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
						onClick={toggleDrawer(true)}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						Graduate Employment Survey
					</Typography>
					<IconButton className={classes.menuButton} color="inherit">
						<GitHubIcon />
					</IconButton>
				</Toolbar>
				<Drawer />
			</AppBar>
			<Drawer anchor={'top'} open={state} onClose={toggleDrawer(false)}>
				<Container>
					<p>Test Message </p>
				</Container>
			</Drawer>
		</div>
	);
}
