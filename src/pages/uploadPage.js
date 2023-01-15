async function uploadPage() {
	console.log('uploadPage');
	const buttonComponent = button('/upload', '새 글 작성하기');

	return `
		<div>
			<div class='w-full flex justify-center mt-[20px] mb-8'>
				${buttonComponent}
			</div>
		</div>
	`;
}

export default uploadPage;
