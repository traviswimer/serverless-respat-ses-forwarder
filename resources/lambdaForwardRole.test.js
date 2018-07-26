const lambdaForwardRole = require('./lambdaForwardRole');

describe('lambdaForwardRole()', () => {
	test('generates role', () => {
		expect(lambdaForwardRole({
			prefix: "ThePrefix",
			pattern_name: "ThePatternName",
			bucket_name: "TheBucketName",
			bucket_path: "TheBucketPath"
		})).toMatchSnapshot();
	});
});
