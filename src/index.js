import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import awsconfig from './utils/aws-exports';
import { ApolloProvider } from 'react-apollo';
import { Rehydrated } from 'aws-appsync-react';

const client = new AWSAppSyncClient({
	url: awsconfig.aws_appsync_graphqlEndpoint,
	region: awsconfig.aws_appsync_region,
	auth: {
		type: AUTH_TYPE.API_KEY,
		apiKey: awsconfig.aws_appsync_apiKey,
	},
});

ReactDOM.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<Rehydrated>
				<App />
			</Rehydrated>
		</ApolloProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
