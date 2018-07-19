const getLambdaForwardRole = require('./resources/getLambdaForwardRole');
const lambdaSesPermission = require('./resources/lambdaSesPermission');
const bucketReceiptRule = require('./resources/bucketReceiptRule');
const lambdaReceiptRule = require('./resources/lambdaReceiptRule');
const emailBucket = require('./resources/emailBucket');
const bucketPolicy = require('./resources/bucketPolicy');

module.exports = function serverlessRespatSesForwarder({config, serverless}) {
	let {
		prefix,
		pattern_name = "SesForwarder",
		bucket_path = '/',
		bucket_name,
		ses_ruleset_name,
		email_recipients,
		lambda_function_name
	} = config;

	let resources = {
		[`${pattern_name}LambdaForwardRole`]: getLambdaForwardRole({prefix, pattern_name, bucket_path, bucket_name}),
		[`${pattern_name}LambdaSesPermission`]: lambdaSesPermission({prefix, lambda_function_name}),
		[`${pattern_name}BucketReceiptRule`]: bucketReceiptRule({prefix, pattern_name, email_recipients, bucket_name, ses_ruleset_name}),
		[`${pattern_name}LambdaReceiptRule`]: lambdaReceiptRule({prefix, pattern_name, lambda_function_name, email_recipients, ses_ruleset_name}),
		[`${pattern_name}EmailBucket`]: emailBucket({prefix, pattern_name, bucket_name}),
		[`${pattern_name}EmailBucketPolicy`]: bucketPolicy({prefix, pattern_name})
	};

	return {
		resources
	};
};
