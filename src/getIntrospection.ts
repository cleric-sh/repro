import { writeFile } from 'fs';
import { getIntrospectionQuery } from 'graphql';
import qgl from 'graphql-tag';
import { promisify } from 'util';

import { getClient } from './getClient';

const _writeFile = promisify(writeFile);

export const getIntrospection = async (uri: string) => {
  const client = await getClient(uri);
  const introspectionQuery = getIntrospectionQuery({});

  const result = await client.query({
    query: qgl`${introspectionQuery}`,
  });

  console.log(result);

  await _writeFile(
    __dirname + '/../schema.json',
    JSON.stringify(result.data, null, 2)
  );

  console.log('Done!');
};
