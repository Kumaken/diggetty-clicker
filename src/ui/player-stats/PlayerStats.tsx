import React, { useContext } from "react";
import { RootStoreContext } from "index";
import { observer } from "mobx-react";
import Tag from "react-bulma-components/lib/components/tag";
import Media from "react-bulma-components/lib/components/media";
import Image from "react-bulma-components/lib/components/image";
import Heading from "react-bulma-components/lib/components/heading";
import "./PlayerStats.scss";
import { IconData } from "data/IconData";
import LocalStorageKeys from "config/LocalStorageKeys";

const PlayerStats = () => {
  const store = useContext(RootStoreContext);
  const DPSText = localStorage.getItem(LocalStorageKeys.DPSText);
  const DPCText = localStorage.getItem(LocalStorageKeys.DPCText);
  const BuffDuration = localStorage.getItem(LocalStorageKeys.BuffDuration);

  const convertSecondsToClock = () => {
    let date = new Date(null);
    date.setSeconds(store.gameStore?.buffDuration); // specify value for SECONDS here
    let result = date.toISOString().substr(15, 4);
    return result;
  };

  const StatsComponent = (
    icon: string,
    name: string,
    value: number | string
  ) => {
    return (
      <div className="stats-component">
        <Media className="stats-pic">
          <Media.Item renderAs="figure">
            <Image
              rounded
              size={48}
              alt="dpc icon pic bg"
              src="http://bulma.io/images/placeholders/16x16.png"
            />
            <Image overlay rounded size={48} alt="dpc icon pic" src={icon} />
          </Media.Item>
        </Media>
        <Tag className="dpc-tag" color="dark" rounded>
          <p className="text-yellow silk-screen-A">{name}</p>
        </Tag>
        <Heading
          className="stats-text text-gray text-yellow-outline silk-screen-A"
          size={1}
        >
          {value}
        </Heading>
      </div>
    );
  };

  return (
    <div className="player-stats">
      <div className="player-stats-row">
        {StatsComponent(IconData.DPC, DPCText, store.gameStore?.playerDPC)}
        {StatsComponent(IconData.DPS, DPSText, store.gameStore?.playerDPS)}
        {store.gameStore?.buffDuration > 0
          ? StatsComponent(
              store.gameStore?.activeItem.itemData.texturePath,
              BuffDuration,
              convertSecondsToClock()
            )
          : null}
      </div>
    </div>
  );
};

export default observer(PlayerStats);
