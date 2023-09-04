namespace FacadeDp
{
    public class VehicleFacade
    {
        private readonly IBike bike;
        private readonly ICar car;
        public VehicleFacade()
        {
            bike = new Bike();
            car = new Car();
        }

        public void CarPrint()
        {
            car.CarPrint();
        }
        public void BikePrint()
        {
            bike.BikePrint();
        }
    }
}
