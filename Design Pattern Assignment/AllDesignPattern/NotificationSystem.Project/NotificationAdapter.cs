namespace NotificationSystem.Project
{
    internal class NotificationAdapter : ITargetNotification
    {
        NotificationFacade notificationFacade = new NotificationFacade();
        private static readonly Object lockObject = new Object();
        private static NotificationAdapter? notificationAdapter;
        private NotificationAdapter() { }

        public static NotificationAdapter NotificationAdapterSingleton()
        {
            if (notificationAdapter == null)
            {
                lock (lockObject)
                {
                    if (notificationAdapter == null)
                    {
                        notificationAdapter = new NotificationAdapter();
                    }
                }
            }
            return notificationAdapter;
        }
        public void SendingNotification(string subscriberName, string channel, string subject, string body)
        {
            var message = "Name of message channel is: " + channel + ", and subject is " + subject + ", body of message is:  " + body;
            if (channel.ToLower() == "sms")
            {
                notificationFacade.SMSNotification(subscriberName, message);
            }
            else
            {
                notificationFacade.EmailNotification(subscriberName, message);
            }

        }
    }
}
