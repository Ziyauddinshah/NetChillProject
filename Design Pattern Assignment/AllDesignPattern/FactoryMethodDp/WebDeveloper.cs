namespace FactoryMethodDp
{
    internal class WebDeveloper : Employee
    {
        public int Salary()
        {
            Console.WriteLine("Salary of web developer");
            return 40000;
        }
    }
}
