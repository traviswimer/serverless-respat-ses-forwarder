module.exports = function lambdaSesPermission({lambda_function_name}) {
	return {
		"Type": "AWS::Lambda::Permission",
		"Properties": {
			"Action": "lambda:InvokeFunction",
			"FunctionName": {
				"Fn::GetAtt": [`${lambda_function_name}LambdaFunction`, "Arn"]
			},
			"Principal": "ses.amazonaws.com"
		}
	};
}
