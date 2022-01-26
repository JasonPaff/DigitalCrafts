def display_menu():
    print("Press 1 to add task")
    print("Press 2 to delete task")
    print("Press 3 to view all tasks")
    print("Press q to quit\n")

def add_task():
    title = input("Enter a title: ")
    priority = input("Enter the priority: ")
    tasks.append({"title" : title, "priority" : priority})    
    print("\ntask added\n")

def delete_task():
    view_tasks()
    delete = int(input("Enter number of the task to delete: "))
    del tasks[delete - 1]
    print(f"\ntask #{delete} deleted\n")

def view_tasks():    
    if len(tasks) == 0:
        print("no tasks\n")
        return
    counter = 1
    for task in tasks:        
        print(f"{counter} - {task['title']} - {task['priority']} ")
        counter += 1
    print("")

tasks = []

print("")

while True:
    display_menu()

    choice = input("Enter a choice: ")
    print("")

    if(choice == '1'):
        add_task()

    elif(choice == '2'):
        delete_task()
    elif(choice == '3'):
        view_tasks()
    elif(choice == 'q'):
        break
    else:
        print("Invalid Choice\n")