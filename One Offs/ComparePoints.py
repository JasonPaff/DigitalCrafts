def compare(a, b):
    points = [0,0]
    
    for index in range(0,3):
        if a[index] > b[index]:
            points = add_point_a(points)
        elif a[index] == b[index]:
            pass
        else:
            points = add_point_b(points)
    return points
        
def add_point_a(points):
    return [points[0] + 1, points[1]]

def add_point_b(points):
    return [points[0], points[1] + 1]

a = [1, 2, 3]
b = [3, 2 ,1]

print(compare(a, b))