namespace FactoryMethodDp
{
    internal class ManagerFactory : EmployeeFactory
    {
        public Employee Create()
        {
            return new Manager();
        }
    }
}
