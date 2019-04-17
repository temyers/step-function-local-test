// import { StepFunctions } from 'aws-sdk'

// Taken from serverless executable

jest.mock('../external-api.ts');

import { getFoo } from '../external-api'

var AWS = require('aws-sdk-mock');

async function runStateMachine() {
  const uuid = require('uuid');
  const serverlessArgs = [
    '/path/to/node',
    '/path/to/serverless',
    'step-functions-offline', '--stage', 'local', '--stateMachine', 'foo']
  process.argv = serverlessArgs
  const Serverless = require('serverless')
  const invocationId = uuid.v4()
  const serverless = new Serverless({
    interactive: false,
  });

  serverless.invocationId = invocationId

  return serverless.init().then(() => serverless.run()).catch(console.log)
}

describe('foo Step Function', () => {

  // const localStepFunctions = 'http://step-functions:8083'
  // let sf: StepFunctions
  let originalArgs
  beforeAll(() => {
    originalArgs = process.argv

  })
  beforeAll(async (done) => {
    // sf = new StepFunctions({
    //   region: 'us-east-1',
    //   endpoint: localStepFunctions
    // })
    done()
  })

  afterAll(() => {
    process.argv = originalArgs
  })

  beforeAll(() => {
    (getFoo as any).mockReturnValue('bar')
    AWS.mock("S3", "getObject", "This is some text");

    console.log(getFoo())
  })

  afterAll( () => {
    AWS.restore('S3');
  })

  describe('when api calls are successful', () => {
    fit('should return successfully', async (done) => {

      await runStateMachine()
      done()

    }, 60 * 1000)
  })
})