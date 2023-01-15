import { ROUTES } from './constant/index.js';
import { editPage, mainPage, postPage, uploadPage, notFoundPage } from './pages/index.js';
import { layout } from './pages/common/index.js';

const root = document.getElementById('root');

const checkRouter = () => {};
function createRotuer() {
	const params = {};
	const router = {};
	const routes = [];

	router.addRoutes = (path, page) => {
		const alreadyAddedPath = routes.find((route) => route.path === path);
		if (alreadyAddedPath) return;

		routes.push({
			path,
			page,
		});

		return router;
	};

	router.render = () => {
		return router;
	};
}

const routes = [
	{ path: ROUTES.HOME, component: mainPage },
	{ path: ROUTES.UPLOAD, component: uploadPage },
	{ path: ROUTES.EDIT, component: editPage },
	{ path: ROUTES.POST, component: postPage },
];

const render = async (element) => {
	const div = document.createElement('div');
	/**
	 * 2안: hash router
	 * const hash = window.location.hash.replace('#', '');
	 */
	const component = routes.find((route) => {
		return route.path === window.location.pathname;
	})?.component;

	const contents = component ? await component() : await notFoundPage();
	const layoutComponent = layout(contents);

	div.innerHTML = `
			${layoutComponent}
		`;

	element.appendChild(div);
};

window.addEventListener('historychange', render);

await render(root);
