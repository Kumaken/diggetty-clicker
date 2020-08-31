/**
 * 1. Ini untuk modal
 * 2. Komunikasi antar button dan modal lewat mobx observer observable (var baru, action setter getter baru)
 * 3. Modal export observer
 * 4. Modal ditaro di UI
 */

import React, { useContext, useState } from "react";
import { RootStoreContext } from "index";
import { CSSTransition } from "react-transition-group";
import Notification from "react-bulma-components/lib/components/notification";
import { observer } from "mobx-react";
import Algorithm from "phaser/util/Algorithm";

import Modal from "react-bulma-components/lib/components/modal";
import Image from "react-bulma-components/lib/components/image";
import Media from "react-bulma-components/lib/components/media";
import Button from "react-bulma-components/lib/components/button";
import Content from "react-bulma-components/lib/components/content";
import Section from "react-bulma-components/lib/components/section";
import Level from "react-bulma-components/lib/components/level";

const ItemDescModal = () => {
  const store = useContext(RootStoreContext);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Button
        onClick={() => {
          setIsOpen(true);
          console.log("open modal", isOpen);
        }}
      >
        Open
      </Button>
      <Modal
        show={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <Modal.Card>
          <Modal.Card.Head
            onClose={() => {
              setIsOpen(false);
            }}
          >
            <Modal.Card.Title>Title</Modal.Card.Title>
          </Modal.Card.Head>
          <Modal.Card.Body>
            <Media>
              <Media.Item renderAs="figure" position="left">
                <Image
                  class="item-pic"
                  src="http://bulma.io/images/placeholders/128x128.png"
                />
              </Media.Item>
              <Media.Item>
                <Content>
                  <p>
                    <strong>John Smith</strong> <small>@johnsmith</small>{" "}
                    <small>31m</small>
                    <br />
                    If the children of the Modal is a card, the close button
                    will be on the Card Head instead than the top-right corner
                    You can also pass showClose = false to Card.Head to hide the
                    close button
                  </p>
                </Content>
              </Media.Item>
            </Media>
          </Modal.Card.Body>
          <Modal.Card.Foot
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <p>Lorem Ipsum...</p>
          </Modal.Card.Foot>
        </Modal.Card>
      </Modal>
    </>
  );
};

export default observer(ItemDescModal);
{
  /* <Button
        onClick={() => {
          setIsOpen(true);
          console.log("open modal", isOpen);
        }}
      >
        Open
      </Button> */
}
