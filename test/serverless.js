'use strict';
module.exports = {
	"service": "TEST_" + require('../package.json').name,
	"provider": {
		"name": "aws",
		"runtime": "nodejs8.10"
	},
	"plugins": ["serverless-respat"],
	"custom": {
		"serverless-respat": {
			prefix: "${self:service}",
			patterns: [
				{
					pattern: require("../index"),
					config: {
						"bucket_name": 'TheBucketName',
						"ses_ruleset_name": "TheRulesetName",
						"email_recipients": ["email@domain"],
						"lambda_function_name": "TheLambdaFunctionName"
					}
				}
			]
		}
	}
}
