using NotificationSystem.Project;

internal class Program
{
    private static void Main(string[] args)
    {
        Console.WriteLine("Notification system example\n");
        Console.WriteLine("===================\n");

        Console.Write("Enter channel (Email/SMS): ");
        string? channel = Console.ReadLine();
        Console.Write("Enter subject: ");
        string? subject = Console.ReadLine();
        Console.Write("Enter message body: ");
        string? body = Console.ReadLine();

        IPublisher publisher = new Publisher();

        ISubscriber subscriber1 = new Subscriber("Ziya");
        publisher.Subscribe(subscriber1);

        ISubscriber subscriber2 = new Subscriber("Adam");
        publisher.Subscribe(subscriber2);

        publisher.NotifySubscribers(channel, subject, body);
    }
}