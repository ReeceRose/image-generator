module.exports = {
  root: true,
  extends: [require.resolve('@image-generator/config/eslint/web.js')],
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: './tsconfig.json'
	},
};
