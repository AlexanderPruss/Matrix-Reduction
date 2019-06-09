# Matrix-Reduction [![CircleCI](https://circleci.com/gh/AlexanderPruss/Matrix-Reduction.svg?style=svg)](https://circleci.com/gh/AlexanderPruss/Matrix-Reduction)

This is a simple POC app that I'm using to poke at doing numerics in node. I'm also playing with node-based CLIs while I'm
at it.

# Usage

# Continuous Integration

ATM this POC isn't packaged, so the CI just runs tests.

https://circleci.com/gh/AlexanderPruss/Matrix-Reduction

# Future Improvements

* Add a more intelligent way to factor a number into prime factors
* Having better immutable types would be helpful
* Some improvements could be made to RationalNumbers to help prevent overflow
* Need to look into whether having non-blocking functions (more async) is relevant when the program is a CLI