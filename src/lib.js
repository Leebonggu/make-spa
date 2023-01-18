import { ROUTES } from './constant/index.js';
import {
	createComment,
	createPost,
	deleteComment,
	deletePost,
	getRandomImage,
	updatePost,
} from './api/index.js';

const eventHandler = {
	[ROUTES.HOME]: () => {},
	[ROUTES.UPLOAD]: () => {
		const $uploadForm = document.querySelector('#upload-form');
		const $uploadImage = document.querySelector('#upload-image');
		const $uploadTitleInput = document.querySelector('#upload-title');
		const $uploadContentsTextarea = document.querySelector('#upload-contents');
		const $uploadSubmitButton = document.querySelector('#upload-submit-button');

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
	},
	[ROUTES.EDIT]: (params) => {
		const $editForm = document.querySelector('#edit-form');
		const $editImage = document.querySelector('#edit-image');
		const $editTitleInput = document.querySelector('#edit-title');
		const $editContentsTextarea = document.querySelector('#edit-contents');

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
	},
	[ROUTES.POST]: (params) => {
		// delete post
		const $deletePostButton = document.querySelector('#delete-post-button');

		// comment
		const $commentList = document.querySelector('#comment-list');
		const $addCommentForm = document.querySelector('#add-comment-form');
		const $addCommentInput = document.querySelector('#add-comment-input');

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

		$addCommentForm?.addEventListener('submit', async (e) => {
			e.preventDefault();
			const content = $addCommentInput.value;
			const {
				data: {
					code,
					message,
					data: { commentId, content: newContent },
				},
			} = await createComment(params.postId, { content });
			$addCommentInput.value = '';

			if (code < 400) {
				const newComment = document.createElement('li');
				newComment.value = commentId;
				newComment.classList.add('py-2');
				newComment.classList.add('flex');
				newComment.classList.add('justify-between');
				newComment.innerHTML = `
					<span class='flex items-center overflow-hidden text-ellipsis w-10/12'>
						${newContent}
					</span>
					<button class='py-1 px-4 bg-red-400 text-white rounded-lg' value=${commentId}>삭제</button>
				`;
				$commentList.appendChild(newComment);
			} else {
				window.alert(message);
				return;
			}
		});
	},
};

export default eventHandler;
