import * as dotenv from "dotenv"
dotenv.config();

import * as lambda from "../src/lambda"


async function main() {
    await lambda.handler({}, {});
}

main()