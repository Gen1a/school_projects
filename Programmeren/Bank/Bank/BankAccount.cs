using System;

namespace Bank
{
    public class BankAccount
    {
        private readonly string m_customerName;
        private double m_balance;
        private BankAccount() { }
        public BankAccount(string customerName, double balance)
        {
            m_customerName = customerName;
            m_balance = balance;
        }
        public string CustomerName
        {
            get { return m_customerName; }
        }
        public double Balance
        {
            get { return m_balance; }
        }

        public void Debet(double debetAmount)
        {
            if (debetAmount > m_balance)
            {
                throw new ArgumentOutOfRangeException("debetAmount", debetAmount, DebetAmountExceedsBalanceMessage);
            }
            if (debetAmount < 0)
            {
                throw new ArgumentOutOfRangeException("debetAmount", debetAmount, DebetAmountLessThanZeroMessage);
            }
            m_balance -= debetAmount;
        }

        public void Credit(double creditAmount)
        {
            if (creditAmount < 0)
            {
                throw new ArgumentOutOfRangeException("creditAmount", creditAmount, CreditAmountLessThanZeroMessage);
            }
            m_balance += creditAmount;
        }

        public const string DebetAmountExceedsBalanceMessage = "Debet amount exceeds balance.";
        public const string DebetAmountLessThanZeroMessage = "Debet amount is less than zero";
        public const string CreditAmountLessThanZeroMessage = "Credit amount is less than zero";


    }
}
