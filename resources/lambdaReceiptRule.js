module.exports = function lambdaReceiptRule({prefix, pattern_name, lambda_function_name, email_recipients, ses_ruleset_name}) {
	return {
		"Type": "AWS::SES::ReceiptRule",
		"DependsOn": [
			`${pattern_name}EmailBucket`,
			`${pattern_name}EmailBucketPolicy`,
			`${pattern_name}BucketReceiptRule`
		],
		"Properties": {
			"After": `${prefix}-${pattern_name}-s3-email-store`,
			"Rule": {
				"ScanEnabled": true,
				"Recipients": email_recipients,
				"Actions": [
					{
						"LambdaAction": {
							"FunctionArn": {
								"Fn::GetAtt": [`${lambda_function_name}LambdaFunction`, "Arn"]
							},
							"InvocationType": "Event"
						}
					}
				],
				"Enabled": true,
				"Name": `${prefix}-${pattern_name}-email-lambda-rule`
			},
			"RuleSetName": ses_ruleset_name
		}
	};
}
