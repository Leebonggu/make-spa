import { ROUTES } from './constant/index.js';
import { editPage, mainPage, postPage, uploadPage, notFoundPage } from './pages/index.js';
import { layout } from './pages/common/index.js';
import eventHandler from './lib.js';

const $root = document.getElementById('root');

const routes = [
	{ path: ROUTES.HOME, component: mainPage },
	{ path: ROUTES.UPLOAD, component: uploadPage },
	{ path: ROUTES.EDIT, component: editPage },
	{ path: ROUTES.POST, component: postPage },
];

const render = async (element) => {
	const params = {};

	const { path, component } = routes.find((route) => {
		const targetPath = route.path.split('/').slice(1);
		const currentPath = window.location.pathname.split('/').slice(1);
		if (targetPath.at(0) === currentPath.at(0) && targetPath.length === currentPath.length) {
			if (targetPath.length > 1 && currentPath.length > 1) {
				targetPath.slice(1).forEach((key, index) => {
					const parsedKey = key.replace(':', '');
					params[parsedKey] = currentPath[index + 1];
				});
			}
			return true;
		}
	});

	const contents = component ? await component(params) : await notFoundPage();
	const layoutComponent = layout(contents);

	element.innerHTML = layoutComponent;

	const $headerGoBack = document.getElementById('header-back');
	$headerGoBack?.addEventListener('click', () => {
		history.back(-1);
	});

	if (eventHandler[path]) {
		eventHandler[path](params);
	}
};

window.addEventListener('historychange', render);

await render($root);
