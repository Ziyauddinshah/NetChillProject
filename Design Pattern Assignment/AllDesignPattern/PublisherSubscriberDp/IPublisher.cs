namespace PublisherSubscriberDp
{
    public interface IPublisher
    {
        void Subscribe(ISubscriber subscriber);
        void Unsubscribe(ISubscriber subscriber);
        void NotifySubscribers(string publisherName, string message);
    }
}
