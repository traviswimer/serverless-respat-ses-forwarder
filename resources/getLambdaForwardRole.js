module.exports = function getLambdaForwardRole({prefix, pattern_name, bucket_path, bucket_name}) {
	return {
		Type: "AWS::IAM::Role",
		Properties: {
			"RoleName": `${prefix}-${pattern_name}-role`,
			"AssumeRolePolicyDocument": {
				"Version": "2012-10-17",
				"Statement": [
					{
						"Effect": "Allow",
						"Principal": {
							"Service": "lambda.amazonaws.com"
						},
						"Action": "sts:AssumeRole"
					}
				]
			},
			"MaxSessionDuration": 3600,
			"Path": bucket_path,
			"Policies": [
				{
					"PolicyName": `${prefix}-${pattern_name}-role-policy`,
					"PolicyDocument": {
						"Version": "2012-10-17",
						"Statement": [
							{
								"Effect": "Allow",
								"Action": [
									"logs:CreateLogGroup", "logs:CreateLogStream", "logs:PutLogEvents"
								],
								"Resource": "arn:aws:logs:*:*:*"
							}, {
								"Effect": "Allow",
								"Action": "ses:SendRawEmail",
								"Resource": "*"
							}, {
								"Effect": "Allow",
								"Action": [
									"s3:GetObject", "s3:PutObject", "s3:*"
								],
								"Resource": `arn:aws:s3:::${bucket_name}/*`
							}
						]
					}
				}
			]
		}
	}
};
