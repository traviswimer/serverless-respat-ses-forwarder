const bucketReceiptRule = require('./bucketReceiptRule');

describe('bucketReceiptRule()', () => {
	test('generates receipt rule', () => {
		expect(bucketReceiptRule({
			prefix: "ThePrefix",
			pattern_name: "ThePatternName",
			email_recipients: ["some_email@domain"],
			bucket_name: "TheBucketName",
			ses_ruleset_name: "TheRulesetName"
		})).toMatchSnapshot();
	});
});
