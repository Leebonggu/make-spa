function button(to = '', text = '', type = 'button') {
	return `
    <a href=${to} class=''>
      <button class='w-full py-3 rounded-lg text-white bg-emerald-400' type=${type}>
        ${text}
      </button>
    </a>
  `;
}

export default button;
