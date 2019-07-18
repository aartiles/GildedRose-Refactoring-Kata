import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';
import { readFileSync } from 'fs';

describe('Gilded Rose', function () {
  it('Golden Master', function() {
    const items = [
      new Item("+5 Dexterity Vest", 10, 20), //
      new Item("Aged Brie", 2, 0), //
      new Item("Elixir of the Mongoose", 5, 7), //
      new Item("Sulfuras, Hand of Ragnaros", 0, 80), //
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
      // this conjured item does not work properly yet
      new Item("Conjured Mana Cake", 3, 6)];
  
  
    const lines: Array<Item> = [];
    const gildedRose = new GildedRose(items);
    var days: number = 2;
    for (let i = 0; i < days; i++) {
        console.log("-------- day " + i + " --------");
        console.log("name, sellIn, quality");
        items.forEach(element => {
            lines.push(element);
        });
        gildedRose.updateQuality();
    }
  
    const goldenMaster = readFileSync('test/golden-master.json');
    expect(goldenMaster.toString('UTF8'), JSON.stringify(lines));
  });
});
