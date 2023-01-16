import { button } from './index.js';

function header() {
	const { pathname } = window.location;
	const buttonComponent = button('/upload', '새 글 작성하기');

	return `
    <nav id="navigation" class="fixed max-w-[720px] w-full h-[60px]">
      <div class='flex h-full bg-white items-center justify-between'>
        <div id='header-back'>
          ${pathname !== '/' ? 'back' : ''}
        </div>
        <div class='text-2xl'>
          <a href='/'>HAPPY 2023</a>
        </div>
      </div
      ${
				pathname === '/'
					? `<div class='w-full mb-8'>
        ${buttonComponent}
      </div> `
					: ''
			}

    </nav>
  `;
}

export default header;
