# serverless-respat-ses-forwarder
> Resource Pattern for forwarding emails using SES

## Usage

This package is intended for use with the **serverless-respat plugin**. ([install/usage info](https://github.com/traviswimer/serverless-respat)).

Install:

`npm install --save-dev serverless-respat-ses-forwarder`

Add patterns to the "custom" object in your serverless config file:

```javascript
"custom": {
	"serverless-respat": {
		prefix: "${self:service}-${opt:stage}",
		patterns: [
			{
				pattern_function: require("serverless-respat-ses-forwarder"),
				config: {
					ses_ruleset_name: "EmailForwarding",
					bucket_name: "el-bucket-de-email",
					email_recipients: ["kjsdfjweijfkjsdfhjkhdf.com"],
					lambda_function_name: "ForwardEmail"
				}
			}
		]
	}
}
```

Add a function that does the email forwarding for you. The property name should match the `lambda_function_name` in your plugin config.

```javascript
"functions": {
	"forwardEmail": {
		"handler": "handlers.forwardEmail",
		"role": "SesForwarderLambdaForwardRole"
	}
}
```

The easiest way to setup a forwarding lambda function is to use [aws-lambda-ses-forwarder](https://github.com/arithmetric/aws-lambda-ses-forwarder). Your `handlers.js` file would then look something like this:

```javascript
const ses_forwarder = require('aws-lambda-ses-forwarder');

module.exports = {
	forwardEmail: (event, context, callback) => {
		return ses_forwarder.handler(event, context, callback, {
			config: {
				fromEmail: "noreply@YOUR_DOMAIN",
				subjectPrefix: "YOUR_DOMAIN: ",
				emailBucket: "YOUR_DOMAIN-email",
				emailKeyPrefix: "",
				forwardMapping: {
					"@YOUR_DOMAIN": ["YOUR_USERNAME@gmail.com"]
				}
			}
		})
	}
}
```

Make sure you have verified your email address and domains for SES using the AWS console.

## Config options
**pattern_name** - (string) A pattern name included in resource names. *DEFAULT: "SesForwarder"*

**bucket_path** - (string) Path to bucket. *DEFAULT:  '/'*

**bucket_name** - (string) The S3 bucket name used to store your emails.

**ses_ruleset_name** - (string) The active SES ruleset where the receipt rules will be added. The ruleset must already exist.

**email_recipients** - (string) The email address where you would like the emails to be forwarded.

**lambda_function_name** - (string) The name of the lambda function that does the forwarding.
