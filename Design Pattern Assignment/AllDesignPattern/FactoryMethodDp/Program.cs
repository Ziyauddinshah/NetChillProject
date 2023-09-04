namespace FactoryMethodDp
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Abstract Factory method design pattern\n");
            Console.WriteLine("===================\n");
            EmployeeFactory androidDevEmp = new AndroidDevFactory();
            Employee androidDevEmpSalary = androidDevEmp.Create();
            Console.WriteLine(androidDevEmpSalary.Salary());

            EmployeeFactory webDevEmp = new WebDevFactory();
            Employee webDevEmpSalary = webDevEmp.Create();
            Console.WriteLine(webDevEmpSalary.Salary());

            EmployeeFactory managerEmp = new ManagerFactory();
            Employee managerEmpSalary = managerEmp.Create();
            Console.WriteLine(managerEmpSalary.Salary());

        }
    }
}