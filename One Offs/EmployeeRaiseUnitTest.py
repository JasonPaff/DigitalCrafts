import unittest

class Employee:
    def __init__(self, first_name, last_name, salary):
        self.first_name = first_name
        self.last_name = last_name
        self.salary = salary
        
    def give_raise(self, amount=5000):
        self.salary += amount

class EmployeeTests(unittest.TestCase):
    def setUp(self):
        self.employee = Employee("Jason", "Paff", 100000)

    def test_give_default_raise(self):
        self.employee.give_raise()
        self.assertEqual(self.employee.salary, 105000)

    def test_give_custom_raise(self):
        self.employee.give_raise(7500)
        self.assertEqual(self.employee.salary, 107500)

unittest.main()
