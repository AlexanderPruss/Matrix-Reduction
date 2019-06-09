# Matrix-Reduction [![CircleCI](https://circleci.com/gh/AlexanderPruss/Matrix-Reduction.svg?style=svg)](https://circleci.com/gh/AlexanderPruss/Matrix-Reduction)

This is a simple POC app that I'm using to poke at doing numerics in node. I'm also playing with node-based CLIs while I'm
at it.

# Installation

You'll need NPM installed to build the project. Load dependencies and compile the app with

`npm install && npm run build`

You can then start the application from source code directly with 

`npm run start`

Alternatively, you can save the app to your terminal as a CLI app. To do this, run 

`npm link`

This will install the app as `matrix-stuff` to your path.

# Usage

Starting the app opens a CLI session in your terminal. You can ask for commands by typing "help", which will give the 
following response:

             The available commands are:
             import {filename} - imports a matrix from the given file;
             exit              - exits the app.
             
             Matrix files should be formatted as follows:
             * Each entry of the matrix is separated with an empty space
             * Each row of the matrix is separated with a newline
             
             Currently, only rational numbers are supported. A sample valid row could look like this:
             -4 12/15 0 4/6
             
             When a matrix is imported, the follow commands become available:
             
             [Press LEFT]  - See what the matrix looked like in the previous step of the execution.
             [Press RIGHT] - See what the matrix looked like in the next step of the execution.
             start         - Jump back to the start of the execution.
             result        - Jump back to the result of the execution.
             
             A new matrix can be imported with the 'import {filename} command while a matrix execution is active.`


# Examples

Two example matrices can be found in the `examples` folder. You could try them out from inside the app with 

`import examples/nicematrix.txt`

`import examples/complicatedMatrix.txt`

Feel free to write your own matrices to be imported and reduced.

# Continuous Integration

ATM this POC isn't packaged, so the CI just runs tests.

https://circleci.com/gh/AlexanderPruss/Matrix-Reduction

# Future Improvements

* Add a more intelligent way to factor a number into prime factors
* Having better immutable types would be helpful
* Some improvements could be made to RationalNumbers to help prevent overflow
* Need to look into whether having non-blocking functions (more async) is relevant when the program is a CLI
* While the math is very well covered, some of the CLI stuff isn't tested much