namespace NotificationSystem.Project
{
    public interface ISubscriber
    {
        void ReceiveEmailNotification(string channelName, string subject, string message);
        void ReceiveSmsNotification(string channelName, string subject, string message);
    }
}
