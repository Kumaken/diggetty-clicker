import { HiringData } from '../../data/HiringData';
import HiringEntry from './HiringEntry';
import { IHiringDatum } from '../../phaser/interface/IHiringData';
import React, { useContext } from 'react';
import { RootStoreContext } from 'index';
import { observer } from 'mobx-react';

const HiringTabIterator = () => {
	const store = useContext(RootStoreContext);

	const calculateCurrentCost = (level: number, HiringDatum: IHiringDatum) => {
		return HiringDatum.baseCost * level * HiringDatum.costUpRatio;
	};

	const createHiringEntry = (key: string, HiringDatum: IHiringDatum) => {
		return (
			<HiringEntry
				key={key}
				_key={key}
				HiringData={HiringDatum}
				cur_cost={calculateCurrentCost(store.gameStore?.hiringProgresses[key].level, HiringDatum)}
				cur_level={store.gameStore?.hiringProgresses[key].level}
			/>
		);
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
