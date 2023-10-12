import { expect } from "@playwright/test";
import { Navigation } from "./Navigation";
import { isDesktopViewport } from "../utils/isDesktopViewport";

export class ProductsPage {
  
  constructor(page) {
    this.page = page;
    this.productButton = page.locator("[data-qa='product-button']");
    this.sortDropDown = page.locator("[data-qa='sort-dropdown']");
    this.productsItemPrice = page.locator("[datatype='product-price']");
    this.basketCountBeforeAdding;
    this.basketCountAfterAdding;
  }

  goto = async () => {
    await this.page.goto('/');
  }
  
  addProductToBasket = async (index) => {
    const navigation = new Navigation(this.page);
    await expect(this.productButton.nth(index)).toHaveText("Add to Basket");
    // only desktop viewport.
    if (isDesktopViewport(this.page)){
      this.basketCountBeforeAdding = await navigation.getBasketCount();
    }
    
    await this.productButton.nth(index).click();
    await expect(this.productButton.nth(index)).toHaveText("Remove from Basket");

    // only desktop viewport.
    if (isDesktopViewport(this.page)){
      this.basketCountAfterAdding = await navigation.getBasketCount();
      expect(this.basketCountAfterAdding ).toBeGreaterThan(this.basketCountBeforeAdding);
    }
  }

  sortByCheapest = async () => {
    await this.productsItemPrice.first().waitFor();
    const productsPriceBeforeSorting = await this.productsItemPrice.allInnerTexts();
    console.warn({productsPriceBeforeSorting});
    await this.sortDropDown.waitFor();
    await this.sortDropDown.selectOption('price-asc');
    const productsPriceAfterSorting = await this.productsItemPrice.allInnerTexts();
    console.warn({productsPriceAfterSorting});
    expect(productsPriceBeforeSorting).not.toEqual(productsPriceAfterSorting);
  }

  sortBySpensive = async () => {
    await this.productsItemPrice.first().waitFor();
    const productsPriceBeforeSorting = await this.productsItemPrice.allInnerTexts();
    console.warn({productsPriceBeforeSorting});
    await this.sortDropDown.waitFor();
    await this.sortDropDown.selectOption('price-desc');
    const productsPriceAfterSorting = await this.productsItemPrice.allInnerTexts();
    console.warn({productsPriceAfterSorting});
    expect(productsPriceBeforeSorting).not.toEqual(productsPriceAfterSorting);
  }
}
