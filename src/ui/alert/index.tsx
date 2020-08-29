import React from 'react';
import InsufficientMoneyAlert from './InsufficientMoney';
import InventoryFullAlert from './InventoryFull';

const Alerts = () => {
	return (
		<>
			<InsufficientMoneyAlert />
			<InventoryFullAlert />
		</>
	);
};

export default Alerts;
