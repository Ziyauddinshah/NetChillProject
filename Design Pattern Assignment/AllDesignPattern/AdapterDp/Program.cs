namespace AdapterDp
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Adapter design pattern\n");
            Console.WriteLine("===================\n");
            ITarget target = new EmployeeAdapter();
            target.SalaryOfEmployee("30000");
        }
    }
}