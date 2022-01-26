import GroceryItem

class ShoppingList:
    def __init__(self, title, address):
        self.title = title
        self.address = address
        self.grocery_items = []

    def add_item(self, item):
        self.grocery_items.append(item)

    def has_items(self):
        if len(self.grocery_items) > 0:
            return True
        return False