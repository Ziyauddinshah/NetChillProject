namespace NotificationSystem.Project
{
    // Strategy pattern
    public interface NotificationStrategy
    {
        void SendNotification(string subscriverName, string messageBody);
    }

}
