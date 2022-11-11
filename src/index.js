import React from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { persistor, store } from './store';
import setupInterceptors from './services/setupInterceptors';

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<CookiesProvider>
					<App />
				</CookiesProvider>
			</PersistGate>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root'),
);

// Axios interceptors
setupInterceptors(store);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
