import { BASE_URL } from './constant/index.js';

const render = (element, htmlString) => {
	const main = document.createElement('main');
	main.innerHTML = htmlString;

	element.appendChild(main);
};

const root = document.getElementById('root');

render(root, 'HelloWorld');
