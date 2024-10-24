import { createHashRouter } from 'react-router-dom'
import App from '../App.js';
import { LoginPage } from '../components/LoginPage.js'
import { GuestView } from '../components/GuestView.js';


const router = createHashRouter([
	{
		path: "/",
		element: <App />,

		children: [
			{
				path: "/",
				element: <LoginPage />,
			},
			{
				path: "/guest",
				element: <GuestView />,
			}
		]
	},

]);

export { router }