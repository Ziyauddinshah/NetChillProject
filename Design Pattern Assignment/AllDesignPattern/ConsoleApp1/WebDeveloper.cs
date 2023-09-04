namespace ConsoleApp1
{
    internal class WebDeveloper : IEmployee
    {
        public void Salary(int salary)
        {
            Console.WriteLine("Salary of web developer is: " + salary);
        }
    }
}
