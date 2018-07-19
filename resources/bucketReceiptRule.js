module.exports = function bucketReceiptRule({prefix, pattern_name, email_recipients, bucket_name, ses_ruleset_name}) {
	return {
		"Type": "AWS::SES::ReceiptRule",
		"DependsOn": [
			`${pattern_name}EmailBucket`
		],
		"Properties": {
			"Rule": {
				"ScanEnabled": true,
				"Recipients": email_recipients,
				"Actions": [
					{
						"S3Action": {
							"BucketName": bucket_name
						}
					}
				],
				"Enabled": true,
				"Name": `${prefix}-${pattern_name}-s3-email-store`
			},
			"RuleSetName": ses_ruleset_name
		}
	};
}
