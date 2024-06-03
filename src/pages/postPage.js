import { readPost } from '../api/index.js';
import notFoundPage from './notFoundPage.js';

async function postPage(params) {
	try {
		const { postId } = params;
		const {
			data: { data, success },
		} = await readPost(postId);

		if (!success) {
			window.alert('목록을 불러올 수 없습니다.');
			return;
		}

		const { post: postData, comments: commentsData } = data;
		const post = `
			<div class='w-full p-5'>
				<img src=${postData.image}  class='h-[380px] w-screen object-cover rounded-lg'/>
				<div class='flex flex-col gap-4 mt-5'>
					<div class='text-xl font-bold'>${postData.title}</div>
					<div class='text-sm text-gray-400'>${postData.createdAt.split('T')[0]}</div>
					<div>${postData.content}</div>
					<div class='flex justify-end gap-2'>
						<a href='/edit/${postId}'>
							<button id='edit-post-button' class='py-1 px-4 text-white bg-emerald-400 rounded-lg' value=${postId}>수정</button>
						</a>
						<button id='delete-post-button' class='py-1 px-4 text-white bg-emerald-400 rounded-lg' value=${postId}>삭제</button>
					</div>
				</div>
			</div>
		`;

		const commentList = commentsData
			.map(
				(commentData) => `
					<li class='py-2 flex justify-between' value=${commentData.commentId}>
						<span class='flex items-center overflow-hidden text-ellipsis w-10/12'>
							${commentData.content}
						</span>
						<button class='py-1 px-4 bg-red-400 text-white rounded-lg' value=${commentData.commentId}>삭제</button>
					</li>
				`,
			)
			.join('');

		const comments = `
			<ul id='comment-list' class=' px-5 flex flex-col gap-2 pb-16'>
				${commentList}
			</ul>
		`;

		const postPageWrapper = (post, comments) => `
			<div class='min-h-screen'>
				${post}
				${comments}
				<form id='add-comment-form' class='max-w-[640px] w-full fixed bottom-[-15px] px-5 bg-white'>
					<div class='flex overflow-hidden rounded-lg'>
						<input id='add-comment-input' class='w-4/5 bg-gray-200 py-2 px-4 outline-none' />
						<button id='delete-post' class='w-1/5 py-1 px-4 text-white bg-emerald-400' type='submit'>댓글</button>
					</div>
				</form>
			</div>
		`;

		const postPageComponent = postPageWrapper(post, comments);

		return postPageComponent;
	} catch (error) {
		return notFoundPage();
	}
}

export default postPage;
