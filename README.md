# DIDI-SSI-Identity-issuer

# Pre-requisites

- Install [Node.js](https://nodejs.org/en/) version 16.8.0

# Getting started

- Clone the repository and install dependencies

- Create .env file in the root of the project, filling in the corresponding data.

- Build and run the project

- Run Tests

```
To run the complete integration test, create a file inside the __tests__/integrations folder called vuUserInfoTest, and delete the 'integral' file from the array modulePathIgnorePatterns in the file jest.config.js line 92.
Complete the file vuUserInfoTest with the corresponding data:
  newOperationData,
  jwtAuth,
  fileFront,
  fileBack,
  fileSelfie,
```
