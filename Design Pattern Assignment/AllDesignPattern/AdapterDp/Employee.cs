namespace AdapterDp
{
    // Adaptee
    internal class Employee
    {
        public Employee()
        {
        }
        public void Salary(int salaryAsInteger)
        {
            Console.WriteLine("\nThis is adaptee who takes salary as integer: " + salaryAsInteger);
            Console.WriteLine("Salary of employee is: " + salaryAsInteger);
        }
    }
}
