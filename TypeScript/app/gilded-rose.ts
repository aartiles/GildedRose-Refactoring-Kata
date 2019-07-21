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
        else if (name === 'Backstage passes to a TAFKAL80ETC concert') {
            this.good = new BackstagePass(name, sellIn, quality);
        }
        else if (name === 'Sulfuras, Hand of Ragnaros') {
            this.good = new LegendaryItem(name, sellIn, quality);
        }
        else this.good = new Good(name, sellIn, quality);
    }

    update() {
        this.good.update();
        this.quality = this.good.quality();
        this.sellIn = this.good.sellIn();
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

class BackstagePass extends Good {
    update() {
        this.updateSellIn();
        this.increaseQuality();
        if (this._sellIn < 11) this.increaseQuality();
        if (this._sellIn < 6) this.increaseQuality();
        if (this._sellIn < 0) this._quality = 0;
    }
}

class LegendaryItem extends Good {
    update() {
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
