#long way
#def powers(a,b):
    #result = 1
    #for index in range(0, b):        
       # result *= a
    #return result

#short way
def powers(a,b):
    return a ** b

number = int(input("Enter number: "))
power = int(input("Enter power: "))
print(f"{number} to the power of {power} is {powers(number,power)}")