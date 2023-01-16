function button(to = '', text = '', type = 'button') {
	return `
    <a href=${to} class=''>
      <button class='w-full h-[67px] rounded-xl text-white bg-emerald-400' type=${type}>
        ${text}
      </button>
    </a>
  `;
}

export default button;
