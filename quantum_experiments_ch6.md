# QCEngine experiments to go along with Programming Quantum Computers
## Chapter 6 experiments

Note: Copy and paste the experiments into the quantum simulator at [https://oreilly-qc.github.io](https://oreilly-qc.github.io).  

### Exp 6-1
This is exercise 6-2 with some additional labels and colors.  

```js

qc_options.color_by_phase = true;
var number_to_flip = 3;
var number_of_iterations = 7;
var num_qubits = 4;
qc.reset(num_qubits);
var reg = qint.new(num_qubits, 'reg')

reg.write(0);
qc.label('prep');
reg.hadamard();
for (var i = 0; i < number_of_iterations; ++i)
{
    qc.label('Amplitude Amplification ' + i);

    // Flip the marked value
    reg.not(~number_to_flip);
    reg.cphase(180);
    reg.not(~number_to_flip);
    reg.Grover();

    // Peek at the probability
    var prob = reg.peekProbability(number_to_flip);
    qc.print('Iter '+i+': probability = '+prob+'\n');

    // just space it out visually
    qc.label('');
    qc.nop();
}
```
