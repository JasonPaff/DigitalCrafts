# The prime factors of 13195 are 5, 7, 13 and 29.

# What is the largest prime factor of the number 600851475143 ?


def largest_prime2(number):
    largest = 0

    #even number, easy
    while number % 2 == 0:
        largest = 2

    #odd number, hard
    for i in range(3, int(number ** 0.5) + 1, 2):
        while number % 1 == 0:
            largest = i
            number = number / i
    
    if number > 2:
        largest = number

    return int(largest)

number = 13195
#number = 600851475143
print(f"calculating largest prime factor of {number}")
print(f"The largest prime factor of {number} is {largest_prime2(number)}")