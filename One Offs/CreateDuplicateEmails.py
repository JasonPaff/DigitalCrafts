import random
import string

def create_email():
    email = ""
    length = [4,5,6,7,8]
    suffixes = ["@gmail.com", "@yahoo.com", "@aol.com"]

    for index in range(0, random.choice(length)):
        email += random.choice(string.ascii_letters)
    return email + random.choice(suffixes)

emails = []

for index in range(0,30):
    emails.append(f"{create_email()},\n")

    if random.randrange(1,100) <= 10:
        emails.append(emails[len(emails) - 1])

with open("emails.txt", "w") as file:
    for email in emails:
        file.write(email)