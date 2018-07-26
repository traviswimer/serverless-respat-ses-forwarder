const lambdaSesPermission = require('./lambdaSesPermission');

describe('lambdaSesPermission()', () => {
	test('generates permission', () => {
		expect(lambdaSesPermission({
			prefix: "ThePrefix",
			pattern_name: "ThePatternName",
			lambda_function_name: "TheLambdaName"
		})).toMatchSnapshot();
	});
});
