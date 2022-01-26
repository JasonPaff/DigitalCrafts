while True:
    response = input("Why do you like programming(enter 'q' to quit)? ")

    if response == 'q' or response == 'Q':
        break

    with open("reasons.txt", "a") as file:
        file.write(f"{response}\n")