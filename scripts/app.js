(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

// LIST #1 - controller
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var list1 = this;
  // Use service to create new shopping list
  list1.items = ShoppingListCheckOffService.getItems();

  for (var i = 0; i < list1.items.length; i++){
    console.log(i+". "+ list1.items[i].quantity +" "+list1.items[i].name );
  }

  list1.removeItemAndAddToBoughtList = function (itemIndex) {
    var bItem = {
      name: "",
      quantity: ""
    };
    bItem = (ShoppingListCheckOffService.getItems())[itemIndex];
    ShoppingListCheckOffService.addBoughtItem(bItem.name, bItem.quantity);
    ShoppingListCheckOffService.removeItem(itemIndex);
  };
}

// LIST #2 - controller
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var list2 = this;

  //get boutItems list from the ShoppingListCheckOffService
  list2.boughtItems = ShoppingListCheckOffService.getBoughtItems();;
  list2.itemName = "";
  list2.itemQuantity = "";

  list2.addBoughtItem = function () {
    try {
      ShoppingListCheckOffService.addBoughtItem(list2.itemName, list2.itemQuantity);
    } catch (error) {
      list2.errorMessage = error.message;
    }

  }

  list2.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeItem(itemIndex);
  };
}

// ShoppingListCheckOffService definition
function ShoppingListCheckOffService() {
  var service = this;
  //setup list of items to shop for / buy
  var items = [
  {
    name: "Cartons of Milk",
    quantity: "2"
  },
  {
    name: "Dozens of Donuts",
    quantity: "20"
  },
  {
    name: "Jars of Cookies",
    quantity: "300"
  },
  {
    name: "Bars of Dark Chocolate",
    quantity: "5"
  },
  {
    name: "Sandwitches",
    quantity: "4"
  }

];

  // List of bought items
  var boughtItems = [];

  service.addBoughtItem = function (itemName, quantity) {
    var boughtItem = {
      name: itemName,
      quantity: quantity
    };
    boughtItems.push(boughtItem);
  };

  service.addItem = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    items.push(item);
  };

  service.removeItem = function (itemIdex) {
    items.splice(itemIdex, 1);
  };

  service.getItems = function () {
    return items;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };
}

})();
