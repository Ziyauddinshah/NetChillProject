namespace PublisherSubscriberDp
{
    public class Subscriber : ISubscriber
    {
        private string? subscriberName;

        public Subscriber(string subscriberName)
        {
            this.subscriberName = subscriberName;
        }

        public void ReceiveEmailNotification(string message)
        {
            Console.WriteLine($"{subscriberName} received email notification: {message}");
        }
        public void ReceiveSmsNotification(string message)
        {
            Console.WriteLine($"{subscriberName} received sms notification: {message}");
        }
    }
}
