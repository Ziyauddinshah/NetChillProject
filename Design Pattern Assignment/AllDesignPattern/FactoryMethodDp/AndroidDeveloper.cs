namespace FactoryMethodDp
{
    internal class AndroidDeveloper : Employee
    {
        public int Salary()
        {
            Console.WriteLine("Salary of android developer");
            return 60000;
        }
    }
}
