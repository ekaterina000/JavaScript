N = int(input())
result = []

for i in range(1, N + 1):
    counter = 0 
    for y in range(1, i): 
        if i % y == 0: 
            counter += y 
    if counter == i: 
        result.append(i) 

print(*result, sep=' ')