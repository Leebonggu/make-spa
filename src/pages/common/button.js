function button(to = '', text = '') {
	return `
    <button class='w-[336px] h-[67px] rounded-xl text-white bg-emerald-400'>
      <a href=${to}>
        ${text}
      </a>
    </button>
  `;
}

export default button;
