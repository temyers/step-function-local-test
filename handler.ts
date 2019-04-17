import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { getFoo } from './external-api'

import {S3} from 'aws-sdk'

export const hello: APIGatewayProxyHandler = async (event, _context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
      input: event,
    }),
  };
}

export const first = async (event, _context, callback) => {
  const msg = 'first lambda called'
  console.log(event)
  console.log(msg)
  console.log(getFoo())

  const result = await new S3().getObject({
    Bucket: "Foo",
    Key: "bar"
  }).promise()
  console.log(result.toString())

  // FIXME - serverless-step-functions-offline doesn't support async/await
  callback(null,'ok')
  return Promise.resolve("ok")
}

export const second: APIGatewayProxyHandler = async (event, _context) => {
  const msg = 'second lambda called'
  console.log(msg)
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: msg,
      input: event,
    }),
  };
}
