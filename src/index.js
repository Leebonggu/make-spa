import { ROUTES } from './constant/index.js';
import { editPage, mainPage, postPage, uploadPage, notFoundPage } from './pages/index.js';
import { layout } from './pages/common/index.js';
import { createPost, deleteComment, deletePost, getRandomImage } from './api/index.js';

const $root = document.getElementById('root');

const routes = [
	{ path: ROUTES.HOME, component: mainPage },
	{ path: ROUTES.UPLOAD, component: uploadPage },
	{ path: ROUTES.EDIT, component: editPage },
	{ path: ROUTES.POST, component: postPage },
];

const render = async (element) => {
	const $div = document.createElement('div');
	const params = {};

	const component = routes.find((route) => {
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
	})?.component;

	const contents = component ? await component(params) : await notFoundPage();
	const layoutComponent = layout(contents);

	$div.innerHTML = `
			${layoutComponent}
		`;

	element.appendChild($div);

	const $headerGoBack = document.getElementById('header-back');
	const $editPost = document.querySelector('#edit-post');
	const $deletePost = document.querySelector('#delete-post');
	const $commentList = document.querySelector('#comment-list');
	const $uploadForm = document.querySelector('#upload-form');
	const $uploadImage = document.querySelector('#upload-image');
	const $uploadTitleInput = document.querySelector('#upload-title');
	const $uploadContentsTextarea = document.querySelector('#upload-contents');
	const $uploadSubmitButton = document.querySelector('#upload-submit-button');

	$headerGoBack?.addEventListener('click', () => {
		history.back(-1);
	});

	$editPost?.addEventListener('click', (e) => {
		const { value } = e.target;
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

	$uploadImage?.addEventListener('click', async (e) => {
		e.preventDefault();
		console.log('hello');
		const {
			data: { urls },
		} = await getRandomImage();

		$uploadImage.value = urls.regular;
		$uploadImage.disabled = true;
		$uploadImage.classList.add('disabled');
		$uploadImage.classList.remove('bg-emerald-400');
		$uploadImage.classList.add('bg-gray-400');
		$uploadImage.classList.add('text-white');
	});

	$uploadForm?.addEventListener('change', () => {
		if (
			$uploadImage.value.length > 0 &&
			$uploadTitleInput.value.length > 0 &&
			$uploadContentsTextarea.value.length > 0
		) {
			console.log($uploadSubmitButton);
			$uploadSubmitButton.disabled = false;
			$uploadSubmitButton.classList.remove('bg-gray-400');
			$uploadSubmitButton.classList.add('bg-emerald-400');
		} else {
			$uploadSubmitButton.disabled = true;
			$uploadSubmitButton.classList.remove('bg-emerald-400');
			$uploadSubmitButton.classList.add('bg-gray-400');
		}
	});

	$uploadForm?.addEventListener('submit', async (e) => {
		e.preventDefault();
		const image = $uploadImage.value;
		const title = $uploadTitleInput.value;
		const content = $uploadContentsTextarea.value;

		await createPost({ image, title, content });
		window.location.href = '/';
	});
};

window.addEventListener('historychange', render);
window.addEventListener('popstate', render);

await render($root);
