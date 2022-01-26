def reverse_string(string):        
    reverse_string = ""    
    for index in range(len(string) - 1, -1, -1):
        reverse_string += string[index]        
    return reverse_string

def is_palindrome(string):        
    return string == reverse_string(string)

user_input = input("Enter a word: ")

if is_palindrome(user_input):
    print(f"{user_input} is a palindrome")
else:
    print(f"{user_input} is not a palindrome")