namespace FactoryMethodDp
{
    internal class AndroidDevFactory : EmployeeFactory
    {

        public Employee Create()
        {
            return new AndroidDeveloper();
        }
    }
}
