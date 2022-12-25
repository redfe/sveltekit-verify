import type { Blog, InitializableBlog } from '$lib/types';
import { CosmosClient } from '@azure/cosmos';
import { COSMOS_KEY, COSMOS_ENDPOINT } from '$env/static/private';

const key = COSMOS_KEY;
const endpoint = COSMOS_ENDPOINT;

const databaseName = 'misc';
const containerName = 'blogs';
const partitionKeyPath = ['/slug'];
const uniqueKeyPath = ['/slug', '/type'];
let cosmosClient: CosmosClient;

const getDatabase = async () => {
	if (!cosmosClient) {
		cosmosClient = new CosmosClient({ endpoint, key });
	}
	const { database } = await cosmosClient.databases.createIfNotExists({ id: databaseName });
	return database;
};

const getContainer = async () => {
	const database = await getDatabase();
	const { container } = await database.containers.createIfNotExists({
		id: containerName,
		partitionKey: {
			paths: partitionKeyPath
		},
		uniqueKeyPolicy: {
			uniqueKeys: [
				{
					paths: uniqueKeyPath
				}
			]
		}
	});
	return container;
};

export const getAll = async (): Promise<Blog[]> => {
	const container = await getContainer();
	const { resources } = await container.items
		.query("SELECT * from c where c.type='content'")
		.fetchAll();

	return resources;
};

export const add = async (blog: InitializableBlog) => {
	const container = await getContainer();
	await container.items.create({ type: 'content', ...blog });
};

export const remove = async (id: string, slug: string) => {
	const container = await getContainer();
	container.item(id, slug).delete();
};
