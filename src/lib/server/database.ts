import type { Blog, InitializableBlog } from '$lib/types';
import { CosmosClient } from '@azure/cosmos';
import { env } from '$env/dynamic/private';

const key = env.COSMOS_KEY;
const endpoint = env.COSMOS_ENDPOINT;

const databaseName = 'misc';
const containerName = 'blogs';
const partitionKeyPath = ['/user_id'];

enum Type {
	content
}

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
		}
	});
	return container;
};

export const getAll = async (userId: string): Promise<Blog[]> => {
	const container = await getContainer();
	const { resources } = await container.items
		.query({
			query: 'SELECT * from c where c.type=@type and c.user_id=@user_id',
			parameters: [
				{
					name: '@type',
					value: Type.content
				},
				{
					name: '@user_id',
					value: userId
				}
			]
		})
		.fetchAll();

	return resources;
};

export const getPage = async (
	userId: string,
	offset: number,
	limit: number
): Promise<{ blogs: Blog[]; allCount: number }> => {
	const container = await getContainer();
	const { resources } = await container.items
		.query({
			query:
				'SELECT * from c where c.type=@type and c.user_id=@user_id order by c.postDateTime desc offset @offset limit @limit',
			parameters: [
				{
					name: '@type',
					value: Type.content
				},
				{
					name: '@user_id',
					value: userId
				},
				{
					name: '@offset',
					value: offset
				},
				{
					name: '@limit',
					value: limit
				}
			]
		})
		.fetchAll();

	const countResponse = await container.items
		.query({
			query: 'SELECT COUNT(1) as count from c where c.type=@type and c.user_id=@user_id',
			parameters: [
				{
					name: '@type',
					value: Type.content
				},
				{
					name: '@user_id',
					value: userId
				}
			]
		})
		.fetchAll();

	const allCount = countResponse.resources[0].count;

	return { blogs: resources, allCount };
};

export const get = async (id: string, userId: string) => {
	const container = await getContainer();
	const { resources } = await container.items
		.query({
			query: 'SELECT * from c where c.type=@type and c.user_id=@user_id and c.id=@id',
			parameters: [
				{
					name: '@type',
					value: Type.content
				},
				{
					name: '@user_id',
					value: userId
				},
				{
					name: '@id',
					value: id
				}
			]
		})
		.fetchAll();

	return resources ? resources[0] : null;
};

export const add = async (blog: InitializableBlog) => {
	const container = await getContainer();
	await container.items.create({ type: Type.content, ...blog });
};

export const remove = async (id: string, userId: string) => {
	const container = await getContainer();
	container.item(id, userId).delete();
};
