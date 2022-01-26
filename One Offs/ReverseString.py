user_input = input("Enter a word: ")

reverse_user_input = ""

for index in range(len(user_input) - 1, -1, -1):
    print (user_input[index])
    reverse_user_input += user_input[index]

print(reverse_user_input)