using System.Windows;

namespace HelloWorldWpfApp
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private void OpenGroetWindowButton_Click(object sender, RoutedEventArgs e)
        {
            HelloWorldWindow win = new HelloWorldWindow();
            win.Show();
        }

        private void OpenCalendarWindowButton_Click(object sender, RoutedEventArgs e)
        {
            CalendarWindow win = new CalendarWindow();
            win.Show();
        }
        private void OpenKladblokWindowButton_Click(object sender, RoutedEventArgs e)
        {
            KladblokWindow win = new KladblokWindow();
            win.Show();
        }
    }
}
