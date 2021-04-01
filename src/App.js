import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Charts from './Components/Charts/Chart/main-chart';

const app = () => {
	return (
		<div className="App">
			<Navbar />
			<Charts />
		</div>
	);
};

export default app;
