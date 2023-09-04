using SingletonDp.Eagerway;
using SingletonDp.Lazyway;

internal class Program
{
    private static void Main(string[] args)
    {
        Console.WriteLine("Singleton design pattern\n");
        Console.WriteLine("===================\n");

        Car getCarObj1 = Car.GetCarClassByLazyWay();
        Console.WriteLine("Lazy way " + getCarObj1.GetHashCode());

        Car getCarObj2 = Car.GetCarClassByLazyWay();
        Console.WriteLine("Lazy way " + getCarObj2.GetHashCode());

        Bike getEagerObj1 = Bike.GetCarClassByEagerWay();
        Console.WriteLine("Eager way " + getEagerObj1.GetHashCode());

        Bike getEagerObj2 = Bike.GetCarClassByEagerWay();
        Console.WriteLine("Eager way " + getEagerObj2.GetHashCode());

        Normal normal1 = new Normal();
        Console.WriteLine("Normal way " + normal1.GetHashCode());

        Normal normal2 = new Normal();
        Console.WriteLine("Normal way " + normal2.GetHashCode());

    }
}