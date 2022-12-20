import type { Blog } from '$lib/types';
import { CosmosClient } from '@azure/cosmos';
import { COSMOS_KEY, COSMOS_ENDPOINT } from '$env/static/private';

const key = COSMOS_KEY;
const endpoint = COSMOS_ENDPOINT;

const databaseName = 'misc';
const containerName = 'blog';
const partitionKeyPath = ['/postDateTime'];
const cosmosClient = new CosmosClient({ endpoint, key });

const getDatabase = async () => {
	const { database } = await cosmosClient.databases.createIfNotExists({ id: databaseName });
	return database;
};

const getContainer = async () => {
	const database = await getDatabase();
	const { container } = await database.containers.createIfNotExists({
		id: containerName,
		partitionKey: {
			paths: partitionKeyPath
		}
	});
	return container;
};

export const getAll = async (): Promise<Blog[]> => {
	const container = await getContainer();
	const { resources } = await container.items.query('SELECT * from c').fetchAll();

	return resources;
};

export const add = async (blog: Blog) => {
	const container = await getContainer();
	await container.items.create(blog);
};

export const remove = async (slug: string) => {
	const container = await getContainer();
	const { resources } = await container.items
		.query(`SELECT * from c where c.slug = "${slug}"`)
		.fetchAll();
	resources.forEach((blog) => {
		console.log(blog);
		container.item(blog.id, blog.postDateTime).delete();
	});
};
