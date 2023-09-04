using ConsoleApp1;

internal class Program
{
    private static void Main(string[] args)
    {
        IEmployee employee = new WebDeveloper();
        employee.Salary(40000);
    }
}