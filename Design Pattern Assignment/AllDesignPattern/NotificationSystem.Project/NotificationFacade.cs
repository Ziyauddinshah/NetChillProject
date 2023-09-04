namespace NotificationSystem.Project
{
    internal class NotificationFacade
    {
        readonly NotificationContext emailNotificationContext;
        readonly NotificationContext smsNotificationContext;
        public NotificationFacade()
        {
            emailNotificationContext = new NotificationContext(new EmailNotification());
            smsNotificationContext = new NotificationContext(new SMSNotification());
        }

        public void EmailNotification(string subscriberName, string message)
        {
            emailNotificationContext.SendNotification(subscriberName, message);
        }
        public void SMSNotification(string subscriberName, string message)
        {
            smsNotificationContext.SendNotification(subscriberName, message);
        }
    }
}
