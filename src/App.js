import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Routers from './routes/Routers';
import Notification from './components/Notification/Notification';

function App() {
	const { visible, message, type } = useSelector(
		(state) => state.notification.notification,
	);
	return (
		<div className="App">
			<Notification visible={visible} message={message} type={type} />
			<Routers />
		</div>
	);
}
export default App;
