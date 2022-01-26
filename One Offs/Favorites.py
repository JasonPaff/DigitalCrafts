while True:
    response = input("What is your favorite dish(enter 'q' to quit)? ")

    if response == 'q' or response == 'Q':
        break

    with open("dishes.txt", "a") as file:
        file.write(f"{response}")

try:
    with open("dishes.txt") as file:
        content = file.read()
        print(content)
except FileNotFoundError:
    print("no responses")    