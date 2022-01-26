def find_sums(numbers):
    for a in range(len(numbers)):
        for b in range (len(numbers)):
            if (numbers[a] + numbers[b]) == 2020:
                return numbers[a] * numbers[b]
    return 0

numbers = [1977,1802,1856,1309,2003,1854,1898,1862,1857,542,1616,1599,1628,1511,1848,1623,1959,1693,1444,
        1211,1551,1399,2010,10,1855,1538,1869,1664,1719,1241,1875,1733,1547,1813,1531,1773,624,1336,1897,1179,1258]

print(find_sums(numbers))