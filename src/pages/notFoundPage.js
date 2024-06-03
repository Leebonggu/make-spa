async function notFoundPage() {
	setTimeout(() => {
		window.location.href = '/';
	}, 5000);
	return `
		<div class='w-screen h-screen flex justify-center items-center max-w-[640px] flex-col'>
			<div>페이지가 없습니다.</div>
			<div>5초 후 메인으로 돌아갑니다.</div>
		</div>
	`;
}

export default notFoundPage;
