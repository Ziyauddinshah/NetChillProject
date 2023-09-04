using StrategyDp;

internal class Program
{
    private static void Main(string[] args)
    {
        Console.WriteLine("Strategy design pattern\n");
        Console.WriteLine("===================\n");

        int[] arrayList = new int[] { 76, 29, 54, 89, 67, 21, 44, 59 };
        Console.WriteLine("Bubble Sort");
        SortedContext context = new SortedContext(new BubbleSort());
        context.ContextStrategy(arrayList);

        Console.WriteLine("\nQuick Sort");
        context = new SortedContext(new QuickSort());
        context.ContextStrategy(arrayList);
    }
}