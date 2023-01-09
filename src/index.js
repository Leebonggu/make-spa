import { mainPage } from './pages/index.js';

const render = async (element, htmlString) => {
	const main = document.createElement('main');
	main.innerHTML = htmlString;

	element.appendChild(main);
};

const root = document.getElementById('root');

(async () => {
	render(root, await mainPage());
})();
