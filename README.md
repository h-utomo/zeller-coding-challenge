## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `About`

This coding challenge is to build a simple react app with Typescript (optional), integrated with GraphQL APIs.

Need to build a simple react app in Typescript to show Zeller customers.
Customers should be fetched with the GraphQL APIs provided.

List of customers need to be filtered based on the selection of user type - Admin/Manager.

● Radio button selection of `Admin` should list admin customers as per the design.
● If the selection is `Manager`, customers with a role `Manager` need to be listed.

### `Note`

Going through building the application, I am using `withApollo` to provide the `App` component with the props.
`withApollo` acts as a higher order component (HOC) which wraps the `App` component and execute the query which fetches all of the data of Zeller customers

Using `AWSAppSyncClient` to initialise the client object which later passed onto the `ApolloProvider`,
there is an open issues with `AWSAppSyncClient` needs to have an older version of `react-apollo`
see: https://github.com/awslabs/aws-mobile-appsync-sdk-js/issues/448
