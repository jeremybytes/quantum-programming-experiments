# QCEngine experiments to go along with Programming Quantum Computers
## Chapter 8 experiments

Note: Copy and paste the experiments into the quantum simulator at [https://oreilly-qc.github.io](https://oreilly-qc.github.io).  

### Exp 8-1  
Eigenstate - special state where amplitude and phase remain unchanged after a "had". (Eigenphase 0&deg;)

```js
// Eigenstate (had)
qc.reset(1);
qc.label('init');
qc.write(0);
qc.roty(-135);

qc.nop();

// State/phase remains unchanged after had
qc.label('had');
qc.had();
```

### Exp 8-2
Eigenstate - same as above, except the phase is changed by the "had" - the amplitudes remain unchanged. (Eigenphase 180&deg;)

```js
// Eigenstate (had)
qc.reset(1);
qc.label('init');
qc.write(0);
qc.roty(45);

qc.nop();

// State remains unchanged after had
qc.label('had');
qc.had();
```

### Exp 8-3
Ex 8-1 with function (output_angle) that prints the eigenphase angle based on the output register. The result of this example is 180&deg;.  

```js
//Specify the size of output register - determines precision
// of our answer
var m = 4;
// Specify the size of input register that will specify
// our eigenstate
var n = 1;
// Setup
qc.reset(m + n);
var qout = qint.new(m, 'output');
var qin = qint.new(n, 'input');
// Initialize output register all zeros
qout.write(0);
// Initialize input register as eigenstate of HAD
qc.label('init');
qin.write(0);
qin.roty(-135);
// This state will have an eigenphase of 180.
// For eigenphase 0, we would instead use qin.roty(45);

// Define our conditional unitary
function cont_u(qcontrol, qtarget, control_count) {
    // For Hadamard, we only need to know if control_count
    // is even or odd, as applying HAD an even number of
    // times does nothing.
    if (control_count & 1)
        qtarget.chad(null, ~0, qcontrol.bits(control_count));
}
// Operate phase estimation primitive on registers
qc.label('phase estimation');
phase_est(qin, qout, cont_u);
// Read output register
var output = qout.read();
output_angle(output, qout.numBits);


function phase_est(q_in, q_out, cont_u)
{
    // Main phase estimation single run
    // HAD the output register
    q_out.had();

    // Apply conditional powers of u
    for (var j = 0; j < q_out.numBits; j++)
        cont_u(q_out, q_in, 1 << j);

    // Inverse QFT on output register
    q_out.invQFT();
}

// Takes a register value and converts it to an angle
function output_angle(q_out_value, q_out_numBits) {
    var angle = 360 * q_out_value / (2**q_out_numBits);
    qc.print(angle);
}
```

### Exp 8-4
Same as above (Ex 8-1), but with a 3 qubit output. Precision is adequate for the expected 180&deg; output.

```js
//Specify the size of output register - determines precision
// of our answer
var m = 3;
// Specify the size of input register that will specify
// our eigenstate
var n = 1;
// Setup
qc.reset(m + n);
var qout = qint.new(m, 'output');
var qin = qint.new(n, 'input');
// Initialize output register all zeros
qout.write(0);
// Initialize input register as eigenstate of HAD
qc.label('init');
qin.write(0);
qin.roty(-135);
// This state will have an eigenphase of 180.
// For eigenphase 0, we would instead use qin.roty(45);

// Define our conditional unitary
function cont_u(qcontrol, qtarget, control_count) {
    // For Hadamard, we only need to know if control_count
    // is even or odd, as applying HAD an even number of
    // times does nothing.
    if (control_count & 1)
        qtarget.chad(null, ~0, qcontrol.bits(control_count));
}
// Operate phase estimation primitive on registers
qc.label('phase estimation');
phase_est(qin, qout, cont_u);
// Read output register
var output = qout.read();
output_angle(output, qout.numBits);


function phase_est(q_in, q_out, cont_u)
{
    // Main phase estimation single run
    // HAD the output register
    q_out.had();

    // Apply conditional powers of u
    for (var j = 0; j < q_out.numBits; j++)
        cont_u(q_out, q_in, 1 << j);

    // Inverse QFT on output register
    q_out.invQFT();
}

// Takes a register value and converts it to an angle
function output_angle(q_out_value, q_out_numBits) {
    var angle = 360 * q_out_value / (2**q_out_numBits);
    qc.print(angle);
}
```

### Exp 8-5
Ex 8-2 with the "output_angle" function added. This example shows an output of 135&deg; (estimated). The correct answer should be 150&deg;, but the precision of the 3 qubit output register does not allow for that.  

*Further experimentation: Try changing the "m" to different values.*

```js
// The fine print: Phase estimation with only 3 output qubits

function phase_est(q_in, q_out, cont_u)
{
    // Main phase estimation single run
    // HAD the output register
    q_out.had();

    // Apply conditional powers of u
    for (var j = 0; j < q_out.numBits; j++)
        cont_u(q_out, q_in, 1 << j);

    // Inverse QFT on output register
    q_out.invQFT();
}

//Specify the size of output register - determines precision
// of our answer
var m = 3;
// Specify the size of input register that will specify
// our eigenstate
var n = 1;
// Setup
qc.reset(m + n);
var qout = qint.new(m, 'output');
var qin = qint.new(n, 'input');
// Initialize output register all zeros
qout.write(0);
// Initialize input register as eigenstate of HAD
qc.label('init');
qin.write(0);
qin.roty(-135);
// In this example, the starting state is not important because
// out U has been chosen to have an eigenphase of 150 for all inputs.

// Define our conditional unitary
function cont_u(qcontrol, qtarget, control_count) {
    // In this example, the unitary chosen is a simple one which
    // should have an eigenphase of 150 degrees for all inputs.
    // By enabling single_op, we can perform multiple applications simply
    // by rotating the phase farther.

    // Perform the controlled unitary between q1 and q2 iter times
    var theta = 150;
    var single_op = true;
    var q1 = qcontrol.bits(control_count);
    var q2 = qtarget;
    if (single_op)
    {
        qc.phase(-theta / 2 * control_count, q2, q1);
        qc.cnot(q2,q1);
        qc.phase(-theta * control_count, q2, q1);
        qc.cnot(q2,q1);
        qc.phase(-theta / 2 * control_count, q2, q1);
    }
    else
    {
        for (var i = 0; i < control_count; ++i)
        {
            qc.phase(-theta / 2, q2, q1);
            qc.cnot(q2,q1);
            qc.phase(-theta, q2, q1);
            qc.cnot(q2,q1);
            qc.phase(-theta / 2, q2, q1);
        }
    }
}

// Operate phase estimation primitive on registers
qc.label('phase estimation');
phase_est(qin, qout, cont_u);
// Read output register
var output = qout.read();
output_angle(output, qout.numBits);

// Takes a register value and converts it to an angle
function output_angle(q_out_value, q_out_numBits) {
    var angle = 360 * q_out_value / (2**q_out_numBits);
    qc.print(angle);
}
```