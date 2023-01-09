import { mainPage } from './pages/index.js';

const render = (element, htmlString) => {
	const main = document.createElement('main');
	main.innerHTML = htmlString;

	element.appendChild(main);
	console.log(mainPage);
};

const root = document.getElementById('root');

render(root, 'HelloWorld');
