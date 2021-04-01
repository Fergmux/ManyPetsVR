module.exports = {
	extends: ['@boughtbymany/eslint-config-bbm/vue'],
	overrides: [
		{
			files: [
				'**/*.spec.js'
			],
			extends: ['@boughtbymany/eslint-config-bbm/jest'],
		}
	],
	rules: {
		'vue-a11y/label-has-for': [ 2, {
			required: {
				some: [ 'nesting', 'id' ]
			}
		}]
	}
}
