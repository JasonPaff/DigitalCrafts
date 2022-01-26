def get_number_of_valid_passwords(required_letter, min_length, max_length):
    counter = 0
    for password in passwords:
        for char in password:
            if char == required_letter and len(password) > min_length and len(password) < max_length:
                counter += 1
                break
    return counter


passwords = ["aAA2424","ERI334","LIKO332","FKE33","dfk42p3","aaaer34","rree324","uewo43u","eoitn4lka","32095jfdsklj","eoekjlks","ljsjste","3uvdnEE","EErhjs","OEIRn3"]

required_letter = input("What is the required letter? ")
min_length = int(input("What is the minimum password length? "))
max_length = int(input("What is the mmaximum password length? "))

number = get_number_of_valid_passwords(required_letter, min_length, max_length)

print(f"{number} passwords are valid")