def find_sum_of_three_largest_numbers_in_array (nums):    
    nums = bubble_sort_largest_to_smallest(nums)
    return nums[0] + nums[1] + nums[2]
    
def bubble_sort_largest_to_smallest (numbers):
    for first in range(0, len(numbers) - 1):
        for index in range(0, len(numbers) - first - 1):
            if (numbers[index] < numbers[index + 1]):
                temp = numbers[index]
                numbers[index] = numbers[index + 1]
                numbers[index + 1] = temp
    return numbers            

array = [141, 1 , 17, -7, -17, -27, 18, 541, 8, 7, 7]

print(array)

sum = find_sum_of_three_largest_numbers_in_array(array)

print(sum)