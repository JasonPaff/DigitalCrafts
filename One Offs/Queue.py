class Queue:
    def __init__(self):
        self.items = []

    def enqueue(self,value):
        if value is not None:
            self.items.append(value)

    def dequeue(self):
        if (len(self.items) > 0):
            item = self.items[0]
            self.items.remove(item)
            return item

queue = Queue()

queue.enqueue(10)
queue.enqueue(12)
queue.enqueue(45)

print(queue.dequeue())
print(queue.dequeue())
print(queue.dequeue())
print(queue.dequeue())