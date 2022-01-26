def PerfectSquares(a, b):
    number_of_perfect_squares = 0

    for index in range(a, b + 1):
        if (index ** 0.5) - int(index ** 0.5) == 0:
            print(f"{index} is a perfect square")
            number_of_perfect_squares += 1

    return number_of_perfect_squares

start = int(input("Enter first number: "))
end = int(input("Enter second number: "))
print(f"The number of perfect squares between {start} and {end} is {PerfectSquares(start,end)}")