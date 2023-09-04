namespace FactoryDp
{
    internal class EmployeeFactory
    {
        public static Employee? GetEmployee(string name)
        {
            if (name == "Android Developer")
            {
                return new AndroidDeveloper();
            }
            else if (name == "Web Developer")
            {
                return new WebDeveloper();
            }
            else
            {
                return null;
            }
        }
    }
}
