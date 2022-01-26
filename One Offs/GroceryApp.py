from ShoppingList import ShoppingList
from GroceryItem import GroceryItem

shopping_lists = []

def create_new_shopping_list():
    title = input("\nEnter the title for the shopping list: ")
    address = input(f"Enter the street address for {title}: ")
    shopping_lists.append(ShoppingList(title, address))        
    print(f"\nShopping List {title} created successfully")

def shopping_lists_to_display():
    if(len(shopping_lists) <= 0):
        print("\nno shopping lists")
        return False
    return True

def display_shopping_lists():
    if shopping_lists_to_display() == False:
        return

    print("")
    for index in range(len(shopping_lists)):
        shopping_list = shopping_lists[index]
        print(f"{index + 1}. {shopping_list.title} - {shopping_list.address}")

        for index in range(len(shopping_list.grocery_items)):
            grocery_item = shopping_list.grocery_items[index]
            print(f"    {index + 1}. {grocery_item.title} - ${grocery_item.price:.2f} qty:{grocery_item.quantity}")
        
def add_grocery_item_to_shopping_list():
    if shopping_lists_to_display() == False:
        return

    display_shopping_lists()

    while True:
        try:
            selection = int(input("\nEnter the number of the shoppping list you would like to add a grocery item to: "))
        except ValueError:
            print("\nnumbers only")
        else: 
            try:            
                if selection <= 0:
                    selection = 99    
                shopping_list = shopping_lists[selection - 1]
            except IndexError:                
                print("\nvalid numbers only")
            else:
                break

    title = input("\nEnter the title of the grocery item: ")

    while True:
        try:
            price = float(input("\nEnter the price of the grocery item: "))
        except ValueError:
            print("\nnumbers only")
        else:
            while True:
                try:
                    quantity = int(input("Enter the quantity of the grocery item: "))
                except ValueError:
                    print("\nnumbers only")
                else:                    
                    shopping_list.add_item(GroceryItem(title, price, quantity))
                    break
            break                 

def remove_shopping_list():
    if shopping_lists_to_display() == False:
        return

    display_shopping_lists()

    while True:
        try:
            selection = int(input("\nEnter the number of the shoppping list you would like to remove: "))
        except ValueError:
            print("\nnumbers only")
        else: 
            if selection > 0 and selection <= len(shopping_lists):
                del shopping_lists[selection - 1]
                print("\nshopping list deleted successfully")
                break    
            else:
                print("invalid selection")

def remove_grocery_item_from_shopping_list():
    if shopping_lists_to_display() == False:
        return

    display_shopping_lists()

    while True:
        try:
            selection = int(input("\nEnter the number of the shoppping list you would like to remove an item from: "))
        except ValueError:
            print("\nnumbers only")
        else: 
            if selection > 0 and selection <= len(shopping_lists):
                shopping_list = shopping_lists[selection - 1]
                print(f"\n{shopping_list.title}")

                for index in range(0, len(shopping_list.grocery_items)):
                    grocery_item = shopping_list.grocery_items[index]
                    print(f"{index + 1}. {grocery_item.title} - ${grocery_item.price:.2f} qty:{grocery_item.quantity}")

                while True:
                    try:
                        selection = int(input("\nEnter the number of the grocery item you would like to remove: "))
                    except ValueError:
                        print("\nnumbers only")
                    else:
                        if selection > 0 and selection <= len(shopping_list.grocery_items):
                            del shopping_list.grocery_items[selection - 1]
                            print("\ngrocery item deleted successfully")
                            break
                        else:
                            print("\ninvalid selection")
                break
            else:
                print("invalid selection")

while True:
    print("\n1. Create New Shopping List")
    print("2. Display Shopping Lists")
    print("3. Remove a Shopping List")
    print("4. Add Item to Shopping List")
    print("5. Remove Item from Shopping List")
    print("6. Quit")

    try:
        selection =  int(input("\nPlease select an option: "))
    except ValueError:
        print("\ninvalid selection")
    else:
        if(selection == 1):
            create_new_shopping_list()
        elif(selection == 2):
            display_shopping_lists()
        elif(selection == 3):
            remove_shopping_list()
        elif(selection == 4):
            add_grocery_item_to_shopping_list()
        elif(selection == 5):
            remove_grocery_item_from_shopping_list()
        elif(selection == 6):
            break
        else:
            print("\ninvalid selection")