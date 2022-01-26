def number_of_letter(letter, sentence):
    total = 0

    for index in range(0, len(sentence)):
        if(sentence[index] == letter):
            total += 1

    return total

sentence = input("Enter a sentence: ")
print(f"a: {number_of_letter('a', sentence)}")
print(f"e: {number_of_letter('e', sentence)}")
print(f"i: {number_of_letter('i', sentence)}")
print(f"o: {number_of_letter('o', sentence)}")
print(f"u: {number_of_letter('u', sentence)}")