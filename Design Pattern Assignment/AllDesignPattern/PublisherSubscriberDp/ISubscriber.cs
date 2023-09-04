namespace PublisherSubscriberDp
{
    public interface ISubscriber
    {
        void ReceiveEmailNotification(string message);
        void ReceiveSmsNotification(string message);
    }
}
