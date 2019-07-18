export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality() {
        for (let day = 0; day < this.items.length; day++) this.updateDay(day);
        return this.items;
    }

    private updateDay(day: number) {
        if (this.items[day].name != 'Aged Brie' && this.items[day].name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[day].quality > 0) {
                if (this.items[day].name != 'Sulfuras, Hand of Ragnaros') {
                    this.items[day].quality = this.items[day].quality - 1;
                }
            }
        }
        else {
            if (this.items[day].quality < 50) {
                this.items[day].quality = this.items[day].quality + 1;
                if (this.items[day].name == 'Backstage passes to a TAFKAL80ETC concert') {
                    if (this.items[day].sellIn < 11) {
                        if (this.items[day].quality < 50) {
                            this.items[day].quality = this.items[day].quality + 1;
                        }
                    }
                    if (this.items[day].sellIn < 6) {
                        if (this.items[day].quality < 50) {
                            this.items[day].quality = this.items[day].quality + 1;
                        }
                    }
                }
            }
        }
        if (this.items[day].name != 'Sulfuras, Hand of Ragnaros') {
            this.items[day].sellIn = this.items[day].sellIn - 1;
        }
        if (this.items[day].sellIn < 0) {
            if (this.items[day].name != 'Aged Brie') {
                if (this.items[day].name != 'Backstage passes to a TAFKAL80ETC concert') {
                    if (this.items[day].quality > 0) {
                        if (this.items[day].name != 'Sulfuras, Hand of Ragnaros') {
                            this.items[day].quality = this.items[day].quality - 1;
                        }
                    }
                }
                else {
                    this.items[day].quality = this.items[day].quality - this.items[day].quality;
                }
            }
            else {
                if (this.items[day].quality < 50) {
                    this.items[day].quality = this.items[day].quality + 1;
                }
            }
        }
    }
}
