import { getIntrospection } from "../src/getIntrospection";

const update = async () => {
    const url = process.env.DGRAPH_URL;

    if (!url) {
        console.log('Define DGRAPH_URL in a .env file at the root of the repo.')
    }
    await getIntrospection(`${url}/graphql`);
}

update().catch(console.log);