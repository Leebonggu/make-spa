import { ROUTES } from './constant/index.js';
import { editPage, mainPage, postPage, uploadPage } from './pages/index.js';

const root = document.getElementById('root');

const routes = [
	{ path: ROUTES.HOME, component: mainPage },
	{ path: ROUTES.UPLOAD, component: uploadPage },
	{ path: ROUTES.EDIT(), component: editPage },
	{ path: ROUTES.POST(), component: postPage },
];

const render = async (element) => {
	const main = document.createElement('main');
	/**
	 * 2안: hash router
	 * const hash = window.location.hash.replace('#', '');
	 */
	const component = routes.find((route) => {
		return route.path === window.location.pathname;
	})?.component;

	const contents = await component();

	main.innerHTML = `
			<nav id="navigation">
				<a href='/'>Home</a>
				<a href='/upload'>Upload</a>
				<a href='/post'>Write</a>
				<a href='/edit'>Edit</a>
			</nav>
			${contents}
		`;

	element.appendChild(main);
};

window.addEventListener('hashchange', render);

await render(root);
