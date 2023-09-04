namespace FactoryDp
{
    internal class AndroidDeveloper : Employee
    {
        public int Salary()
        {
            Console.WriteLine("Android dev salary");
            return 60000;
        }
    }
}
