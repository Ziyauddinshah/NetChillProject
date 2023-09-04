namespace PublisherSubscriberDp
{
    public class Publisher : IPublisher
    {
        private List<ISubscriber> _subscribers = new List<ISubscriber>();

        public void Subscribe(ISubscriber subscriber)
        {
            _subscribers.Add(subscriber);
        }

        public void Unsubscribe(ISubscriber subscriber)
        {
            _subscribers.Remove(subscriber);
        }

        public void NotifySubscribers(string publisherName, string message)
        {
            if (publisherName.ToLower() == "email")
            {
                foreach (var subscriber in _subscribers)
                {
                    subscriber.ReceiveEmailNotification(message);
                }

            }
            else if (publisherName.ToLower() == "sms")
            {
                foreach (var subscriber in _subscribers)
                {
                    subscriber.ReceiveSmsNotification(message);
                }

            }
        }
    }
}
