export class Item {
    name: string;
    sellIn: number;
    quality: number;
    private good: Good;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
        if (name === 'Aged Brie') {
            this.good = new AgedBrie(name, sellIn, quality);
        }
        else this.good = new Good(name, sellIn, quality);
    }

    update() {
        this.updateSellIn();
        if (this.name === 'Aged Brie') {
            this.good.update();
            this.quality = this.good.quality();
            this.sellIn = this.good.sellIn();
        }
        else if (this.name === 'Backstage passes to a TAFKAL80ETC concert') {
            this.updateBackstagePasses();
        }
        else {
            this.updateStandardItem();
        }
    }

    private updateStandardItem() {
        this.decreaseQuality();
        if (this.sellIn < 0) this.decreaseQuality();
    }

    private updateBackstagePasses() {
        this.increaseQuality();
        if (this.sellIn < 11) {
            this.increaseQuality();
        }
        if (this.sellIn < 6) {
            this.increaseQuality();
        }
        if (this.sellIn < 0) {
            this.quality = 0;
        }
    }

    private updateAgedBrie() {
        this.increaseQuality();
        if (this.sellIn < 0) this.increaseQuality();
    }

    private decreaseQuality() {
        if (this.quality > 0 && this.name !== 'Sulfuras, Hand of Ragnaros') this.quality = this.quality - 1;
    }

    private increaseQuality() {
        if (this.quality < 50) this.quality = this.quality + 1;
    }

    private updateSellIn() {
        if (this.name !== 'Sulfuras, Hand of Ragnaros') {
            this.sellIn = this.sellIn - 1;
        }
    }
}

class Good {
    constructor(readonly _name: string, protected _sellIn: number, protected _quality: number) {}

    update(): void {
        this.updateSellIn();
        this.decreaseQuality();
        if (this._sellIn < 0) this.decreaseQuality();
    }

    sellIn(): number {
        return this._sellIn;
    }

    quality(): number {
        return this._quality;
    }

    protected increaseQuality() {
        if (this._quality < 50) this._quality = this._quality + 1;
    }

    private decreaseQuality() {
        if (this._quality > 0) this._quality = this._quality - 1;
    }

    protected updateSellIn() {
        this._sellIn = this._sellIn - 1;
    }


}

class AgedBrie extends Good {
    update() {
        this.updateSellIn();
        this.increaseQuality();
        if (this._sellIn < 0) this.increaseQuality();
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
