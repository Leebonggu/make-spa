import header from './header.js';

function layout(children) {
	const headerComponent = header();
	return `
    <main class='min-w-[480px] max-w-[720px] h-screen mx-auto'> 
      ${headerComponent}
      <div>
        ${children}
      </div>
    </main>
  `;
}

export default layout;
