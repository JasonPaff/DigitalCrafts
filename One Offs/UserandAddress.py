class User:
    def __init__(self, first_name, last_name):
        self.first_name = first_name
        self.last_name = last_name
        self.addresses = []

    def add_address(self, address):
        self.addresses.append(address)

    def display_addresses(self):
        for address in self.addresses:
            print(f"{address.street} {address.city} {address.state}, {address.zip_code}")

class Address:    
    def __init__(self, street, city, state, zip_code):
        self.street = street
        self.city = city
        self.state = state
        self.zip_code = zip_code

new_user = User("Jason", "Paff")

home_address = Address("800 Leisure Lake Drive", "Warner Robins", "Georgia", 31088)

new_user.add_address(home_address)

work_address = Address("60 Leisure Lake Drive", "Warner Robins", "Georgia", 31088)

new_user.add_address(work_address)

new_user.display_addresses()