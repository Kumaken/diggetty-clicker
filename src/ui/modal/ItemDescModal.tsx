
/**
 * 1. Ini untuk modal
 * 2. Komunikasi antar button dan modal lewat mobx observer observable (var baru, action setter getter baru)
 * 3. Modal export observer
 * 4. Modal ditaro di UI
 */

import React, { useContext, useState } from 'react';
import { RootStoreContext } from 'index';
import { CSSTransition } from 'react-transition-group';
import Notification from 'react-bulma-components/lib/components/notification';
import Button from 'react-bulma-components/lib/components/button';
import { observer } from 'mobx-react';
import Algorithm from 'phaser/util/Algorithm';

const ItemDescModal = () => {
  const store = useContext(RootStoreContext);
  const [isOpen, setIsOpen] = useState(false);

	return (
		<CSSTransition
			in={store.gameStore?.inventoryFullNotif}
			timeout={{ enter: 300, exit: 400 }}
			classNames="alert"
			unmountOnExit
			onEnter={async () => {
				await Algorithm.delay(2000);
				store.gameStore?.setInventoryFullNotif(false);
			}}
		>
			<>
				<Notification color="danger">
					Inventory Full! Can't acquire more item.
					<Button
						remove
						onClick={() => {
                            store.gameStore?.setInventoryFullNotif(false);
						}}
					/>
				</Notification>
			</>
		</CSSTransition>
	);
};

export default observer(ItemDescModal);


/* <OpenModal modal={{ closeOnBlur: true }}>
      <Modal.Card>
        <Modal.Card.Head>
          <Modal.Card.Title>
            Title
          </Modal.Card.Title>
        </Modal.Card.Head>
        <Modal.Card.Body>
          <Media>
            <Media.Item renderAs="figure" position="left">
              <Image size={64} alt="64x64" src="http://bulma.io/images/placeholders/128x128.png" />
            </Media.Item>
            <Media.Item>
              <Content>
                <p>
                  <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
                  <br />
                  If the children of the Modal is a card, the close button will be on the Card Head instead than the top-right corner
                  You can also pass showClose = false to Card.Head to hide the close button
                </p>
              </Content>
              <Level breakpoint="mobile">
                <Level.Side align="left">
                  <Button link>Like</Button>
                  <Button link>Share</Button>
                </Level.Side>
              </Level>
            </Media.Item>
          </Media>
        </Modal.Card.Body>
        <Modal.Card.Foot style={{ alignItems: 'center', justifyContent: 'center' }}>
          <p>
            Lorem Ipsum...
          </p>
        </Modal.Card.Foot>
      </Modal.Card>
    </OpenModal> */