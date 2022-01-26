def is_prime(number):    
    if number <= 1:
        return False
    for index in range(2, number):
        if number % index == 0:
            return False    
    return True

user_number = int(input("Enter a number: "))

if (is_prime(user_number)):
    print("Prime Number")
else:
    print("Not a Prime Number")