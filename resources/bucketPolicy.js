module.exports = function bucketPolicy({prefix, pattern_name}) {
	return {
		"Type": "AWS::S3::BucketPolicy",
		DependsOn: [
			`${pattern_name}EmailBucket`
		],
		"Properties": {
			"Bucket": {
				"Fn::Join": [
					"",
					[
						{
							"Ref": `${pattern_name}EmailBucket`
						}
					]
				]
			},
			"PolicyDocument": {
				"Version": "2012-10-17",
				"Statement": [
					{
						"Sid": `${prefix}-${pattern_name}-allow-ses-to-write`,
						"Effect": "Allow",
						"Principal": {
							"Service": "ses.amazonaws.com"
						},
						"Action": "s3:PutObject",
						"Resource": {
							"Fn::Join": [
								"",
								[
									"arn:aws:s3:::", {
										"Ref": `${pattern_name}EmailBucket`
									},
									"/*"
								]
							]
						},
						"Condition": {
							"StringEquals": {
								"aws:Referer": {
									"Ref": "AWS::AccountId"
								}
							}
						}
					}
				]
			}
		}
	};
}
