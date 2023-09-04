namespace SingletonDp.Lazyway
{
    internal class Car
    {
        private static readonly object lockObject = new object();
        private static Car? car;
        private Car() { }
        public static Car GetCarClassByLazyWay()
        {
            if (car == null)
            {
                lock (lockObject)
                {
                    if (car == null)
                    {
                        car = new Car();
                    }
                }
            }
            return car;
        }
    }
}
