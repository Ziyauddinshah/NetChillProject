namespace NotificationSystem.Project
{
    public class Subscriber : ISubscriber
    {
        private string? subscriberName;
        NotificationAdapter adapter = NotificationAdapter.NotificationAdapterSingleton();

        public Subscriber(string subscriberName)
        {
            this.subscriberName = subscriberName;
        }

        public void ReceiveEmailNotification(string channelName, string subject, string message)
        {
            adapter.SendingNotification($"{subscriberName}", channelName, subject, message);
            //Console.WriteLine($"{subscriberName} received email notification: {message}");
        }
        public void ReceiveSmsNotification(string channelName, string subject, string message)
        {
            adapter.SendingNotification($"{subscriberName}", channelName, subject, message);
            //Console.WriteLine($"{subscriberName} received sms notification: {message}");
        }
    }
}
