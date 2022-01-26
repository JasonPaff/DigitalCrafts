def get_emails(file):
    with open(file) as file:
        return file.readlines()

def split_emails(emails):
    split_emails = []
    for email in emails:
        words = email.split(',')
        for word in words:
            if word != '\n':
                split_emails.append(word)
    return split_emails

def remove_duplicates(emails):
    new_list = []
    for email in emails:
        if email not in new_list:
            new_list.append(email)
    return new_list

def save_duplicates(emails):
    with open("duplicate-free-email-list.txt", "w") as file:
        for email in emails:
            file.write(f"{email}\n")

emails = get_emails("emails.txt")

emails = split_emails(emails)

emails = remove_duplicates(emails)

save_duplicates(emails)