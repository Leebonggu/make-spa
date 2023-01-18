import { readPost } from '../api/index.js';

async function editPage(params) {
	const { postId } = params;
	const {
		data: {
			data: { post: editData },
			code,
		},
	} = await readPost(postId);

	if (code >= 400) {
		window.alert('목록을 불러올 수 없습니다.');
		return;
	}

	const edit = `
		<form id='edit-form' class='flex flex-col px-2'>
			<img id='edit-image' src=${editData.image} class='h-[380px] w-screen object-cover rounded-lg mb-10' />
			<label class='font-bold'>제목</label>
			<input id='edit-title' class='outline-none p-3 my-3 border-[1px] mb-5 rounded-lg'  placeholder='글 제목을 입력해 주세요' type='text' value=${editData.title} />
			<label class='font-bold'>내용</label>
			<textarea id='edit-contents' rows='10' class='outline-none p-3 border-[1px] my-3 resize-none rounded-lg' placeholder='글 내용을 입력해 주세요' type='text' value=''>${editData.content}</textarea>
			<button id='edit-submit-button' class='w-full py-3 rounded-lg text-white bg-emerald-400' type='submit'>
				새 글 작성하기
			</button>
		</form>
`;

	return `<div>${edit}</div>`;
}

export default editPage;
