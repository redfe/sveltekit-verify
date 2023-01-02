import { BlobSASPermissions, BlobServiceClient } from '@azure/storage-blob';
import crypto from 'crypto';
import { env } from '$env/dynamic/private';

export async function getSasUrl(userId: string, fileName: string) {
	const containerName = 'blog-attachments';
	const containerClient = getContainerClient(containerName);

	const blockBlobClient = containerClient.getBlockBlobClient(
		userId + '/' + crypto.randomUUID() + '/' + fileName
	);
	return blockBlobClient.generateSasUrl({
		permissions: BlobSASPermissions.from({
			write: true
		}),
		expiresOn: new Date(new Date().setHours(new Date().getHours() + 1))
	});
}

function getBlobServiceClient() {
	console.log('Azure Blob storage v12 - JavaScript quickstart sample');

	const AZURE_STORAGE_CONNECTION_STRING = env.AZURE_STORAGE_CONNECTION_STRING;

	if (!AZURE_STORAGE_CONNECTION_STRING) {
		throw Error('Azure Storage Connection string not found');
	}

	// Create the BlobServiceClient object with connection string
	const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

	return blobServiceClient;
}

function getContainerClient(containerName: string) {
	const blobServiceClient = getBlobServiceClient();
	// Get a reference to a container
	const containerClient = blobServiceClient.getContainerClient(containerName);

	return containerClient;
}

// 参考: https://learn.microsoft.com/ja-jp/azure/storage/blobs/storage-quickstart-blobs-nodejs?tabs=managed-identity%2Croles-azure-portal%2Csign-in-azure-cli
export async function main() {
	// Create a unique name for the container
	const containerName = 'quickstart' + crypto.randomUUID();
	const containerClient = getContainerClient(containerName);

	// Create the container
	console.log('\nCreating container...');
	console.log('\t', containerName);

	const createContainerResponse = await containerClient.create();
	console.log(
		`Container was created successfully.\n\trequestId:${createContainerResponse.requestId}\n\tURL: ${containerClient.url}`
	);

	// Create a unique name for the blob
	const blobName = 'quickstart' + crypto.randomUUID() + '.txt';

	// Get a block blob client
	const blockBlobClient = containerClient.getBlockBlobClient(blobName);

	// Display blob name and url
	console.log(
		`\nUploading to Azure storage as blob\n\tname: ${blobName}:\n\tURL: ${blockBlobClient.url}`
	);

	// Upload data to the blob
	const data = 'Hello, World!';
	const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
	console.log(`Blob was uploaded successfully. requestId: ${uploadBlobResponse.requestId}`);

	console.log('\nListing blobs...');

	// List the blob(s) in the container.
	for await (const blob of containerClient.listBlobsFlat()) {
		// Get Blob Client from name, to get the URL
		const tempBlockBlobClient = containerClient.getBlockBlobClient(blob.name);

		// Display blob name and URL
		console.log(`\n\tname: ${blob.name}\n\tURL: ${tempBlockBlobClient.url}\n`);
	}

	// Get blob content from position 0 to the end
	// In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody
	// In browsers, get downloaded data by accessing downloadBlockBlobResponse.blobBody
	const downloadBlockBlobResponse = await blockBlobClient.download(0);
	console.log('\nDownloaded blob content...');
	console.log('\t', await streamToText(downloadBlockBlobResponse.readableStreamBody));

	// Delete container
	console.log('\nDeleting container...');

	const deleteContainerResponse = await containerClient.delete();
	console.log('Container was deleted successfully. requestId: ', deleteContainerResponse.requestId);
}

// Convert stream to text
async function streamToText(readable: NodeJS.ReadableStream | undefined) {
	if (!readable) {
		return '';
	}
	readable.setEncoding('utf8');
	let data = '';
	for await (const chunk of readable) {
		data += chunk;
	}
	return data;
}
