module.exports = {
	name: "SesForwarder",
	default_config: {
		bucket_path: '/'
	},
	required_props: [
		"bucket_name",
		"ses_ruleset_name",
		"email_recipients",
		"lambda_function_name"
	],
	resources: {
		LambdaForwardRole: require('./resources/lambdaForwardRole'),
		LambdaSesPermission: require('./resources/lambdaSesPermission'),
		BucketReceiptRule: require('./resources/bucketReceiptRule'),
		LambdaReceiptRule: require('./resources/lambdaReceiptRule'),
		EmailBucket: require('./resources/emailBucket'),
		EmailBucketPolicy: require('./resources/bucketPolicy')
	}
};
