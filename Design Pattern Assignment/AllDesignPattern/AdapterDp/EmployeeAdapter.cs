namespace AdapterDp
{
    // Adapter
    internal class EmployeeAdapter : ITarget
    {
        Employee employee = new Employee();
        public void SalaryOfEmployee(string salaryAsString)
        {
            int salaryAsInteger = int.Parse(salaryAsString);
            Console.WriteLine("This is adapter who takes salary as string: " + salaryAsString);
            employee.Salary(salaryAsInteger);
        }
    }
}
