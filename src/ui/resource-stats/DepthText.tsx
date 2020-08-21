import React from 'react';
import LocalStorageKeys from 'config/LocalStorageKeys';

interface IDepthProps {
	value: number;
}

const DepthText = (props: IDepthProps) => {
	const depthMetric = localStorage.getItem(LocalStorageKeys.DepthMetric);
	return (
		<>
			{props.value} {depthMetric}
		</>
	);
};

export default DepthText;
