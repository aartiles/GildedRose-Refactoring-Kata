export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }

    update() {
        if (this.name === 'Aged Brie' || this.name === 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.quality < 50) {
                this.increaseQuality();
                if (this.name == 'Backstage passes to a TAFKAL80ETC concert') {
                    if (this.sellIn < 11) {
                        if (this.quality < 50) {
                            this.increaseQuality();
                        }
                    }
                    if (this.sellIn < 6) {
                        if (this.quality < 50) {
                            this.increaseQuality();
                        }
                    }
                }
            }
        }
        else {
            if (this.quality > 0) {
                if (this.name != 'Sulfuras, Hand of Ragnaros') {
                    this.decreaseQuality();
                }
            }
        }
        this.updateSellIn();
        if (this.sellIn < 0) {
            if (this.name === 'Aged Brie') {
                if (this.quality < 50) {
                    this.increaseQuality();
                }
            }
            else {
                if (this.name != 'Backstage passes to a TAFKAL80ETC concert') {
                    if (this.quality > 0) {
                        if (this.name != 'Sulfuras, Hand of Ragnaros') {
                            this.decreaseQuality();
                        }
                    }
                }
                else {
                    this.quality = this.quality - this.quality;
                }
            }
        }
    }

    private decreaseQuality() {
        this.quality = this.quality - 1;
    }

    private increaseQuality() {
        this.quality = this.quality + 1;
    }

    private updateSellIn() {
        if (this.name != 'Sulfuras, Hand of Ragnaros') {
            this.sellIn = this.sellIn - 1;
        }
    }
}


export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        for (let i = 0; i < this.items.length; i++) this.items[i].update();
        return this.items;
    }
}
