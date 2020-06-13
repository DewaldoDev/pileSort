const partitionStack = (stack, partitions) => {
  let newStacks = [];
  const partitionHeight = Math.floor(stack / partitions);
  let remainder = stack % partitions;

  for (let i = 0; i < partitions; i++) {
    const remainderToAdd = remainder > i ? 1 : 0;
    newStacks[i] = partitionHeight + remainderToAdd;
  }

  return newStacks;
};

const stackBooks = (bookStacks, stableHeight, partitions) => {
  if (bookStacks.every((stack) => stack <= stableHeight)) {
    return bookStacks.filter((stack) => !!stack).length;
  }

  const partitionedStacks = bookStacks.reduce((newStacks, stack) => {
    if (stack > stableHeight) {
      return [...newStacks, ...partitionStack(stack, partitions)];
    }

    return [...newStacks, stack];
  }, []);

  return stackBooks(partitionedStacks, stableHeight, partitions);
};

(() => {
  console.assert(
    partitionStack(11, 2)[0] === 6 && partitionStack(11, 2)[1] === 5,
    "Properly partitions a stack of 11 books into 2 piles"
  );

  console.assert(
    partitionStack(4, 2)[0] === 2 && partitionStack(4, 2)[1] === 2,
    "Properly partitions a stack of 4 books into 2 piles"
  );

  console.assert(
    partitionStack(1, 2)[0] === 1 && partitionStack(1, 2)[1] === 0,
    "Properly partitions a stack of 1 book into 2 piles"
  );

  console.assert(
    stackBooks([11], 2, 2) === 7,
    "Properly stacks 11 books with a stable height of 2 and partitions of 2"
  );

  console.assert(
    stackBooks([3], 2, 5) === 3,
    "Properly stacks 3 books with a stable height of 2 and partitions of 5"
  );
})();
