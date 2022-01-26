import json

contents = ""

with open("users.json") as file:
    contents = json.load(file)

for content in contents:
    print(f"name: {content['name']}")
    print(f"age: {content['age']}")