namespace NotificationSystem.Project
{
    internal class EmailNotification : NotificationStrategy
    {
        public EmailNotification() { }

        public void SendNotification(string subscriberName, string message)
        {
            Console.WriteLine("Subscriber Name: " + subscriberName);
            Console.WriteLine($"Message of email notification: {message}");
        }
    }
}
