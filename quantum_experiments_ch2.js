// QCEngine experiments to go along with
// Programming Quantum Computers
// Chapter 2 experiments

// Exp 1
// had / had = original
// had / read / had = destroys original
qc.reset(1);
qc.write(0);
qc.had();
//qc.read();
qc.had();
var output = qc.read();
qc.print(output);
qc.print('\n');


// Exp 2
// had + exchange + had to get original value
qc.reset(2);
qc.discard();
var a = qint.new(1, 'origin');
var b = qint.new(1, 'destination');
a.write(1);
a.had();
b.exchange(a);
b.had();
var output = b.read();
qc.print(output);
qc.print('\n');
