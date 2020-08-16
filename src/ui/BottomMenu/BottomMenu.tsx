/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react';
import Tabs from 'react-bulma-components/lib/components/tabs';
import './BottomMenu.scss';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Algorithm from 'phaser/Util/Algorithm';

export const BottomMenu = () => {
	const [tabList, setTabList] = useState([
		{
			name: 'Pictures',
			icon: '',
			content: 'Stuff 1'
		},
		{
			name: 'Music',
			icon: '',
			content: 'Stuff 2'
		},
		{
			name: 'Videos',
			icon: '',
			content: 'Stuff 3'
		},
		{
			name: 'Documents',
			icon: '',
			content: 'Stuff 4'
		}
	]);
	const [activeTab, setActiveTab] = useState('Pictures');
	const [beginAnimation, setBeginAnimation] = useState(true);

	const Tab = (props) => {
		const { name } = props.tab;

		return (
			<li
				className={name === activeTab ? 'is-active' : null}
				onClick={async () => {
					setBeginAnimation(!beginAnimation);
					await Algorithm.delay(300);
					setActiveTab(name);
				}}
			>
				<a>
					{/* <span className="icon is-small"><i className="fa fa-image"></i></span> */}
					<span>{name}</span>
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

	const ActiveTabContent = (props) => <div>{props.content}</div>;

	return (
		<div className="bottom-tab">
			<Tabs />
			<CSSTransition
				className="tabs-content"
				in={beginAnimation}
				classNames="fade"
				timeout={{ enter: 300, exit: 300 }}
				onExited={() => setBeginAnimation(true)}
			>
				<ActiveTabContent key={activeTab} content={activeTabContent()} />
			</CSSTransition>
		</div>
	);
};
