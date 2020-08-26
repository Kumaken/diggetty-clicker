import { TextureKeys } from '../phaser/config/TextureKeys';
import APPLE from '../assets/items/apple.png';
import BOOK from '../assets/items/book.png';
import GOLD_INGOT from '../assets/items/gold_ingot.png';
import POTION from '../assets/items/potion.png';

export const ItemData = {
	Apple: {
		name: 'Apple',
        attributes: '+5 tap damage',
        description: 'Eat one apple a day, keeps the doctor away!',
        textureKey: TextureKeys.APPLE,
        texturePath: APPLE
	},
	Book: {
		name: 'Book',
        attributes: '1 free upgrade',
        description: 'Books are a uniquely portable magic.',
        textureKey: TextureKeys.BOOK,
        texturePath: BOOK
	},
	GoldIngot: {
		name: 'Gold Ingot',
        attributes: '+50 gold',
        description: 'Gold is a treasure, and he who possesses it does all he wishes to in this world.',
        textureKey: TextureKeys.GOLD_INGOT,
        texturePath: GOLD_INGOT
    },
    Potion:{
        name: 'Potion',
        attributes: '+2 dps',
        description: "What doesn't kill you makes you stronger.",
        textureKey: TextureKeys.POTION,
        texturePath: POTION
    }
};
