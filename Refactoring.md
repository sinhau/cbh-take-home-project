# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

The two main goals of this refactor was to simplify the if/else logic, including removing unnecessary lines, and to also add comments for clarity

There were several redundant/dependent logic, such as checking if candidate exists or not, or setting candidate to TRIVIAL_PARTITION_KEY.  Since candidate generation is dependent upon an event, we can assume default candidate to equal TRIVIAL_PARTITION_KEY, and if event does exist, only then do we need to regenerate candidate.  Also, we only need to stringify event.partitionKey as the crypto digest output will return string.  

This refactoring makes the code/logic easier to follow as it sets the default case and only modifies data as needed.  Also, writing comments for each modification makes it easier for another engineer to follow along and quickly understand what's happening.