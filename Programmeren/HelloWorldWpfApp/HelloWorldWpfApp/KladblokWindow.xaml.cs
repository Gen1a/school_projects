using System.Windows;
using System.Windows.Controls;

namespace HelloWorldWpfApp
{
    /// <summary>
    /// Interaction logic for DerdeVoorbeeldWindow.xaml
    /// </summary>
    public partial class KladblokWindow : Window
    {
        public KladblokWindow()
        {
            InitializeComponent();
        }

        private bool _inhoudTextBoxChanged;
        private void Window_Closing(object sender, System.ComponentModel.CancelEventArgs e)
        {
            if (_inhoudTextBoxChanged)
            {
                MessageBoxResult antwoord = MessageBox.Show("Er zijn wijzigingen aangebracht, wil u deze bewaren?", Title, MessageBoxButton.YesNoCancel, MessageBoxImage.Question);
                if (antwoord == MessageBoxResult.Yes) Opslaan();
                else if (antwoord == MessageBoxResult.No) { }
                else { e.Cancel = true; }
            }
        }

        private void OpslaanMenuItem_Click(object sender, RoutedEventArgs e)
        {
            Opslaan();
        }

        private void AfsluitenMenuItem_Click(object sender, RoutedEventArgs e)  // Sluit het venster
        {
            Close();
        }
        private void Opslaan()  // Slaat inhoud op
        {
            _inhoudTextBoxChanged = false;
            MessageBox.Show("De wijzigingen zijn bewaard.", Title, MessageBoxButton.OK, MessageBoxImage.Information);
        }

        private void InhoudTextBox_TextChanged(object sender, TextChangedEventArgs e)
        {
            _inhoudTextBoxChanged = true;
        }
    }
}
