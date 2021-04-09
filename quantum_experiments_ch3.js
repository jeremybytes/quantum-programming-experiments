// QCEngine experiments to go along with
// Programming Quantum Computers
// Chapter 3 experiments

// Exp 1
// multi-qubit as binary representation
// binary -> decimal values
qc.reset(3);
qc.write(0);
var q1 = qint.new(1, 'q1');
var q2 = qint.new(1, 'q2');
var q3 = qint.new(1, 'q3');
qc.had();
var output = qc.read();
qc.print('|' + q3.read() + '|' + q2.read() + '|' + q1.read() + '|  ' + output + '\n');
