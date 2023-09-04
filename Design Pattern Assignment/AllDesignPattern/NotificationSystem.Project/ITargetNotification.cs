namespace NotificationSystem.Project
{
    internal interface ITargetNotification
    {
        void SendingNotification(string subscriberName, string channel, string subject, string body);
    }
}
