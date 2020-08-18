/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';
import './BottomMenu.scss';
import { CSSTransition } from 'react-transition-group';
import Algorithm from 'phaser/Util/Algorithm';
import UpgradeTabIterator from './UpgradeTabIterator';

const transitionDuration = 300;

export const BottomMenu = () => {
	const [tabList, setTabList] = useState([
		{
			name: 'Upgrades',
			icon: '',
			content: <UpgradeTabIterator />
		},
		{
			name: 'Hiring',
			icon: '',
			content: 'Stuff 2'
		},
		{
			name: 'Marketing',
			icon: '',
			content: 'Stuff 3'
		},
		{
			name: 'Inventory',
			icon: '',
			content: 'Stuff 4'
		}
	]);
	const [activeTab, setActiveTab] = useState('Upgrades');
	const [beginAnimation, setBeginAnimation] = useState(true);

	const Tab = (props) => {
		const { name } = props.tab;

		return (
			<li
				className={name === activeTab ? 'is-active' : null}
				onClick={async () => {
					setBeginAnimation(!beginAnimation);
					await Algorithm.delay(transitionDuration);
					setActiveTab(name);
				}}
			>
				<a>
					{/* <span className="icon is-small"><i className="fa fa-image"></i></span> */}
					<span className="text-white">{name}</span>
				</a>
			</li>
		);
	};

	const activeTabContent = () => {
		const activeIndex = tabList.findIndex((tab) => {
			return tab.name === activeTab;
		});

		return tabList[activeIndex]?.content;
	};

	const Tabs = () => {
		return (
			<div className="tabs is-centered is-medium is-fullwidth is-toggle silk-screen-A is-size-5 is-marginless">
				<ul>
					{tabList.map((tab) => (
						<Tab tab={tab} key={tab.name} />
					))}
				</ul>
			</div>
		);
	};

	const ActiveTabContent = (props) => <div className="tabs-content">{props.content}</div>;

	return (
		<div className="bottom-tab">
			<Tabs />
			{/* <ActiveTabContent key={activeTab} content={activeTabContent()} /> */}

			<CSSTransition
				in={beginAnimation}
				classNames="fade"
				timeout={{ enter: transitionDuration + 100, exit: transitionDuration }}
				onExited={() => setBeginAnimation(true)}
			>
				{ActiveTabContent({ key: activeTab, content: activeTabContent() })}
			</CSSTransition>
		</div>
	);
};
