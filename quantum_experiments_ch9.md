# QCEngine experiments to go along with Programming Quantum Computers
## Chapter 9 experiments

Note: Copy and paste the experiments into the quantum simulator at [https://oreilly-qc.github.io](https://oreilly-qc.github.io).  

### Exp 9-1  
Example 9-2 with some additional reads and outputs to show what is happening. The address is put into superposition, so we do not know which value in qram will be changed (it will be the 3rd or 4th value). Run this multiple times to see the output.  

*Note: I'm not sure how this works; I just figured out what it is doing.*

Sample output:
```
Before: [4,3,5,1]
Address: 3
After: [4,3,5,2]
```
In the above case, the value at address 3 (the 4th item) is incremented. Below is an example where the value at address 2 (the 3rd item) is incremented.

```
Before: [4,3,5,1]
Address: 2
After: [4,3,6,1]
```

Code:

```js
var a = [4, 3, 5, 1];
var reg_qubits = 3;
var qram_qubits = qram_qubits_required(4, reg_qubits);
qc.reset(2 + reg_qubits + qram_qubits);
var qreg = qint.new(3, 'qreg');
var addr = qint.new(2, 'addr');
var qram = qram_initialize(a, reg_qubits);
qreg.write(0);

qc.label('set addr');
addr.write(2);
addr.hadamard(0x1);
qc.label('');

qc.print('Before: [' + a + ']');

// Swap the QRAM address(es) into the working register
qram_load(addr, qreg);

qc.label('increment');
qreg.add(1);

// Swap the working register back into QRAM
qram_store(addr, qreg);

// read the address
var address_value = addr.read();
qc.print('Address: ' + address_value);

// read the qram
for (var i = 0; i < qram_qints.length; ++i)
{
    a[i] = qram_qints[i].read();
}
qc.print('After: [' + a + ']');

var qram_qints = null;


function qram_qubits_required(num_addresses, qubits_per_entry)
{
    var qubits_required = num_addresses * qubits_per_entry;
    qc.print('This QRAM requires '+qubits_required+' qubits.\n');
    return qubits_required;
}

function qram_initialize(init_data, qubits_per_entry) {
    qc.label('init QRAM');
    qram_qints = [];
    for (var i = 0; i < init_data.length; ++i)
    {
        qram_qints.push(qint.new(qubits_per_entry, 'qram['+i+']'));
        qram_qints[i].write(init_data[i]);
    }
    qc.label('');
}

function qram_load(address, register)
{
    qc.label('QRAM load');
    // Swap into address zero
    qram_swap_to_zero(address);
    // Swap into our register
    qram_qints[0].swap(register);
    qc.label('');
}

function qram_store(address, register)
{
    qc.label('QRAM store');
    // Swap into our register
    qram_qints[0].swap(register);
    // Swap into address zero
    qram_swap_to_zero(address);
    qc.label('');
}

function qram_swap_to_zero(address)
{
    var reg_qubits = qram_qints[0].numBits;
    var addr_qubits = address.numBits;
    var num_addresses = 1 << addr_qubits;
    for (var i = 0; i < addr_qubits; ++i)
    {
        var condition_bit = 1 << i;
        for (var addr1 = 0; addr1 < num_addresses; ++addr1)
        {
            if (addr1 & condition_bit)
            {
                var addr2 = addr1 ^ condition_bit;
                qram_qints[addr1].cswap(qram_qints[addr2], ~0,
                                        address.bits(condition_bit));
            }
        }
    }
}
```

