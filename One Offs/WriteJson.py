import json

names = []

while True:
    name = input("What is your name (q to quit)? ")

    if (name == 'q'):
        break
    
    else:
        while True:
            try:
                age = input("What is your age? ")
            except ValueError:
                print ("numbers only")
            else:
                names.append({"name" : name, "age":age})
                break

with open ("users.json", "w") as file:
    json.dump(names, file)