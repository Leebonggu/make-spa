import { ROUTES } from './constant/index.js';
import { editPage, mainPage, postPage, uploadPage } from './pages/index.js';

const root = document.getElementById('root');

const routes = [
	{ path: ROUTES.HOME, component: mainPage },
	{ path: ROUTES.UPLOAD, component: uploadPage },
	{ path: ROUTES.EDIT(1), component: editPage },
	{ path: ROUTES.POST(1), component: postPage },
];

const render = async (element) => {
	const main = document.createElement('main');
	// const hash = window.location.hash.replace('#', '');
	const component = routes.find((route) => {
		return route.path === window.location.pathname;
	})?.component;

	main.innerHTML = `
		<nav id="navigation">
			<a href='/'>Home</a>
			<a href='/upload'>Upload</a>
			<a href='/post/1'>Write</a>
			<a href='/edit/1'>Edit</a>
		</nav>
		${await component()}
	`;

	element.appendChild(main);
};

window.addEventListener('hashchange', render);

await render(root);
