import { ROUTES } from './constant/index.js';
import { editPage, mainPage, postPage, uploadPage, notFoundPage } from './pages/index.js';
import { layout } from './pages/common/index.js';
import { createPost, deleteComment, deletePost, getRandomImage, updatePost } from './api/index.js';

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

	const $deletePostButton = document.querySelector('#delete-post-button');
	// comment
	const $commentList = document.querySelector('#comment-list');
	// upload
	const $uploadForm = document.querySelector('#upload-form');
	const $uploadImage = document.querySelector('#upload-image');
	const $uploadTitleInput = document.querySelector('#upload-title');
	const $uploadContentsTextarea = document.querySelector('#upload-contents');
	const $uploadSubmitButton = document.querySelector('#upload-submit-button');

	// edit
	const $editForm = document.querySelector('#edit-form');
	const $editImage = document.querySelector('#edit-image');
	const $editTitleInput = document.querySelector('#edit-title');
	const $editContentsTextarea = document.querySelector('#edit-contents');

	$headerGoBack?.addEventListener('click', () => {
		history.back(-1);
	});

	$deletePostButton?.addEventListener('click', async (e) => {
		const { value } = e.target;

		const {
			data: { code },
		} = await deletePost(value);
		if (code < 400) {
			window.alert('성공적으로 삭제되었습니다.');
			window.location.href = '/';
			return;
		} else {
			window.alert('게시물 삭제에 실패했습니다..');
		}
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

	$editForm?.addEventListener('submit', async (e) => {
		e.preventDefault();
		const image = $editImage.getAttribute('src');
		const title = $editTitleInput.value;
		const content = $editContentsTextarea.value;

		const {
			data: {
				code,
				data: {
					post: { postId },
				},
			},
		} = await updatePost(params.postId, { image, title, content });
		if (code < 400) {
			window.alert('성공적으로 수정되었습니다');
			window.location.href = `/post/${postId}`;
		} else {
			window.alert('게시물 수정에 실패했습니다.');
		}
	});
};

window.addEventListener('historychange', render);

await render($root);
