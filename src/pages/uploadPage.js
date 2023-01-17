async function uploadPage() {
	return `
		<form id='upload-form' class='flex flex-col px-2'>
			<button id='upload-image' class='bg-emerald-400 rounded-lg py-3 my-3 text-white'>GET IMAGE</button>
			<label class='font-bold'>제목</label>
			<input id='upload-title' class='outline-none p-3 my-3 border-[1px] mb-5 rounded-lg'  placeholder='글 제목을 입력해 주세요' type='text' value='' />
			<label class='font-bold'>내용</label>
			<textarea id='upload-contents' rows='10' class='outline-none p-3 border-[1px] my-3 resize-none rounded-lg' placeholder='글 내용을 입력해 주세요' type='text' value='' ></textarea>
			<button id='upload-submit-button' class='w-full py-3 rounded-lg text-white bg-gray-400' type='submit' disabled=true>
				새 글 작성하기
			</button>
		</form>
	`;
}

export default uploadPage;
