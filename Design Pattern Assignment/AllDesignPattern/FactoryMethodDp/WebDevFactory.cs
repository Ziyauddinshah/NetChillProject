namespace FactoryMethodDp
{
    internal class WebDevFactory : EmployeeFactory
    {
        public Employee Create()
        {
            return new WebDeveloper();
        }
    }
}
