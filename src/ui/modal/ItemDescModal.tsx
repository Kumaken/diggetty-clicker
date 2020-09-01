/**
 * 1. Ini untuk modal
 * 2. Komunikasi antar button dan modal lewat mobx observer observable (var baru, action setter getter baru)
 * 3. Modal export observer
 * 4. Modal ditaro di UI
 */

import React, { useContext } from "react";
import { RootStoreContext } from "index";
import { observer } from "mobx-react";

import Modal from "react-bulma-components/lib/components/modal";
import Image from "react-bulma-components/lib/components/image";
import Media from "react-bulma-components/lib/components/media";
import Button from "react-bulma-components/lib/components/button";
import Content from "react-bulma-components/lib/components/content";

const ItemDescModal = () => {
  const store = useContext(RootStoreContext);

  return (
    <Modal
      show={store.gameStore?.itemShown}
      onClose={() => {
        store.gameStore?.hideItem();
      }}
    >
      <Modal.Card>
        <Modal.Card.Head
          onClose={() => {
            store.gameStore?.hideItem();
          }}
        >
          <Modal.Card.Title>
            {
              store.gameStore?.inventory[store.gameStore?.currentItemIndex]
                ?.itemData.name
            }
          </Modal.Card.Title>
        </Modal.Card.Head>
        <Modal.Card.Body>
          <Media>
            <Media.Item renderAs="figure" position="left">
              <Image
                className="item-pic"
                src={
                  store.gameStore?.inventory[store.gameStore?.currentItemIndex]
                    ?.itemData.texturePath
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
          {store.gameStore?.buffDuration === 0 ? (
            <Button
              className="is-primary"
              onClick={() => {
                store.gameStore?.useItem();
              }}
            >
              Use Item
            </Button>
          ) : (
            <Content className="item-details">
              <span>A buff is active. Can't activate another item.</span>
            </Content>
          )}
        </Modal.Card.Foot>
      </Modal.Card>
    </Modal>
  );
};

export default observer(ItemDescModal);
