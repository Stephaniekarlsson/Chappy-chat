import { createHashRouter } from 'react-router-dom'
import App from '../App.js';
import { LoginPage } from '../components/LoginPage.js'


const router = createHashRouter([
	{
		path: "/",
		element: <App />,

		children: [
			{
				path: "/",
				element: <LoginPage />,
			}
		]
	},

]);

export { router }