import unittest
from GroceryItem import GroceryItem
from ShoppingList import ShoppingList

class GroceryAppUnitTest(unittest.TestCase):
    def setUp(self):
        self.shopping_list = ShoppingList("Kroger", "123 Main Street")
        self.grocery_item = GroceryItem("Eggs", 2.99, 1)
        
    def test_add_item_to_shopping_list(self):        
        original_length = len(self.shopping_list.grocery_items)
        self.shopping_list.add_item(self.grocery_item)
        new_length = len(self.shopping_list.grocery_items)
        self.assertNotEqual(original_length, new_length)

unittest.main()