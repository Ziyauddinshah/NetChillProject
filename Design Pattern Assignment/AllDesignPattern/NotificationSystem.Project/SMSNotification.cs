namespace NotificationSystem.Project
{
    internal class SMSNotification : NotificationStrategy
    {
        public SMSNotification() { }
        public void SendNotification(string subscriberName, string message)
        {
            Console.WriteLine("\nSubscriber Name: " + subscriberName);
            Console.WriteLine($"Message of email notification: {message}");
        }
    }
}
