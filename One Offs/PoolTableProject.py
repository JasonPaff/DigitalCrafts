from PoolTable import PoolTable
from datetime import datetime
import json

pool_tables = []
log_dump = []

# display all pool tables and occupied, start time and time played for any tables in use
def table_display():
    print("")
    for pool_table in pool_tables:
        print(f"{pool_table.table_number}. {pool_table_occupied_string(pool_table)} {pool_table_start_time_string(pool_table)} {pool_table_time_played_string(pool_table)} {pool_table_total_cost_string(pool_table)}")

# convert pool table time played to a display string
def pool_table_time_played_string(pool_table):
    if(pool_table.is_occupied):
        pool_table.calculate_time_played()
        if pool_table.minutes_played <= 0:
            return f" - {pool_table.seconds_played} second(s) played"
        elif pool_table.hours_played <= 0:
            return f" - {pool_table.minutes_played} minute(s) and {pool_table.seconds_played} second(s) played"
        else:
            return f" - {pool_table.hours_played} hour(s) and {pool_table.minutes_played} minute(s) and {pool_table.seconds_played} second(s) played"
    return ""

# convert pool time datetime to a display string
def pool_table_start_time_string(pool_table):
    if pool_table.is_occupied:
        return f" - start time: {pool_table.start_time.strftime('%I:%M PM')}"
    return ""

# convert is_occupied status to a display string
def pool_table_occupied_string(pool_table):
    if(pool_table.is_occupied):
        return "Occupied"
    return "Not Occupied"

def pool_table_total_cost_string(pool_table):
    if pool_table.is_occupied:
        total_cost = pool_table.get_total_cost()
        return f" - cost: ${total_cost:.2f}"
    return ""

# open a pool table
def open_table():
    table_display()
    
    try:
        selection = int(input("\nSelect a table to open: "))
    except ValueError:
        print("\nnumbers only")
    else:
        if selection > 0 and selection <= 12:
            pool_table = pool_tables[selection - 1]
            if pool_table.is_occupied:
                print(f"\npool table number {pool_table.table_number} is currently occupied")
            else:
                pool_table.open_table()
                log_table_in(pool_table)
                print(f"\npool table number {pool_table.table_number} is now open")
        else:
            print("\nvalid table numbers only")

# close a pool table
def close_table():
    table_display()

    try:
        selection = int(input("\nSelect a table to close: "))
    except ValueError:
        print("\nnumbers only")
    else:
        if selection > 0 and selection <= 12:
            pool_table = pool_tables[selection - 1]
            if pool_table.is_occupied == False:
                print(f"\npool table number {pool_table.table_number} is not currently occupied")
            else:
                pool_table.close_table()
                log_table_out(pool_table)
                print(f"\npool table number {pool_table.table_number} is now closed")
        else:
            print("\nvalid table numbers only")

# log opened pool table info to a file
def log_table_in(pool_table):
    log_dump.append({"table number: " : pool_table.table_number})
    log_dump.append({"table status: " : "table opened"})
    log_dump.append({"start time: " : pool_table.start_time.strftime('%m-%d-%Y %I:%M %p')})
    write_to_log()


# log closed pool table info to a file
def log_table_out(pool_table):
    log_dump.append({"table number: " : pool_table.table_number})
    log_dump.append({"table status: " : "table closed"})
    log_dump.append({"start time: " : pool_table.start_time.strftime('%m-%d-%Y %I:%M %p')})
    log_dump.append({"end time: " : pool_table.end_time.strftime('%m-%d-%Y %I:%M %p')})
    log_dump.append({"total time: " : f"{pool_table.hours_played} hours, {pool_table.minutes_played} minutes, {pool_table.seconds_played} seconds "})
    log_dump.append({"total cost: $" : f"{pool_table.get_total_cost():.2f}"})
    write_to_log()

def write_to_log():
    date = datetime.now().strftime("%m-%d-%Y")
    with open(f"{date}.json", 'w') as file:
        json.dump(log_dump, file)


# create 12 pool tables
for index in range(0, 12):
    pool_tables.append(PoolTable(index + 1))

# main menu
while True:
    print("\n1. Table Display")
    print("2. Open Table")
    print("3. Close Table")
    print("4. Exit")

    try:
        selection = int(input("\nSelect an option: "))
    except ValueError:
        print("\nnumbers only")
    else:
        if selection == 1:
            table_display()
        elif selection == 2:
            open_table()
        elif selection == 3:
            close_table()
        elif selection == 4:
            break   