def factorial (number):
    if number <= 0:
        return 0        
    for index in range(2, number):
        number *= index    
    return number

user_number = int(input("Enter a whole number: "))

print(factorial(user_number))