while True: 
    try:
        number = int(input("Enter number: "))
        is_no_error = True
    except ValueError:
        print("invalid input")
        is_no_error = False

    if is_no_error:
        break