import path from 'path';
import process from 'process';
import * as dotenv from 'dotenv';
import { BlobServiceClient, StorageSharedKeyCredential, newPipeline } from '@azure/storage-blob';

// load environment variables
dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
  debug: true,
});

// create shared key credential from environment variables
const sharedKeyCredential = new StorageSharedKeyCredential(
  process.env.AZURE_STORAGE_ACCOUNT_NAME,
  process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY
);

// create new pipeline with shared key credential
const pipeline = newPipeline(sharedKeyCredential);

// create new blob service client
const blobServiceClient = new BlobServiceClient(
  `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
  pipeline
);

// export the service client
export { blobServiceClient };
