import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Charts from './Components/Charts/Chart/main-chart';
import Footer from './Components/Footer/Footer';

const app = () => {
	return (
		<div className="App">
			<Navbar />
			<Charts />
			<Footer />
		</div>
	);
};

export default app;
