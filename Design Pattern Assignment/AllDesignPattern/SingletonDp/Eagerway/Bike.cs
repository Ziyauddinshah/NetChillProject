namespace SingletonDp.Eagerway
{
    internal class Bike
    {
        public static Bike bike = new Bike();
        public static Bike GetCarClassByEagerWay()
        {
            return bike;
        }
    }
}
