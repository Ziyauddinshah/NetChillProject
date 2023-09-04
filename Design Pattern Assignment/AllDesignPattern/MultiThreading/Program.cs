namespace MultiThreading
{
    internal class Program
    {
        private static object _lock = new object();
        static void Main(string[] args)
        {
            Console.WriteLine("Multi threding example\n");
            Console.WriteLine("===================\n");
            Thread mainThread = Thread.CurrentThread;
            mainThread.Name = "main";

            Thread thread1 = new Thread(() => CountDown(1));
            thread1.Start();


            Thread thread2 = new Thread(() => CountDown(2));
            thread2.Start();

            Console.WriteLine(mainThread.Name + " thraed completed");
        }
        static void CountDown(int n)
        {

            lock (_lock)
            {
                for (int i = 10; i >= 0; i--)
                {
                    Console.WriteLine("thread " + n + " -> " + i);
                    Thread.Sleep(1000);
                }
                Console.WriteLine($"thread {n} completed!");
            }
        }
        static void CountUp(int n)
        {
            for (int i = 0; i < 10; i++)
            {
                Console.WriteLine("thread " + n + " -> " + i);
                Thread.Sleep(1000);
            }
            Console.WriteLine($"thread {n} completed!");
        }
    }
}