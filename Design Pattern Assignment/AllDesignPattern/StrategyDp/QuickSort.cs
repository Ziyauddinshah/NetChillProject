namespace StrategyDp
{
    internal class QuickSort : ISortStrategy
    {
        public int[] Sort(int[]? inputArray)
        {
            if (inputArray == null || inputArray.Length <= 1) return inputArray;
            int middleIndex = inputArray.Length / 2;
            int middleValue = inputArray[middleIndex];
            List<int> leftPart = new List<int>();
            List<int> rightPart = new List<int>();
            for (int i = 0; i < inputArray.Length; i++)
            {
                if (i == middleIndex) continue;
                else if (inputArray[i] <= inputArray[middleIndex])
                {
                    leftPart.Add(inputArray[i]);
                }
                else
                {
                    rightPart.Add(inputArray[i]);
                }
            }
            var sortedArray = Sort(leftPart.ToArray()).ToList();
            sortedArray.Add(middleValue);
            sortedArray.AddRange(Sort(rightPart.ToArray()));

            return sortedArray.ToArray();
        }
    }
}
