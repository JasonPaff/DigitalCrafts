def fibonacci(number):
    a = 0
    b = 1
    if number == 0:
        print(a)
    elif number == 1:
        print(a)
        print(b)
    else:
        print(a)
        print(b)
        while True:
            c = a + b            
            a = b
            b = c

            if (c >= number):
                break

            print(c)

number = int(input("Enter a number: "))

fibonacci(number)