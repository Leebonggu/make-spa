import button from './common/button.js';

async function uploadPage() {
	console.log('uploadPage');
	const buttonComponent = button('/upload', '새 글 작성하기');

	return `
		<div>
			${buttonComponent}
		</div>
	`;
}

export default uploadPage;
