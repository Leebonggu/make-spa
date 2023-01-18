import { button } from './index.js';

function header() {
	const { pathname } = window.location;
	const buttonComponent = button('/upload', '새 글 작성하기');

	return `
    <header id="navigation" class="max-w-[640px] w-full h-[60px] fixed top-0">
      <div class='flex h-full bg-white items-center justify-between'>
        <div id='header-back'>
          ${
						pathname !== '/'
							? `
                <div class='flex justify-center items-center cursor-pointer'>
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 55 55"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M31.1566 43.5416C30.82 43.5428 30.4875 43.4672 30.1834 43.3205C29.8793 43.1738 29.6114 42.9596 29.3994 42.6937L18.5182 28.9437C18.1869 28.5336 18.0057 28.0193 18.0057 27.4885C18.0057 26.9577 18.1869 26.4433 18.5182 26.0333L29.7824 12.2833C30.1647 11.8153 30.7142 11.521 31.3099 11.4651C31.9056 11.4092 32.4988 11.5964 32.9588 11.9854C33.4189 12.3744 33.7082 12.9333 33.7631 13.5393C33.8181 14.1453 33.6341 14.7486 33.2517 15.2166L23.1816 27.4999L32.9138 39.7833C33.1893 40.1197 33.3643 40.5293 33.418 40.9637C33.4718 41.398 33.4022 41.839 33.2173 42.2344C33.0325 42.6298 32.7402 42.963 32.3749 43.1947C32.0097 43.4263 31.5869 43.5467 31.1566 43.5416Z"
                      fill="#231F20"
                    />
                  </svg>
                </div>
              `
							: ''
					}
        </div>
        <div class='text-2xl'>
          <a href='/'>HAPPY 2023</a>
        </div>
      </div>
      ${
				pathname === '/'
					? `<div class='w-full mb-8'>
        ${buttonComponent}
      </div>`
					: ''
			}
    </header>
  `;
}

export default header;
