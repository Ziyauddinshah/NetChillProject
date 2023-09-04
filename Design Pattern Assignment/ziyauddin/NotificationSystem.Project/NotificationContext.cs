namespace NotificationSystem.Project
{
    internal class NotificationContext : NotificationStrategy
    {
        NotificationStrategy notificationStrategy;
        public NotificationContext(NotificationStrategy notificationStrategy)
        {
            this.notificationStrategy = notificationStrategy;
        }
        public void SendNotification(string subscriverName, string messageBody)
        {
            notificationStrategy.SendNotification(subscriverName, messageBody);
        }
    }
}
