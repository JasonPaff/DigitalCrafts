from datetime import datetime

class PoolTable:
    def __init__(self, table_number):
        self.is_occupied = False 
        self.start_time = datetime.now()
        self.table_number = table_number

    def close_table(self):
        self.is_occupied = False
        self.end_time = datetime.now()
        self.calculate_time_played()
        self.total_cost = self.get_total_cost()

    def open_table(self):
        self.is_occupied = True
        self.start_time = datetime.now()
    
    def calculate_time_played(self):
        current_time = datetime.now()        
        total_seconds = (current_time - self.start_time).total_seconds()

        minutes, seconds = divmod(total_seconds, 60)
        hours, minutes = divmod(minutes, 60)
        
        self.seconds_played = int(seconds)
        self.minutes_played = int(minutes)
        self.hours_played = int(hours)

    def get_total_cost(self):
        cost_per_hour = 30
        cost_per_minute = cost_per_hour / 60
        cost_per_second = cost_per_minute / 60

        total = cost_per_hour * self.hours_played
        total += cost_per_minute * self.minutes_played
        total += cost_per_second * self.seconds_played

        return total