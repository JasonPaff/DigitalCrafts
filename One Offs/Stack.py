class Stack:
    def __init__(self):
        self.stack = []

    def push(self, value):
        self.stack.append(value)

    def pop(self):
        try:
            item = self.stack[-1]
        except IndexError:
            print("no more items in the stack")
            return ""
        else:
            self.stack.remove(item)
            return item

stack = Stack()

stack.push(3)
stack.push(10)
stack.push(2)

print(stack.pop())
print(stack.pop())
print(stack.pop())
print(stack.pop())