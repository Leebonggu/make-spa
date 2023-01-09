import { BASE_URL } from './constant/index.js';
import { postPage } from './pages/main.js';

const render = (element, htmlString) => {
	const main = document.createElement('main');
	main.innerHTML = htmlString;

	element.appendChild(main);
	console.log(postPage());
};

const root = document.getElementById('root');

render(root, 'HelloWorld');
