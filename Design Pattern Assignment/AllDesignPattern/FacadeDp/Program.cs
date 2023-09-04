namespace FacadeDp
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Facade design pattern\n");
            Console.WriteLine("===================\n");
            VehicleFacade vehicleFacade = new VehicleFacade();
            vehicleFacade.CarPrint();
            vehicleFacade.BikePrint();
        }
    }
}