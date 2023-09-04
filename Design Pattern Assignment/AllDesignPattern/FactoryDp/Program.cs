namespace FactoryDp
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Factory design pattern\n");
            Console.WriteLine("===================\n");
            Employee? e1 = EmployeeFactory.GetEmployee("Android Developer");
            Console.WriteLine(e1.Salary());

            Employee? e2 = EmployeeFactory.GetEmployee("Web Developer");
            Console.WriteLine(e2.Salary());
        }
    }
}