# QCEngine experiments to go along with Programming Quantum Computers
## Chapter 5 experiments

Note: Copy and paste the experiments into the quantum simulator at [https://oreilly-qc.github.io](https://oreilly-qc.github.io).  

### Exp 5-1
Toffoli without superposition  
In the QCEngine, watch the circles swap before and after the Toffoli gate. This example has no change (since empty circles are swapped). The result will always be 1 (001).  

```js
qc.reset(3);
qc.write(1, 0x1);
qc.write(0, 0x2);
qc.write(0, 0x4);

qc.not(0x4, 0x1|0x2);

qc.read();
```

### Exp 5-2
Toffoli with superposition  
In the QCEngine, watch the circles swap before and after the Toffoli gate. This example has a change since a circle in superposition is swapped.  
Running the read at the end will result in 2 possible values: 1 (001) or 7 (111).

```js
qc.reset(3);
qc.write(1, 0x1);
qc.write(0, 0x2);
qc.write(0, 0x4);

qc.had(0x2);

qc.not(0x4, 0x1|0x2);

qc.read();
```

### Exp 5-3
A look at "add" operations without superposition. Stepping through the circuit shows how the circles swap to produce the desired result.
An interesting note: "add(3)" is the "add(1)" circuit followed by the "add(2)" circuit.  

```js
// Initialize
qc.reset(4);
var a = qint.new(4, 'a');
a.write(3); // binary 0011

//a.add(1);

//a.add(2);

a.add(3);

//a.add(4);

a.read();
```

### Exp 5-4
A look at "subtract" operations without superposition. Stepping through the circuit shows how the circles swap to produce the desired result.
An interesting note: "subtract(3)" is the "subtract(2)" circuit followed by the "subtract(1)" circuit.  

```js
// Initialize
qc.reset(4);
var a = qint.new(4, 'a');
a.write(3); // binary 0011

//a.subtract(1);

//a.subtract(2);

a.subtract(3);

//a.subtract(4);

a.read();
```

### Exp 5-5
Example 5-1 without the labels.  After the "had"/"phase", the possible values are 1 (0001) and 5 (0101).  
Step through the "add(1)" (4 operations) to see the circles swap. The resulting possible values are 2 (0010) and 6 (0110).  
After the "subtract(1)" (4 operations), the possible values are back to 1 (0001) and 5 (0101).

```js
qc.reset(4);

var a = qint.new(4, 'a');
a.write(1);

a.had(0x4);
a.phase(45, 0x4);

a.nop();

a.add(1);

a.nop();

a.subtract(1);
```

### Exp 5-6
Example 5-2: Adding 2 Quantum Integers  
*Just a note: In the circle notation section of the simulator, press the zoom-out (-) button until you can see all 64 circles. Otherwise, you can only see part of the operation.*

```js
// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=5-2

// Initialize
var num_qubits = 6;
qc.reset(num_qubits);
var a = qint.new(4, 'a');
var b = qint.new(2, 'b');

// prepare
qc.label('prepare');
a.write(1);
a.hadamard(0x4);
a.phase(45, 0x4);
b.write(1);
b.hadamard(0x2);
b.phase(90, 0x2);
qc.nop();
qc.label('');
qc.nop();

// a += b
qc.label('a += b');
a.add(b);
qc.label('');
qc.nop();
```

### Exp 5-7
Reversible abs(a) with addition. This is the example from figure 5-18.  

```js
qc.reset(7);

var b = qint.new(3, 'b');
var a = qint.new(3, 'a');
var scratch = qint.new(1, 'scratch');

b.write(2);
a.write(-3);

qc.label('abs(a)');

scratch.write(0);
qc.cnot(scratch, 0x20);
qc.cnot(a, scratch);
qc.cnot(0x20, 0x8|0x10|0x40);
qc.cnot(0x10, 0x8|0x20|0x40);
qc.cnot(0x8, scratch);

qc.label();

//a.read();

qc.label('b+=abs(a)');

qc.cnot(0x4, 0x1|0x2|0x8);
qc.cnot(0x2, 0x1|0x8);
qc.cnot(0x1, 0x8);
qc.cnot(0x4, 0x2|0x10);
qc.cnot(0x2, 0x10);
qc.cnot(0x4, 0x20);

qc.label();

qc.label('uncompute abs(a)');

qc.cnot(0x8, scratch);
qc.cnot(0x10, 0x8|0x20|0x40);
qc.cnot(0x20, 0x8|0x10|0x40);
qc.cnot(a, scratch);
qc.cnot(scratch, 0x20);

qc.label();

b.read();
a.read();
scratch.read();
```

### Exp 5-8
Reversible abs(a) with XOR. This is the example from figure 5-19.  

```js
qc.reset(7);

var b = qint.new(3, 'b');
var a = qint.new(3, 'a');
var scratch = qint.new(1, 'scratch');

b.write(2);
a.write(-3);

qc.label('abs(a)');

scratch.write(0);
qc.cnot(scratch, 0x20);
qc.cnot(a, scratch);
qc.cnot(0x20, 0x8|0x10|0x40);
qc.cnot(0x10, 0x8|0x20|0x40);
qc.cnot(0x8, scratch);

qc.label();

//a.read();

qc.label('b^=abs(a)');

qc.cnot(0x1, 0x8);
qc.cnot(0x2, 0x10);
qc.cnot(0x4, 0x20);

qc.label();

qc.label('uncompute abs(a)');

qc.cnot(0x8, scratch);
qc.cnot(0x10, 0x8|0x20|0x40);
qc.cnot(0x20, 0x8|0x10|0x40);
qc.cnot(a, scratch);
qc.cnot(scratch, 0x20);

qc.label();

b.read();
a.read();
scratch.read();
```

### Exp 5-9
Phase preservation from Figure 5-20.  

```js
qc_options.color_by_phase = true;qc.reset(4);

var a = qint.new(3, 'a');
var scratch = qint.new(1, 'scratch');

a.write(0);
a.had();

qc.label('abs(a)');

scratch.write(0);
qc.cnot(scratch, 0x4);
qc.cnot(a, scratch);
qc.cnot(0x4, 0x1|0x2|0x8);
qc.cnot(0x2, 0x1|0x08);
qc.cnot(0x1, scratch);

qc.label();

qc.nop();

qc.label('Z if abs(a) ==1');

qc.not(0x2|0x4);
qc.cphase(180, a);
qc.not(0x2|0x4);

qc.label();

qc.nop();

qc.label('uncompute abs(a)');

qc.cnot(0x1, scratch);
qc.cnot(0x2, 0x1|0x08);
qc.cnot(0x4, 0x1|0x2|0x8);
qc.cnot(a, scratch);
qc.cnot(scratch, 0x4);

qc.label();

a.read();
scratch.read();
```