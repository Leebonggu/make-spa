function button(to = '', text = '') {
	return `
  <a href=${to} class=''>
    <button  class='w-full h-[67px] rounded-xl text-white bg-emerald-400'>
      ${text}
    </button>
  </a>
  `;
}

export default button;
