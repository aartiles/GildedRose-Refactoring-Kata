import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {

    it('Once the sell by date has passed, Quality degrades twice as fast', function() {
        const gildedRose = new GildedRose();
        const items = gildedRose.updateQuality();
        expect(items.length).to.equal(0);
    });

    it('Cover line 23', function() {
        const gildedRose = new GildedRose([ new Item('foo', 0, 0) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(-1);
        expect(items[0].quality).to.equal(0);
    });

    it('Once the sell by date has passed, Quality degrades twice as fast', function() {
        const gildedRose = new GildedRose([ new Item('foo', 0, 3) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(-1);
        expect(items[0].quality).to.equal(1);
    });

    it('The Quality of an item is never negative', function() {
        const gildedRose = new GildedRose([ new Item('foo', 0, 1) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(-1);
        expect(items[0].quality).to.equal(0);
    });

    it('"Aged Brie" actually increases in Quality the older it gets', function() {
        const gildedRose = new GildedRose([ new Item('Aged Brie', 1, 1) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(0);
        expect(items[0].quality).to.equal(2);
    });

    it('"Aged Brie" actually increases twice as fast in Quality if sell by date has passed', function() {
        const gildedRose = new GildedRose([ new Item('Aged Brie', 0, 1) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(-1);
        expect(items[0].quality).to.equal(3);
    });

    it('The Quality of an item is never more than 50', function() {
        const gildedRose = new GildedRose([ new Item('Aged Brie', 1, 50) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(0);
        expect(items[0].quality).to.equal(50);
    });

    it('"Sulfuras", being a legendary item, never has to be sold or decreases in Quality', function() {
        const gildedRose = new GildedRose([ new Item('Sulfuras, Hand of Ragnaros', 0, 5) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(0);
        expect(items[0].quality).to.equal(5);
    });

    it('"Backstage passes", increases in Quality by 2 when there are 10 days or less', function() {
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 7, 1) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(6);
        expect(items[0].quality).to.equal(3);
    });

    it('"Backstage passes", increases in Quality by 3 when there are 5 days or less', function() {
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 2, 1) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(1);
        expect(items[0].quality).to.equal(4);
    });

    it('"Backstage passes", increases in Quality drops to 0 after the concert', function() {
        const gildedRose = new GildedRose([ new Item('Backstage passes to a TAFKAL80ETC concert', 0, 3) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(-1);
        expect(items[0].quality).to.equal(0);
    });

    xit('"Conjured" items degrade in Quality twice as fast as normal items', function() {
        const gildedRose = new GildedRose([ new Item('Conjured', 1, 3) ]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(0);
        expect(items[0].quality).to.equal(1);
    });

});
