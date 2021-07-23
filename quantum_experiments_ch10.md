# QCEngine experiments to go along with Programming Quantum Computers
## Chapter 10 experiments

Note: Copy and paste the experiments into the quantum simulator at [https://oreilly-qc.github.io](https://oreilly-qc.github.io).  

### Exp 10-1
Expample 10-2 with better labels for scratch bits.

```js
qc_options.color_by_phase = true;
qc_options.book_render = true;
var num_qubits = 3;
var num_scratch = 1;

qc.reset(num_qubits+num_scratch);
var a = qint.new(1, 'a');
var b = qint.new(1, 'b');
var c = qint.new(1, 'c');
var scratch = qint.new(1, 'scratch');

qc.write(0);
qc.hadamard(0x1|0x2|0x4);

qc.label('(a OR NOT b)');
b.not();
bit_or(1,2,8);
qc.label('');
qc.nop();
qc.nop();


qc.label('pAND (AND c)')
phase_and(4|8);
qc.label('');

qc.nop();
qc.nop();
qc.label('uncompute');
inv_bit_or(1,2,8);
b.not();
qc.label('');

//////////// Definitions
//Define bit OR and inverse
function bit_or(q1,q2,out)
{
    qc.not(q1|q2);
    qc.cnot(out,q1|q2);
    qc.not(q1|q2|out);
}

function inv_bit_or(q1,q2,out)
{
    qc.not(q1|q2|out);
    qc.cnot(out,q1|q2);
    qc.not(q1|q2);
}

// Define phase AND (pAND)
function phase_and(qubits)
{
    qc.cz(qubits);
}
```

### Exp 10-2
Example 10-2 with better labels for the scratch bits.

```js
qc_options.color_by_phase = true;
qc_options.book_render = true;

qc.reset(4);
var boxes = qint.new(2, 'boxes');
var AorB = qint.new(1, 'AorB');
var scratch = qint.new(1,'scratch');
qc.write(0);

// Put both boxes into a quantum kitten/tiger superposition
boxes.hadamard();

// Satisfy the note on box A using bit-logic
qc.label('A OR B');
qc.not(0x1|0x2);
qc.cnot(0x4,0x1|0x2);
qc.not(0x1|0x2|0x4);
qc.label('');
qc.nop();

// Satisfy the note on box B using bit-logic
qc.label('NOT A');
qc.nop();
qc.not(0x1);
qc.nop();
qc.label('');
qc.nop();

// Put the phase-logic scratch qubit into the |-> state
scratch.not();
scratch.hadamard();

// Satisfy the final condition using phase-logic
qc.label('(A OR B) XNOR (NOT A)');
qc.cnot(0x8,0x4);
qc.cnot(0x8,0x1);
qc.not(0x8);
qc.label('');

// Return the scratch to |0>
scratch.hadamard();
scratch.not();
qc.nop();

// Uncompute all of the bit-logic
qc.label('uncompute');
qc.not(0x1);
qc.nop();
qc.not(0x1|0x2|0x4);
qc.cnot(0x4,0x1|0x2);
qc.not(0x1|0x2);
qc.label('');
qc.nop();

// Use a Grover mirror to convert the flipped phase
qc.label('Grover mirror');
boxes.Grover();
qc.label('');

// Read and interpret the result!
var result = boxes.read();
qc.print('Box A contains a ' + (result & 1 ? 'kitten' : 'tiger') + '\n');
qc.print('Box B contains a ' + (result & 2 ? 'kitten' : 'tiger') + '\n');
qc.nop();
```

### Exp 10-3  
Example 10-3 with better labels for the clauses.  

```js
qc_options.color_by_phase = true;
qc_options.book_render = true;
var num_qubits = 3;
var num_scratch = 4;

qc.reset(num_qubits+num_scratch);
var reg = qint.new(3, 'reg');
var scratch1 = qint.new(1, 'scratch1');
var scratch2 = qint.new(1, 'scratch2');
var scratch3 = qint.new(1, 'scratch3');
var scratch4 = qint.new(1, 'scratch4');
qc.write(0);
qc.had(0x1|0x2|0x4);

qc.label('a OR b');
bit_or(0x1,0x2,0x8);

qc.label('NOT a OR c');
qc.not(0x1);
bit_or(0x1,0x4,0x10);
qc.not(0x1);

qc.label('NOT b OR NOT c');
qc.not(0x2|0x4);
bit_or(0x2,0x4,0x20);
qc.not(0x2|0x4);

qc.label('a OR c');
bit_or(0x1,0x4,0x40);

// add some space in the diagram
qc.label('');
qc.nop();
qc.nop();

qc.label('flip phase');
phase_and(0x8|0x10|0x20|0x40);

// add some space in the diagram
qc.label('');
qc.nop();
qc.nop();

qc.label('inv clause 4');
inv_bit_or(0x1,0x4,0x40);

qc.label('inv clause 3');
qc.not(0x2|0x4);
inv_bit_or(0x2,0x4,0x20);
qc.not(0x2|0x4);

qc.label('inv clause 2');
qc.not(0x1);
inv_bit_or(0x1,0x4,0x10);
qc.not(0x1);

qc.label('inv clause 1');
inv_bit_or(0x1,0x2,0x8);

qc.label('Grover mirror');
reg.Grover();

reg.read();


//////////// Definitions
// Define bit OR and inverse
function bit_or(q1, q2, out)
{
    qc.not(q1|q2);
    qc.cnot(out,q1|q2);
    qc.not(q1|q2|out);
}

function inv_bit_or(q1, q2, out)
{
    qc.not(q1|q2|out);
    qc.cnot(out,q1|q2);
    qc.not(q1|q2);
}
// Define phase AND
function phase_and(qubits)
{
    qc.cz(qubits);
}
```

### Exp 10-4  
Example 10-4 with better labels for the clauses.  

```js
qc_options.color_by_phase = true;
qc_options.book_render = true;

var num_qubits = 3;
var num_scratch = 4;

qc.reset(num_qubits+num_scratch);
var reg = qint.new(num_qubits, 'reg');
var scratch1 = qint.new(1, 'scratch1');
var scratch2 = qint.new(1, 'scratch2');
var scratch3 = qint.new(1, 'scratch3');
var scratch4 = qint.new(1, 'scratch4');
qc.write(0);
reg.hadamard();

qc.label('a OR b');
bit_or(0x1,0x2,0x8);

qc.label('NOT a OR c');
qc.not(0x1);
bit_or(0x1,0x4,0x10);
qc.not(0x1);

qc.label('NOT b OR NOT c');
qc.not(0x2|0x4);
bit_or(0x2,0x4,0x20);
qc.not(0x2|0x4);

qc.label('a OR c');
bit_or(0x1,0x4,0x40);

// add some space in the diagram
qc.label('');
qc.nop();
qc.nop();

qc.label('flip (AND b)');
phase_and(0x2|0x8|0x10|0x20|0x40);

// add some space in the diagram
qc.label('');
qc.nop();
qc.nop();

qc.label('inv clause 4');
inv_bit_or(0x1,0x4,0x40);

qc.label('inv clause 3');
qc.not(0x2|0x4);
inv_bit_or(0x2,0x4,0x20);
qc.not(0x2|0x4);

qc.label('inv clause 2');
qc.not(0x1);
inv_bit_or(0x1,0x4,0x10);
qc.not(0x1);

qc.label('inv clause 1');
inv_bit_or(0x1,0x2,0x8);

qc.label('Grover mirror');
reg.Grover();

reg.read();

//////////// Definitions
// Define bit OR and inverse
function bit_or(q1, q2, out)
{
    qc.not(q1|q2);
    qc.cnot(out,q1|q2);
    qc.not(q1|q2|out);
}

function inv_bit_or(q1, q2, out)
{
    qc.not(q1|q2|out);
    qc.cnot(out,q1|q2);
    qc.not(q1|q2);
}
// Define phase AND
function phase_and(qubits)
{
    qc.cz(qubits);
}
```