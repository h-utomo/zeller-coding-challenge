import { render, screen, fireEvent } from '@testing-library/react';
import { ListZellerCustomers } from './utils/graphql/queries';
// https://github.com/apollographql/react-apollo/issues/1711
import { MockedProvider } from 'react-apollo/test-utils';
import App from './App';

const mocks = [
	{
		request: {
			query: ListZellerCustomers,
		},
		result: {
			data: {
				listZellerCustomers: {
					items: [
						{
							email: 'admin@zeller.com',
							id: 'mock-id',
							name: 'Zeller Admin',
							role: 'Admin',
						},
						{
							email: 'manager@zeller.com',
							id: 'mock-id',
							name: 'Zeller Manager',
							role: 'Manager',
						},
					],
				},
			},
		},
	},
];

describe('App should render properly', () => {
	it('should display admin list by default', async () => {
		render(
			<MockedProvider mocks={mocks} addTypename={false}>
				<App />
			</MockedProvider>
		);

		// https://www.apollographql.com/docs/react/development-testing/testing/#testing-the-success-state
		await new Promise((resolve) => setTimeout(resolve, 0));

		// on page load, it should display admin user by default
		expect(screen.getByText('Zeller Admin')).toHaveTextContent('Zeller Admin');

		const adminOption = screen.getByRole('radio', { name: 'Admin' });
		const managerOption = screen.getByRole('radio', { name: 'Manager' });

		// switching to manager user results the list to be updated
		fireEvent.click(managerOption);
		expect(screen.getByText('Zeller Manager')).toHaveTextContent(
			'Zeller Manager'
		);

		// should switch back to display the admin list
		fireEvent.click(adminOption);
		expect(screen.getByText('Zeller Admin')).toHaveTextContent('Zeller Admin');
	});
});
