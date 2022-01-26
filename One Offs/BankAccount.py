class BankAccount:
    def __init__(self, balance, account_number):
        self.account_number = account_number  
        self.balance = balance      
        print(f"you created an account with a starting balance of {balance} and an account number {account_number}")

    def deposit(self):
        self.balance += input(f"How much would you like to deposit(acc. #{self.account_number}): ")
        print("deposit successful")

    def withdraw(self):
        self.balance -= input(f"How much would you like to withdraw(acc. #{self.account_number}): ")
        print(f"withdrawal successful")

    def transfer(self, amount, transfer_account):
        self.balance -= amount
        transfer_account.balance += amount
        print(f"you transfered ${amount} from account #{self.account_number} to account #{transfer_account.account_number}")

checking_account = BankAccount(1000, 123)
savings_account = BankAccount(1000, 456)

checking_account.deposit()
checking_account.withdraw()