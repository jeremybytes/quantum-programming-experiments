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
qc.roty(45);

qc.nop();

// State & relative phase remain unchanged after had
qc.label('had');
qc.had();
```

### Exp 8-2
Eigenstate - same as above, except the global phase is changed by the "had" - the amplitude and relative phase remain unchanged. (Eigenphase 180&deg;)

```js
// Eigenstate (had)
qc.reset(1);
qc.label('init');
qc.write(0);
qc.roty(-135);

qc.nop();

// State & relative phase remain unchanged after had
qc.label('had');
qc.had();
```

### Exp 8-3
Ex 8-1 (refactored by Lynn ([source](https://github.com/lynnlangit/learning-quantum/blob/main/book/code/ch08/8-1-lynn.js))) with function (output_angle) that prints the eigenphase angle based on the output register. The result of this example is 180&deg;.  

```js
var inputRegSizeEigenstate = 1;
var outputRegSizeAnswerPrecision = 4;
qc.reset(outputRegSizeAnswerPrecision + inputRegSizeEigenstate);
var qin = qint.new(inputRegSizeEigenstate, 'input');
var qout = qint.new(outputRegSizeAnswerPrecision, 'output');

qc.label('init');
qout.write(0);
qin.write(0);       // this state has eigenphase 180
qin.roty(-135);     // for eigenphase 0, use qin.roty(45)

qc.label('phase estimation');
phase_estimation(qin, qout, conditional_unitary);
var output_value = qout.read();
print_output_angle(output_value, qout.numBits);

function phase_estimation(q_in, q_out, conditional_unitary)
{
    q_out.had();
    for (var j = 0; j < q_out.numBits; j++)
        conditional_unitary(q_out, q_in, 1 << j);
    q_out.invQFT();
}

function conditional_unitary(qcontrol, qtarget, control_count) 
{
    if (control_count & 1)
        qtarget.chad(null, ~0, qcontrol.bits(control_count));
}

function print_output_angle(q_out_value, q_out_numBits) {
    var angle = 360 * q_out_value / (2**q_out_numBits);
    qc.print(angle);
}
```

### Exp 8-4
Same as above, but with a 3 qubit output. Precision is adequate for the expected 180&deg; output.

```js
var inputRegSizeEigenstate = 1;
var outputRegSizeAnswerPrecision = 3;
qc.reset(outputRegSizeAnswerPrecision + inputRegSizeEigenstate);
var qin = qint.new(inputRegSizeEigenstate, 'input');
var qout = qint.new(outputRegSizeAnswerPrecision, 'output');

qc.label('init');
qout.write(0);
qin.write(0);       // this state has eigenphase 180
qin.roty(-135);     // for eigenphase 0, use qin.roty(45)

qc.label('phase estimation');
phase_estimation(qin, qout, conditional_unitary);
var output_value = qout.read();
print_output_angle(output_value, qout.numBits);

function phase_estimation(q_in, q_out, conditional_unitary)
{
    q_out.had();
    for (var j = 0; j < q_out.numBits; j++)
        conditional_unitary(q_out, q_in, 1 << j);
    q_out.invQFT();
}

function conditional_unitary(qcontrol, qtarget, control_count) 
{
    if (control_count & 1)
        qtarget.chad(null, ~0, qcontrol.bits(control_count));
}

function print_output_angle(q_out_value, q_out_numBits) {
    var angle = 360 * q_out_value / (2**q_out_numBits);
    qc.print(angle);
}
```

### Exp 8-5
Ex 8-2 (refactored by Lynn ([source](https://github.com/lynnlangit/learning-quantum/blob/main/book/code/ch08/8-2-lynn.js))) with the "output_angle" function added. This example shows an output of 135&deg; (estimated) - note that this value is not the same on each run. The correct answer should be 150&deg;, but the precision of the 3 qubit output register does not allow for that.  

*Further experimentation: Try changing "outputRegSizeAnswerPrecision" to different values. The value gets closer with larger registers.*

```js
var inputRegSizeEigenstate = 1;
var outputRegSizeAnswerPrecision = 3;
qc.reset(outputRegSizeAnswerPrecision + inputRegSizeEigenstate);
var qin = qint.new(inputRegSizeEigenstate, 'input');
var qout = qint.new(outputRegSizeAnswerPrecision, 'output');

qc.label('init');
qout.write(0);
qin.write(0);       // this state has eigenphase 180
qin.roty(-135);     // for eigenphase 0, use qin.roty(45)
// In this example, the starting state is not important because
// out U has been chosen to have an eigenphase of 150 for all inputs.

qc.label('phase estimation');
phase_estimation(qin, qout, conditional_unitary);
var output_value = qout.read();
print_output_angle(output_value, qout.numBits);

function phase_estimation(q_in, q_out, conditional_unitary)
{
    q_out.had();
    for (var j = 0; j < q_out.numBits; j++)
        conditional_unitary(q_out, q_in, 1 << j);
    q_out.invQFT();
}

function print_output_angle(q_out_value, q_out_numBits) {
    var angle = 360 * q_out_value / (2**q_out_numBits);
    qc.print(angle);
}

function conditional_unitary(qcontrol, qtarget, control_count) 
{
    // The simple unitary should have an eigenphase of 150 degrees for all inputs.
    // Using single_op, perform multiple apps by rotating the phase farther.

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
```