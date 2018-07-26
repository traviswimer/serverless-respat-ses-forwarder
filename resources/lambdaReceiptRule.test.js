const lambdaReceiptRule = require('./lambdaReceiptRule');

describe('lambdaReceiptRule()', () => {
	test('generates role', () => {
		expect(lambdaReceiptRule({
			prefix: "ThePrefix",
			pattern_name: "ThePatternName",
			lambda_function_name: "TheLambdaName",
			email_recipients: ["email@domain"],
			ses_ruleset_name: "TheRulesetName"
		})).toMatchSnapshot();
	});
});
