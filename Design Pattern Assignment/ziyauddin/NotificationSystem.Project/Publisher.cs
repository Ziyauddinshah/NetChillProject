namespace NotificationSystem.Project
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

        public void NotifySubscribers(string publisherName, string subject, string messageBody)
        {
            if (publisherName.ToLower() == "email")
            {
                foreach (var subscriber in _subscribers)
                {
                    subscriber.ReceiveEmailNotification(publisherName, subject, messageBody);
                }

            }
            else if (publisherName.ToLower() == "sms")
            {
                foreach (var subscriber in _subscribers)
                {
                    subscriber.ReceiveSmsNotification(publisherName, subject, messageBody);
                }

            }
        }
    }
}
