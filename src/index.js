import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
import awsconfig from './aws-exports';
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

const WithProvider = () => (
	<ApolloProvider client={client}>
		<Rehydrated>
			<App />
		</Rehydrated>
	</ApolloProvider>
);

ReactDOM.render(
	<React.StrictMode>
		<WithProvider />
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
