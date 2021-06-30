import './App.css';
import { withApollo, graphql, compose, ChildDataProps } from 'react-apollo';
import { ListZellerCustomers } from './graphql/queries';
import { ReactElement, useState } from 'react';

type listZellerCustomer = {
	email: String;
	id: String;
	name: String;
	role: 'Admin' | 'Manager';
};

type CustomerCardProps = {
	customer: Pick<listZellerCustomer, 'name' | 'role'>;
};

const CustomerCard = (props: CustomerCardProps): ReactElement => {
	const {
		customer: { name, role },
	} = props;
	const nameInitial = name.charAt(0);
	return (
		<div className='card-container'>
			<div className='card-avatar'>
				<p className='initial-container'>{nameInitial}</p>
			</div>
			<div className='customer-details'>
				<div className='customer-name'>{name}</div>
				<div className='customer-role'>{role}</div>
			</div>
		</div>
	);
};

type ListProps = {
	customerList: Array<listZellerCustomer> | undefined;
};

const List = (props: ListProps): ReactElement => {
	const { customerList = [] } = props;
	return (
		<div>
			{customerList.map((customer) => (
				<div>
					<CustomerCard customer={customer} />
				</div>
			))}
		</div>
	);
};

type Response = {
	listZellerCustomers: { items: Array<listZellerCustomer> };
};

type AppProps = ChildDataProps<{}, Response, {}> & { client: any };

const App = (props: AppProps): ReactElement => {
	const [userType, setUserType] = useState('Admin');

	// filtering customers based on selected `userType`
	const customerToDisplay = props.data.listZellerCustomers?.items.filter(
		(c) => c.role === userType
	);

	return (
		<div className='App-header'>
			<h2>User Type</h2>
			<div>
				<div onClick={() => setUserType('Admin')} className='radio-option'>
					<input
						type='radio'
						id='Admin'
						value='Admin'
						checked={userType === 'Admin'}
						onChange={(e) => setUserType(e.target.value)}
					/>
					<label className='option-label' htmlFor='admin'>
						Admin
					</label>
				</div>
				<div onClick={() => setUserType('Manager')} className='radio-option'>
					<input
						type='radio'
						id='Manager'
						value='Manager'
						checked={userType === 'Manager'}
					/>
					<label className='option-label' htmlFor='Manager'>
						Manager
					</label>
				</div>
			</div>
			<div>
				<h2>{`${userType}`} Users</h2>
				<List customerList={customerToDisplay} />
			</div>
		</div>
	);
};

export default compose(withApollo, graphql(ListZellerCustomers))(App);
