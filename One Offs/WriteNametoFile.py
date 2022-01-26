name = input("What is your name? ")

with open("guest.txt", "w") as file:
    file.write(name)