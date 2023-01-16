import { ROUTES } from './constant/index.js';
import { editPage, mainPage, postPage, uploadPage, notFoundPage } from './pages/index.js';
import { layout } from './pages/common/index.js';
import { deleteComment, deletePost } from './api/index.js';

const $root = document.getElementById('root');

// const checkRouter = () => {};
// function createRotuer() {
// 	const params = {};
// 	const router = {};
// 	const routes = [];

// 	router.addRoutes = (path, page) => {
// 		const alreadyAddedPath = routes.find((route) => route.path === path);
// 		if (alreadyAddedPath) return;

// 		routes.push({
// 			path,
// 			page,
// 		});

// 		return router;
// 	};

// 	router.render = () => {
// 		return router;
// 	};
// }

const routes = [
	{ path: ROUTES.HOME, component: mainPage },
	{ path: ROUTES.UPLOAD, component: uploadPage },
	{ path: ROUTES.EDIT, component: editPage },
	{ path: ROUTES.POST, component: postPage },
];

const render = async (element) => {
	const $div = document.createElement('div');

	const component = routes.find((route) => {
		return route.path === window.location.pathname;
	})?.component;

	const contents = component ? await component() : await notFoundPage();
	const layoutComponent = layout(contents);

	$div.innerHTML = `
			${layoutComponent}
		`;

	element.appendChild($div);
	// document.getElementById('header-back')?.addEventListener('click', () => {
	// 	history.back(-1);
	// });

	// document.getElementById('delete-post')?.addEventListener('click', () => {
	// 	console.log('delete');
	// });
	const $headerGoBack = document.getElementById('header-back');
	const $editPost = document.querySelector('#edit-post');
	const $deletePost = document.querySelector('#delete-post');
	const $commentList = document.querySelector('#comment-list');

	$headerGoBack?.addEventListener('click', () => {
		history.back(-1);
	});

	$editPost?.addEventListener('click', (e) => {
		const { value } = e.target;
		console.log(e.target.value);
		console.log('edit');
	});

	$deletePost?.addEventListener('click', async (e) => {
		const { value } = e.target;

		const {
			data: { code },
		} = await deletePost(value);

		// history.pushState(null, null, '/');
		window.location.href = '/';

		console.log('edit');
	});

	$commentList?.addEventListener('click', async (e) => {
		const { value } = e.target;

		await deleteComment(value);
		const leftComments = Array.from($commentList.children)
			.filter((li) => li.getAttribute('value') !== value)
			.map((liObj) => liObj.outerHTML)
			.join('');

		$commentList.innerHTML = leftComments;
	});
};

window.addEventListener('historychange', render);
window.addEventListener('popstate', render);

await render($root);
