export const defaultCodeString =
  'provider "aws" { \n\
  region = "us-east-1" \n\
} \n\
 \n\
resource "aws_s3_bucket" "example_bucket" { \n\
  bucket = "my-terraform-bucket" \n\
  acl    = "private" \n\
} \
';