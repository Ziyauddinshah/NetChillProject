namespace StrategyDp
{
    internal class SortedContext
    {
        ISortStrategy sortStrategy;
        public SortedContext(ISortStrategy sortStrategy)
        {
            this.sortStrategy = sortStrategy;
        }
        public void ContextStrategy(int[] arrayList)
        {
            var sortedList = sortStrategy.Sort(arrayList);
            for (int i = 0; i < sortedList.Length; i++)
            {
                Console.WriteLine(sortedList[i]);
            }
        }
    }
}
