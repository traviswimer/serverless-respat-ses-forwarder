const emailBucket = require('./emailBucket');

describe('emailBucket()', () => {
	test('generates bucket', () => {
		expect(emailBucket({
			prefix: "ThePrefix",
			pattern_name: "ThePatternName",
			bucket_name: "TheBucketName"
		})).toMatchSnapshot();
	});
});
