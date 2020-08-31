import { HiringData } from '../../data/HiringData';
import HiringEntry from './HiringEntry';
import { IHiringDatum } from '../../phaser/interface/IHiringData';
import React from 'react';
import { observer } from 'mobx-react';

const HiringTabIterator = () => {
	const createHiringEntry = (key: string, HiringDatum: IHiringDatum) => {
		return <HiringEntry key={key} _key={key} hiringData={HiringDatum} />;
	};

	const createHiringList = () => {
		const Hirings = [];
		for (let key in HiringData) {
			Hirings.push(createHiringEntry(key, HiringData[key]));
		}
		return Hirings;
	};

	return <>{createHiringList()}</>;
};

export default observer(HiringTabIterator);
