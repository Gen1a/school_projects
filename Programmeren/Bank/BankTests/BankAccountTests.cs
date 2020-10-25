using Bank;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace BankTests
{
    [TestClass]
    public class BankAccountTests
    {
        [TestMethod]
        public void Debet_WithValidAmount_UpdatesBalance()
        {
            // Arrange
            double beginningBalance = 11.99;
            double debetAmount = 4.55;
            double expected = 7.44;
            BankAccount account = new BankAccount("Mr. Tom Vervoort", beginningBalance);

            // Act
            account.Debet(debetAmount);

            // Assert
            double actual = account.Balance;
            Assert.AreEqual(expected, actual, 0.001, "Account not debeted correctly");
        }

        [TestMethod]
        public void Debet_WhenAmountIsLessThanZero_ShouldThrowArgumentOutOfRange()
        {
            // Arrange
            double beginningBalance = 11.99;
            double debetAmount = -100.00;
            BankAccount account = new BankAccount("Mr. Tom Vervoort", beginningBalance);
            // Act and assert
            Assert.ThrowsException<System.ArgumentOutOfRangeException>(() =>
            account.Debet(debetAmount));
        }

        [TestMethod]
        public void Debet_WhenAmountIsMoreThanBalance_ShouldThrowArgumentOutOfRange()
        {
            // Arrange
            double beginningBalance = 11.99;
            double debetAmount = 15.00;
            BankAccount account = new BankAccount("Mr. Tom Vervoort", beginningBalance);
            // Act
            try
            {
                account.Debet(debetAmount);
            }
            catch (ArgumentOutOfRangeException e)
            {
                // Assert
                StringAssert.Contains(e.Message, BankAccount.DebetAmountExceedsBalanceMessage);
            }
        }

        [TestMethod]
        public void Credit_CreditAmountIsLessThanZero_ThrowsArgumentOutOfRange()
        {
            // Arrange
            double beginningBalance = 10.00;
            double creditAmount = -10.00;
            BankAccount account = new BankAccount("Mr. Tom Vervoort", beginningBalance);

            // Act
            try
            {
                account.Credit(creditAmount);
            }
            catch (ArgumentOutOfRangeException e)
            {
                // Assert
                StringAssert.Contains(e.Message, BankAccount.CreditAmountLessThanZeroMessage);
            }
        }

        [TestMethod]
        public void Credit_WithValidAmount_UpdatesBalance()
        {
            // Arrange
            double beginningBalance = 10.00;
            double creditAmount = 25.00;
            double expected = 35.00;
            BankAccount account = new BankAccount("Mr. Tom Vervoort", beginningBalance);

            // Act
            account.Credit(creditAmount);

            // Assert
            double actual = account.Balance;
            Assert.AreEqual(expected, actual, 0.001, "Account not credited correctly");
        }
    }
}
