import header from './header.js';

function layout(children) {
	const headerComponent = header();
	return `
    <main class='min-w-[480px] max-w-[640px] h-screen mx-auto'> 
      ${headerComponent}
      <div class='pt-[65px]' >
        ${children}
      </div>
    </main>
  `;
}

export default layout;
