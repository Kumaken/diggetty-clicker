import React, { useEffect, useState, useContext } from "react";
import { RootStoreContext } from "index";
import PlayerStats from "./player-stats/PlayerStats";
import "./UI.scss";
import "./modal/ItemDescModal.scss";
import ToughnessBar from "./toughness-bar/ToughnessBar";
import ResourceStats from "./resource-stats";
import { BottomMenu } from "./bottom-menu/BottomMenu";
import ItemDescModal from "./modal/ItemDescModal";
import { observer } from "mobx-react";
import PropTypes from "prop-types";

// data jsons:
import UITextData from "../data/json/UITextData.json";
import Alerts from "./alert";
import Modal from "react-bulma-components/lib/components/modal";
import Image from "react-bulma-components/lib/components/image";
import Media from "react-bulma-components/lib/components/media";
import Button from "react-bulma-components/lib/components/button";
import Content from "react-bulma-components/lib/components/content";
import Section from "react-bulma-components/lib/components/section";
import Level from "react-bulma-components/lib/components/level";

const UI = () => {
  const store = useContext(RootStoreContext);
  const [isConfigLoaded, setIsConfigLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const issueUseItem = () => {
	store.gameStore?.useItem();
}

  const saveToLocalStorage = (data: {}) => {
    Object.keys(data).forEach((key: string) => {
      localStorage.setItem(key, data[key]);
    });
  };

  // setup configurations:
  useEffect(() => {
    if (localStorage.getItem("isConfigured") === "true") {
      setIsConfigLoaded(true);
      return;
    }
    saveToLocalStorage(UITextData);

    localStorage.setItem("isConfigured", "true");
    setIsConfigLoaded(true);
  }, []);

  return (
    <div className="UI noselect">
      {isConfigLoaded ? (
        <>
          <PlayerStats></PlayerStats>
          <ToughnessBar></ToughnessBar>
          <ResourceStats></ResourceStats>
          {/* <ItemDescModal></ItemDescModal> */}
          <BottomMenu></BottomMenu>
          <Alerts></Alerts>
          <Modal
            show={store.gameStore?.itemShown}
            onClose={() => {
				store.gameStore?.hideItem()
            }}
          >
            <Modal.Card>
              <Modal.Card.Head
                onClose={() => {
					store.gameStore?.hideItem()
                }}
              >
                <Modal.Card.Title>
                  {store.gameStore?.inventory[0]?.itemData.name}
                </Modal.Card.Title>
              </Modal.Card.Head>
              <Modal.Card.Body>
                <Media>
                  <Media.Item renderAs="figure" position="left">
                    <Image
                      className="item-pic"
                      src={
                        store.gameStore?.inventory[
                          store.gameStore?.currentItemIndex
                        ]?.itemData.texturePath
                      }
                    />
                  </Media.Item>
                  <Media.Item>
                    <Content className="item-details">
                      <p>
                        <span>
                          <strong>
                            {
                              store.gameStore?.inventory[
                                store.gameStore?.currentItemIndex
                              ]?.itemData.attributes
                            }
                          </strong>
                        </span>
                        <span>
                          <small>
							for{" "}
                            {
                              store.gameStore?.inventory[
                                store.gameStore?.currentItemIndex
                              ]?.itemData.duration
                            }{" "}
                            minutes
                          </small>
                        </span>
                        <span>
                          {
                            store.gameStore?.inventory[
                              store.gameStore?.currentItemIndex
                            ]?.itemData.description
                          }
                        </span>
                      </p>
                    </Content>
                  </Media.Item>
                </Media>
              </Modal.Card.Body>
              <Modal.Card.Foot
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <Button
				  className="is-primary"
                  onClick={() => {
                    issueUseItem()
                  }}
                >
                  Use Item
                </Button>
              </Modal.Card.Foot>
            </Modal.Card>
          </Modal>
        </>
      ) : (
        <div className="pageloader is-active is-bottom-to-top">
          <span className="title">Loading Configurations...</span>
        </div>
      )}
    </div>
  );
};

export default observer(UI);
