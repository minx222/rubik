module.exports = {
	printWidth: 60,
	// 缩进空格数
	tabWidth: 2,
	// 不加分号
	semi: true,
	// 使用单引号
	singleQuote: true,
	// 箭头函数，只有一个参数的时候，也需要括号
	arrowParens: 'always',
	//
	endOfLine: 'auto',
	trailingComma: 'none',
	htmlWhitespaceSensitivity: 'ignore', // 忽略'>'下落问题
	plugins: ['prettier-plugin-tailwindcss'],
	tailwindFunctions: ['clsx']
};
