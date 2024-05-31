import { Client, Account,Databases } from 'appwrite';

const databaseId = '65e94f9f010594ef28c3';
const collectionId = '66595953002d150c720f';
const documentId = '6659598d002df90fba34';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65e94de0e88ed3878323');

export const account = new Account(client);
export const databases = new Databases(client);


export async function addDevToken(token: string): Promise<void> {
    try {
        // Fetch the document to get the current dev_tokens array
        const document = await databases.getDocument(databaseId, collectionId, documentId);

        // Check if dev_tokens attribute exists and is an array
        if (!Array.isArray(document.dev_tokens)) {
            throw new Error('The dev_tokens attribute is not an array');
        }

        // Check if the token already exists in the array
        if (!document.dev_tokens.includes(token)) {
            // Add the token to the array
            const updatedTokens = [...document.dev_tokens, token];

            // Update the document with the new array
            await databases.updateDocument(databaseId, collectionId, documentId, {
                dev_tokens: updatedTokens,
            });

            // console.log('Token added successfully');
        } else {
            // console.log('Token already exists');
        }
    } catch (error) {
        // console.error('Error updating the document:', error);
    }
}

