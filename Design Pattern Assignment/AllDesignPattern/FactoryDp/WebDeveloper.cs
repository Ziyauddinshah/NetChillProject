namespace FactoryDp
{
    internal class WebDeveloper : Employee
    {
        public int Salary()
        {
            Console.WriteLine("Web dev salary");
            return 40000;
        }
    }
}
