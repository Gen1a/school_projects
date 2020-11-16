using System;
using System.Windows;
using System.Windows.Controls;

namespace HelloWorldWpfApp
{
    /// <summary>
    /// Interaction logic for TweedeVoorbeeldWindow.xaml
    /// </summary>
    public partial class CalendarWindow : Window
    {
        public CalendarWindow()
        {
            InitializeComponent();
        }

        private void Calendar1_SelectedDatesChanged(object sender, SelectionChangedEventArgs e)
        {
            foreach (DateTime item in e.AddedItems)
            {
                GeselecteerdeDataListBox.Items.Add(item);
            }
        }
    }
}
