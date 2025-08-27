#!/bin/bash

# Configuration
S3_BUCKET="verigo"
CLOUDFRONT_ID="EYMFF4J0Z1V7D"

# Build and deploy
echo "Building React app..."
npm run build

echo "Uploading to S3..."
aws s3 sync build/ s3://$S3_BUCKET --delete

echo "Creating CloudFront invalidation..."
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_ID --paths "/*"

echo "Deployment complete!"