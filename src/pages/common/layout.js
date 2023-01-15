import header from './header.js';

function layout(children) {
	const headerComponent = header();
	return `
    <main class='w-[360px] h-[750px] mx-auto'> 
      ${headerComponent}
      ${children}
    </main>
  `;
}

export default layout;
