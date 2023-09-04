namespace FactoryMethodDp
{
    internal class Manager : Employee
    {
        public int Salary()
        {
            Console.WriteLine("Salary of manager");
            return 100000;
        }
    }
}
