# QCEngine experiments to go along with Programming Quantum Computers
## Chapter 3 experiments

Note: Copy and paste the experiments into the quantum simulator at [https://oreilly-qc.github.io](https://oreilly-qc.github.io).  

### Exp 3-1
multi-qubit as binary representation  
binary -> decimal values  

```js
qc.reset(3);
qc.write(0);
var q1 = qint.new(1, 'q1');
var q2 = qint.new(1, 'q2');
var q3 = qint.new(1, 'q3');
qc.had();
var output = qc.read();
qc.print('|' + q3.read() + '|' + q2.read() + '|' + q1.read() + '|  ' + output + '\n');
```

## Exp 3-2
In the simulator, see how NOT changes the order of the circle notation. Run the program, then put the marker before the NOT and after the NOT to see the circles swap. Watch what happens for q1, q2, and q3 (individually).  

```js
qc.reset(3);
qc.write(0);
var q1 = qint.new(1, 'q1');
var q2 = qint.new(1, 'q2');
var q3 = qint.new(1, 'q3');
q1.not();
//q2.not();
//q3.not();
var output = qc.read();
qc.print('|' + q3.read() + '|' + q2.read() + '|' + q1.read() + '|  ' + output + '\n');
```

## Exp 3-3
Same as above, but for PHASE. Run the program, then put the marker before the PHASE and after the PHASE to see the circles that are impacted. Try for q1, q2, and q3 (individually).  

```js
qc_options.book_render = true;
qc.reset(3);
qc.write(0);
var q1 = qint.new(1, 'q1');
var q2 = qint.new(1, 'q2');
var q3 = qint.new(1, 'q3');
qc.had();
q1.phase(45);
//q2.phase(45);
//q3.phase(45);
var output = qc.read();
qc.print('|' + q3.read() + '|' + q2.read() + '|' + q1.read() + '|  ' + output + '\n');
```

### Exp 3-4
Bell pair
entaglement using CNOT

```js
qc.reset(2);
var a = qint.new(1, 'a');
var b = qint.new(1, 'b');
qc.write(0);
a.had();
b.cnot(a);
var a_result = a.read();
var b_result = b.read();
```

