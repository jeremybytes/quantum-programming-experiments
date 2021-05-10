# QCEngine experiments to go along with Programming Quantum Computers
## Chapter 4 experiments

Note: Copy and paste the experiments into the quantum simulator at [https://oreilly-qc.github.io](https://oreilly-qc.github.io).  

### Example 4-1
Quantum Teleportation  
*Note: This is not an experiment, it is the full listing of the code from the QCEngine sample 4-1.*   

```js
// Programming Quantum Computers
//   by Eric Johnston, Nic Harrigan and Mercedes Gimeno-Segovia
//   O'Reilly Media

// To run this online, go to http://oreilly-qc.github.io?p=4-1

// This sample demonstrates basic teleportation.

qc.reset(3);
var alice = qint.new(1, 'alice');
var ep    = qint.new(1, 'ep');
var bob   = qint.new(1, 'bob');
var a1 = 0;
var a2 = 0;

// This will work with entangle() and alice_prep() in either order.
// Try swapping them to verify this.
entangle();
alice_prep();
alice_send();
bob_receive();
bob_verify();


function entangle()
{
    // First, create an entangled pair
    qc.write(0, 2|4);
    qc.label('entangle');
    ep.had();
    bob.cnot(ep);
    qc.label('');
}

function alice_prep()
{
    // Alice prepares her payload to teleport
    alice.write(0);
    qc.label('prep payload');
    alice.had();
    alice.phase(45);
    alice.had();
    qc.label('');
    qc.nop();
}

function alice_send()
{
    // Alice sends the payload (and destroys it in the process)
    qc.label('send');
    ep.cnot(alice);
    alice.had();
    a1 = alice.read();
    a2 = ep.read();
    qc.label('');
    qc.nop();
}

function bob_receive()
{
    // Bob receives the payload, using the two bits Alice sent
    qc.label('receive');
    var bob_is_asleep = false;
    var use_conditonals = true;

    // Option 1: Bob is asleep (can't respond to Alice's data), so he just does whatever.
    if (bob_is_asleep)
    {
        bob.not();
        bob.phase(180);
    }
    // Option 2: Bob is responsive, and we use conditional-ops for visual clarity
    else if (use_conditonals)
    {
        // Here, we use conditional gates, just for visual clarity.
        // The "conditions" are on qubits which have already been read and
        // turned into classical bits.
        bob.cnot(ep);
        bob.cz(alice);
    }
    // Option 3: Bob is responsive, and we use straightforward "if" in the code.
    else
    {
        if (a2)
            bob.not();
        if (a1)
            bob.phase(180);
    }
    qc.label('');
    qc.nop();
}

function bob_verify()
{
    // Verify that the teleportation worked
    qc.label('verify');
    bob.had();
    bob.phase(-45);
    bob.had();
    bob.read();
    qc.label('');
    qc.nop();
}
```