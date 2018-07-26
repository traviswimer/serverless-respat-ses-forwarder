const bucketPolicy = require('./bucketPolicy');

describe('bucketPolicy()', () => {
	test('generates policy', () => {
		expect(bucketPolicy({prefix: "ThePrefix", pattern_name: "ThePatternName"})).toMatchSnapshot();
	});
});
