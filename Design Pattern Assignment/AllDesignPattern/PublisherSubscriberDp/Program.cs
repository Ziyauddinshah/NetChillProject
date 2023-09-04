using PublisherSubscriberDp;

public class Program
{
    public static void Main()
    {
        Console.WriteLine("Pub/Sub design pattern\n");
        Console.WriteLine("===================\n");

        IPublisher publisher = new Publisher();

        ISubscriber subscriber1 = new Subscriber("Alice");
        ISubscriber subscriber2 = new Subscriber("Bob");

        publisher.Subscribe(subscriber1);
        publisher.Subscribe(subscriber2);

        Console.Write("Enter channel (Email/SMS): ");
        string? channel = Console.ReadLine();
        Console.Write("Enter subject: ");
        string? subject = Console.ReadLine();
        Console.Write("Enter message body: ");
        string? messageBody = Console.ReadLine();

        string notificationMessage = $"Subject: {subject}, Body: {messageBody}";
        publisher.NotifySubscribers(channel, notificationMessage);
        //Thread? thread1 = new Thread(() => publisher.NotifySubscribers(channel, notificationMessage));
        //thread1.Start();

        //publisher.Unsubscribe(subscriber2);
        //publisher.NotifySubscribers(channel, notificationMessage);
        //Thread thread2 = new Thread(() => publisher.NotifySubscribers(channel, notificationMessage));
        //thread2.Start();
    }
}
